// hooks/useChatMessage.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_REACT_APP_URL;

/**
 * Fetch a list of all chat sessions
 */
const fetchSessionsAPI = async (token) => {
  const res = await fetch(`${BASE_URL}/chat/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch sessions");
  }
  const data = await res.json();
  return data.sessions; // return just the array
};

/**
 * Fetch chat history for a given session
 */
const fetchHistoryAPI = async ({ token, sessionId }) => {
  const res = await fetch(`${BASE_URL}/chat/history/${sessionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch session history");
  }
  const data = await res.json();
  console.log("History data:", data);
  return data.history;
};

/**
 * POST /chat/message
 */
const sendChatMessageAPI = async ({ sessionId, message, token }) => {
  const url = new URL(`${BASE_URL}/chat/message`);
  if (sessionId) {
    url.searchParams.append("session_id", sessionId);
  }

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to send message");
  }
  return res.json();
};

/**
 * useFetchSessions:
 *  - Provides sessions list, caches it under ["chatSessions", token]
 *  - Example best-practice: longer staleTime, no auto-refetch on window focus
 */
export const useFetchSessions = (token) =>
  useQuery({
    queryKey: ["chatSessions", token],
    queryFn: () => fetchSessionsAPI(token),
    enabled: !!token,
    // Stale after 1 minute: no immediate re-fetch if the user re-opens the sidebar quickly
    staleTime: 60_000,
    // Avoid re-fetch on window focus; you can set this to true if you want auto updates
    refetchOnWindowFocus: false,
    // If the user logs out or the request fails
    onError: (err) => {
      toast.error(err.message || "Failed to fetch sessions");
    },
  });

/**
 * useFetchSessionHistory:
 *  - Provides chat messages for a given session
 *  - Example best-practice: no staleTime or very short, so we can easily re-fetch if needed
 */
export const useFetchSessionHistory = (sessionId, token) => {
  return useQuery({
    queryKey: ["chatHistory", sessionId],
    queryFn: () => fetchHistoryAPI({ token, sessionId }),
    enabled: !!sessionId && !!token,
    // Mark as stale immediately (0 ms), so re-fetch can happen on focus or after invalidation
    staleTime: 0,
    // Possibly allow refetch on window focus for real-time feel
    refetchOnWindowFocus: true,
    onError: (err) => {
      toast.error(err.message || "Failed to fetch session history");
    },
  });
};

/**
 * useSendChatMessage:
 *  - POST /chat/message
 *  - If session doesn't exist, server creates one
 *  - Invalidate relevant queries so UI stays in sync
 */
export const useSendChatMessage = ({ onSessionCreated, token }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendChatMessageAPI,
    onSuccess: (data, variables) => {
      // If new session was created
      if (data.session_id && onSessionCreated) {
        onSessionCreated(data.session_id);
      }

      // Invalidate that session's messages so we can refetch updated data
      const sid = data.session_id || variables.sessionId;
      if (sid) {
        queryClient.invalidateQueries(["chatHistory", sid]);
      }

      // Also update session list if needed (e.g., new session added)
      queryClient.invalidateQueries(["chatSessions", token]);

      // toast.success("Message sent");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
};
