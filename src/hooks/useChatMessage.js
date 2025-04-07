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
    staleTime: 60_000,
    refetchOnWindowFocus: false,
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

    async onMutate(variables) {
      const { sessionId, message } = variables;
      const sid = sessionId || "temp_session";

      const queryKey = ["chatHistory", sid];
      await queryClient.cancelQueries({ queryKey });

      const previousMessages = queryClient.getQueryData(queryKey) || [];

      const optimisticMessage = {
        id: `temp-${Date.now()}`,
        role: "user",
        message,
        timestamp: new Date().toISOString(),
      };

      queryClient.setQueryData(queryKey, [
        ...previousMessages,
        optimisticMessage,
      ]);

      return { previousMessages, sid, optimisticMessage };
    },

    onError(error, variables, context) {
      toast.error(error.message || "Failed to send message");
      queryClient.setQueryData(
        ["chatHistory", context.sid],
        context.previousMessages,
      );
    },

    onSuccess(data, variables, context) {
      const sid = data.session_id;
      const queryKey = ["chatHistory", sid];

      // For new session
      if (!variables.sessionId && onSessionCreated) {
        onSessionCreated(sid);
      }

      // Update chat history with actual response
      const userMessage = {
        id: `${sid}-user-${Date.now()}`,
        role: "user",
        message: variables.message,
        timestamp: new Date().toISOString(),
      };

      const assistantMessage = {
        id: `${sid}-assistant-${Date.now()}`,
        role: "assistant",
        message: data.response,
        timestamp: new Date().toISOString(),
      };

      queryClient.setQueryData(queryKey, (old = []) => {
        const filtered = old.filter(
          (msg) => msg.id !== context.optimisticMessage.id,
        );
        return [...filtered, userMessage, assistantMessage];
      });

      // Update sessions list with chat name
      queryClient.setQueryData(["chatSessions", token], (old = []) => {
        const exists = old.find((s) => s.session_id === sid);
        if (exists) return old;

        const newSession = {
          session_id: sid,
          timestamp: new Date().toISOString(),
          chat_name: data.intent_data?.chat_name || "New Chat",
        };
        return [newSession, ...old];
      });
    },
  });
};
