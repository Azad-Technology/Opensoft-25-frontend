import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_REACT_APP_URL;

/**
 * Fetch a list of all chat sessions
 * @returns Array of sessions [{ id, title, createdAt, ... }, ...]
 */
const fetchSessionsAPI = async (token) => {
  const res = await fetch(`${BASE_URL}/chat/sessions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch sessions");
  }
  // Suppose the backend returns { sessions: [...] }
  const data = await res.json();

  // Return just the array, not the entire object
  return data.sessions;
};

/**
 * Fetch chat history for a given session
 * @returns Array of messages [{ sender, content, timestamp, ... }, ...]
 */
const fetchHistoryAPI = async ({ token, sessionId }) => {
  const res = await fetch(`${BASE_URL}/chat/history/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch session history");
  }
  const data = await res.json();
  console.log("History data:", data);

  // Return just the array, not the entire object
  return data.history;
};

/**
 * POST to /chat/message with optional session_id
 * If session_id is null, the backend will create a brand-new session.
 * @returns JSON { session_id, message, status, response }
 */
const sendChatMessageAPI = async ({ sessionId, message, token }) => {
  // Construct URL, adding session_id if provided
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
 *  - Provides sessions list from /chat/sessions
 *  - Caches them for 'chatSessions'
 */
export const useFetchSessions = (token) =>
  useQuery({
    queryKey: ["chatSessions", token],
    queryFn: () => fetchSessionsAPI(token),
    enabled: !!token, // only run if token is available
    onError: (err) => {
      toast.error(err.message || "Failed to fetch sessions");
    },
  });

/**
 * useFetchSessionHistory:
 *  - Provides message history for a given session
 *  - Caches them by sessionId
 */
export const useFetchSessionHistory = (sessionId, token) => {
  return useQuery({
    queryKey: ["chatHistory", sessionId],
    queryFn: () => fetchHistoryAPI({ token, sessionId }),
    enabled: !!sessionId && !!token,
    onError: (err) => {
      toast.error(err.message || "Failed to fetch session history");
    },
  });
};

/**
 * useSendChatMessage:
 *  - POST /chat/message
 *  - Will call onSessionCreated(session_id) if the response includes a new session_id
 *  - Invalidate session list so the UI re-fetches updated sessions
 */
export const useSendChatMessage = ({ onSessionCreated, token }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendChatMessageAPI,
    onSuccess: (data, variables) => {
      // If a new session was created
      if (data.session_id && onSessionCreated) {
        onSessionCreated(data.session_id);
      }
      // Invalidate the session's messages to fetch updated data from server
      if (data.session_id || variables.sessionId) {
        queryClient.invalidateQueries([
          "chatHistory",
          data.session_id || variables.sessionId,
        ]);
      }
      // Also re-fetch the list of sessions if needed
      queryClient.invalidateQueries(["chatSessions", token]);

      toast.success("Message sent");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
};
