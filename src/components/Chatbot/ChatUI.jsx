import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageSquare,
  UserCircle,
  Bot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import {
  useFetchSessions,
  useFetchSessionHistory,
  useSendChatMessage,
} from "../../hooks/useChatMessage";
import { useAuth } from "../../contexts/AuthContext";
import ReactMarkdown from "react-markdown";

const ChatUI = ({ className = "" }) => {
  const { token } = useAuth();

  const [sessionId, setSessionId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const { data: conversations = [], isLoading: isLoadingSessions } =
    useFetchSessions(token);
  const { data: sessionHistory = [], isLoading: isLoadingHistory } =
    useFetchSessionHistory(sessionId, token);
  const { mutate: sendChat } = useSendChatMessage({
    token,
    onSessionCreated: (newId) => setSessionId(newId),
  });

  const messageEndRef = useRef(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessionHistory, isTyping]);

  const handleNewChat = () => {
    if (!token) {
      toast.error("No token found; please log in again.");
      return;
    }
    setIsNewChat(true);
    setSessionId(null);
    setShowSidebar(true);
    sendChat(
      { sessionId: null, message: "", token },
      {
        onSuccess: () => setIsNewChat(false),
        onError: () => {
          setIsTyping(false);
          toast.error("Failed to start a new conversation.");
        },
      },
    );
  };

  const handleCloseChat = () => {
    setSessionId(null);
    localStorage.removeItem("lastSessionId");
    setIsTyping(false);
    toast.success("Chat closed");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !token) return;
    setIsTyping(true);
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
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (ts) => {
    return new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const storedSession = localStorage.getItem("lastSessionId");
    if (storedSession) setSessionId(storedSession);
  }, []);

  useEffect(() => {
    if (sessionId) localStorage.setItem("lastSessionId", sessionId);
  }, [sessionId]);

  return (
    <div className={`flex h-full overflow-hidden ${className}`}>
      {/* Mobile sidebar overlay */}
      {showSidebar && (
        <div
          className="md:hidden fixed inset-0  z-20"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`${
          showSidebar ? "w-72" : "w-0"
        } md:flex h-full border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto transition-all duration-300 ease-in-out shadow-lg md:shadow-none`}
      >
        <div className="p-4 space-y-6 w-72">
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
                      setShowSidebar(true);
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
                      {new Date(session.timestamp).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden transition-all duration-300 ease-in-out">
        {/* Header with Sidebar Toggle */}
        <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {showSidebar ? (
                <></>
              ) : (
                <ChevronRight
                  size={20}
                  className="text-gray-600 dark:text-gray-300"
                />
              )}
            </button>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {showSidebar ? (
                <ChevronLeft
                  size={20}
                  className="text-gray-600 dark:text-gray-300"
                />
              ) : (
                <ChevronRight
                  size={20}
                  className="text-gray-600 dark:text-gray-300"
                />
              )}
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
          {sessionId && (
            <button
              onClick={handleCloseChat}
              className="px-1 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              <span className="flex items-center justify-center w-5 h-5 bg-white bg-opacity-10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            </button>
          )}
        </div>

        {/* Rest of the component remains unchanged */}
        {!sessionId ? (
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
          <>
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
                sessionHistory.map((m, idx) => (
                  <div
                    key={m.id || idx}
                    className={`flex items-start ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                  >
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
                      <div className="text-sm prose prose-sm dark:prose-invert max-w-none break-words">
                        <ReactMarkdown
                          components={{
                            root: ({ node, ...props }) => <div {...props} />,
                            a: ({ node, ...props }) => (
                              <a
                                {...props}
                                className="text-green-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                            code: ({ node, inline, ...props }) =>
                              inline ? (
                                <code
                                  {...props}
                                  className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                                />
                              ) : (
                                <code
                                  {...props}
                                  className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-xs overflow-x-auto"
                                />
                              ),
                          }}
                        >
                          {m.message}
                        </ReactMarkdown>
                      </div>
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
              <div ref={messageEndRef} />
            </div>
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
