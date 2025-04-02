import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageSquare,
  UserCircle,
  Bot,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import {
  useFetchSessions,
  useFetchSessionHistory,
  useSendChatMessage,
} from "../../hooks/useChatMessage";
import { useAuth } from "../../contexts/AuthContext";


const ChatUI = ({ className = "" }) => {
  const { token } = useAuth();

  // Which session are we in?
  const [sessionId, setSessionId] = useState(null);

  // Simple local states
  const [isTyping, setIsTyping] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  // 1) Load all sessions for the sidebar
  const { data: conversations = [], isLoading: isLoadingSessions } =
    useFetchSessions(token);

  // 2) Load session history from React Query
  const { data: sessionHistory = [], isLoading: isLoadingHistory } =
    useFetchSessionHistory(sessionId, token);

  // 3) Mutation for sending chat messages (optimistic)
  const { mutate: sendChat } = useSendChatMessage({
    token,
    onSessionCreated: (newId) => {
      // If the server created a brand-new session
      setSessionId(newId);
    },
  });

  // For scrolling to the bottom
  const messageEndRef = useRef(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessionHistory, isTyping]);

  // Start a brand-new chat
   const handleNewChat = () => {
    if (!token) {
      toast.error("No token found; please log in again.");
      return;
    }
    setIsNewChat(true);
    setSessionId(null);
    setShowSidebar(false);

    // Fire off the "new conversation" call
    sendChat(
      { sessionId: null, message: "", token },
      {
        onSuccess: (data) => {
          setIsNewChat(false);
          // onSessionCreated also sets the sessionId
        },
        onError: () => {
          setIsTyping(false);
          toast.error("Failed to start a new conversation.");
        },
      },
    );
  };

  // Send a user message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !token) return;

    // Show typing indicator
    setIsTyping(true);

    // We'll rely on the optimistic update in useSendChatMessage
    sendChat(
      { sessionId, message: newMessage, token },
      {
        onSuccess: () => {
          setNewMessage("");
          setTimeout(() => setIsTyping(false), 1000);
        },
        onError: () => {
          setIsTyping(false);
          toast.error("Failed to send message. Please try again.");
        },
      },
    );

    // Immediately clear the input field
    setNewMessage("");
  };

  // Handle enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format a timestamp
  const formatTime = (ts) => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`flex h-full overflow-hidden ${className}`}>
      {/* Mobile sidebar overlay */}
      {showSidebar && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* SIDEBAR: listing sessions */}
      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-30 h-full w-72 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto transition-transform duration-300 ease-in-out shadow-lg md:shadow-none`}
      >
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Conversations
            </h1>
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronLeft
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
            </button>
          </div>

          <button
            onClick={handleNewChat}
            className="w-full px-4 py-3 bg-[#22C55E] hover:bg-[#1EA34F] text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <MessageSquare size={18} />
            New Conversation
          </button>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider px-2">
              Recent Conversations
            </h2>

            {isLoadingSessions ? (
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center py-6">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#22C55E]"></div>
                </div>
                <div className="mt-2">Loading conversations...</div>
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center py-6 italic">
                No conversations yet
              </div>
            ) : (
              <div className="space-y-2">
                {conversations.map((session) => (
                  <button
                    key={session.session_id}
                    onClick={() => {
                      setSessionId(session.session_id);
                      setShowSidebar(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      sessionId === session.session_id
                        ? "bg-[#DCFCE7] dark:bg-[#0F4021] text-gray-900 dark:text-gray-100"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className="font-medium text-sm truncate flex items-center gap-2">
                      <MessageSquare
                        size={14}
                        className={
                          sessionId === session.session_id
                            ? "text-[#22C55E]"
                            : "text-gray-400"
                        }
                      />
                      {`Session ${session.session_id.substring(0, 8)}...`}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(
                        session.createdAt || Date.now(),
                      ).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MessageSquare
                size={20}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>

            <div>
              <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                {sessionId ? "Active Conversation" : "Chat Interface"}
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {sessionId
                  ? `Session ID: ${sessionId.substring(0, 12)}...`
                  : "Click 'New Conversation' to start chatting"}
              </p>
            </div>
          </div>
        </div>

        {/* Content Area - show placeholder or chat depending on sessionId */}
        {!sessionId ? (
          // Placeholder if no session selected
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-gray-900">
            {isNewChat ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22C55E] mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Creating new chat...
                </h3>
                <p className="max-w-md text-gray-600 dark:text-gray-400">
                  Please wait while we connect you to the assistant.
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-[#DCFCE7] dark:bg-[#0F4021] rounded-full flex items-center justify-center mb-6">
                  <MessageSquare size={40} className="text-[#22C55E]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Welcome to Chat
                </h3>
                <p className="max-w-md text-gray-600 dark:text-gray-400 mb-6">
                  Click the "New Conversation" button to start chatting with the
                  assistant.
                </p>
                <button
                  onClick={handleNewChat}
                  className="px-6 py-3 bg-[#22C55E] hover:bg-[#1EA34F] text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} />
                  Start New Conversation
                </button>
              </>
            )}
          </div>
        ) : (
          // Main chat + input
          <>
            {/* Messages */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-y-auto p-4 space-y-3">
              {isLoadingHistory && sessionHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-700 dark:text-gray-300">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22C55E] mb-4"></div>
                  <div className="text-xl">Loading conversation...</div>
                </div>
              ) : sessionHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-700 dark:text-gray-300">
                  <div className="text-6xl mb-6 bg-[#DCFCE7] dark:bg-[#0F4021] p-6 rounded-full">
                    <MessageSquare size={48} className="text-[#22C55E]" />
                  </div>
                  <h3 className="text-xl font-semibold">Start Chatting</h3>
                  <p className="max-w-md mt-3 text-gray-600 dark:text-gray-400">
                    Type a message below to begin your conversation.
                  </p>
                </div>
              ) : (
                // Render messages from sessionHistory with improved styling
                sessionHistory.map((m, idx) => (
                  <div
                    key={m.id || idx}
                    className={`flex items-start ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                  >
                    {/* Bot icon for assistant messages */}
                    {m.role !== "user" && (
                      <div className="w-8 h-8 rounded-full bg-[#DCFCE7] dark:bg-[#0F4021] flex items-center justify-center mt-1">
                        <Bot size={18} className="text-[#22C55E]" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        m.role === "user"
                          ? "bg-[#22C55E] text-white shadow-md rounded-tr-none"
                          : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm rounded-tl-none border border-gray-100 dark:border-gray-700"
                      }`}
                    >
                      {/* Message content */}
                      <div className="text-sm whitespace-pre-wrap">
                        {m.message}
                      </div>

                      {/* Timestamp - more subtle positioning */}
                      <div
                        className={`text-right mt-1 ${
                          m.role === "user" ? "text-green-100" : "text-gray-400"
                        }`}
                      >
                        <span className="text-xs font-light">
                          {formatTime(m.timestamp)}
                        </span>
                      </div>
                    </div>

                    {/* User icon */}
                    {m.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mt-1">
                        <UserCircle
                          size={18}
                          className="text-gray-600 dark:text-gray-300"
                        />
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* Replaced animated typing indicator with a simple loading state */}
              {isTyping && (
                <div className="flex items-start justify-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#DCFCE7] dark:bg-[#0F4021] flex items-center justify-center mt-1">
                    <Bot size={18} className="text-[#22C55E]" />
                  </div>
                  <div className="max-w-[80%] rounded-lg p-3 bg-white dark:bg-gray-800 shadow-sm rounded-tl-none border border-gray-100 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Assistant is typing...
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messageEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
              <div className="flex space-x-2 items-center">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full py-2 px-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                    placeholder="Type your message..."
                    rows={1}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-3 rounded-full ${
                    newMessage.trim()
                      ? "bg-[#22C55E] text-white hover:bg-[#1EA34F] shadow-md"
                      : "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                  } transition-all duration-200`}
                  title="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatUI;
