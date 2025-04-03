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

  // ✅ Sort sessions so newest is first
  return data.sessions.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  );
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
  // Expected shape:
  // {
  //   session_id: "...",
  //   userMessage: { id: "...", role: "user", message: "...", timestamp: "..." },
  //   assistantMessage: { id: "...", role: "assistant", message: "...", timestamp: "..." }
  // }
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
 * useSendChatMessage (Optimistic Updates)
 *
 * If a session doesn't exist, the server creates one.
 * This hook modifies the cache for ["chatHistory", sessionId] so that:
 *  1) The user's new message appears immediately (optimistic update).
 *  2) On error, we rollback to the previous cache.
 *  3) On success, we replace the temp message with the final user/assistant messages from the server.
 */
export const useSendChatMessage = ({ onSessionCreated, token }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendChatMessageAPI,

    // 1) onMutate: immediately show user’s message in ["chatHistory", sid]
    async onMutate(variables) {
      const { sessionId, message } = variables;
      // If no sessionId, we might be creating a new session
      const sid = sessionId || "temp_session";

      const queryKey = ["chatHistory", sid];

      // Cancel any outgoing fetches to avoid overwriting the optimistic update
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous messages for rollback
      const previousMessages = queryClient.getQueryData(queryKey);

      // Create an optimistic user message
      const optimisticMessage = {
        // If the server eventually returns an ID, we can replace this later
        id: `temp-${Date.now()}`,
        role: "user",
        message,
        timestamp: new Date().toISOString(),
      };

      // Update the query data optimistically
      queryClient.setQueryData(queryKey, (old = []) => [
        ...old,
        optimisticMessage,
      ]);

      // Return context for rollback
      return { previousMessages, sid, optimisticMessage };
    },

    // 2) onError: rollback to snapshot if something goes wrong
    onError(error, variables, context) {
      toast.error(error.message || "Failed to send message");
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["chatHistory", context.sid],
          context.previousMessages,
        );
      }
    },

    // 3) onSuccess: replace the optimistic message with final messages from the server
    onSuccess(data, variables, context) {
      if (data.session_id && variables.sessionId === null && onSessionCreated) {
        onSessionCreated(data.session_id);
      }

      const sid = data.session_id || context.sid;
      const queryKey = ["chatHistory", sid];

      if (data.userMessage && data.assistantMessage) {
        queryClient.setQueryData(queryKey, (old = []) => {
          const filtered = old.filter(
            (msg) => msg.id !== context.optimisticMessage.id,
          );
          return [...filtered, data.userMessage, data.assistantMessage];
        });
      }

      // ✅ Optimistically add new session
      queryClient.setQueryData(["chatSessions", token], (old = []) => {
        const exists = old.find((s) => s.session_id === data.session_id);
        if (exists) return old;

        const newSession = {
          session_id: data.session_id,
          timestamp: new Date().toISOString(),
          last_message: null,
        };

        return [newSession, ...old];
      });
    },
    // 4) onSettled: always re-invalidate to fetch the final server state
    onSettled(data, error, variables, context) {
      if (!error && data) {
        const sid = data.session_id || context.sid || variables.sessionId;
        if (sid) {
          queryClient.invalidateQueries(["chatHistory", sid]);
        }
        queryClient.invalidateQueries(["chatSessions", token]); // ✅ ensures latest data
      }
    },
  });
};
