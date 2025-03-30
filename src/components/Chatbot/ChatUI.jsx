import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Image } from "lucide-react";
import { toast } from "sonner";
import {
  useFetchSessions,
  useFetchSessionHistory,
  useSendChatMessage,
} from "../../hooks/useChatMessage";
import { useAuth } from "../../contexts/AuthContext";

const ChatUI = ({ className = "" }) => {
  const { user, token } = useAuth();

  // sessionId changes when the user picks a different session
  const [sessionId, setSessionId] = useState(null);
  // isTyping is local-only
  const [isTyping, setIsTyping] = useState(false);
  // text input
  const [newMessage, setNewMessage] = useState("");

  // 1) Load all sessions for the sidebar
  const { data: conversations = [], isLoading: isLoadingSessions } =
    useFetchSessions(token);

  // console.log("conversations", conversations);

  // 2) Load the session history for the selected session
  const {
    data: sessionHistory = [], // array of messages from the server
    isLoading: isLoadingHistory,
  } = useFetchSessionHistory(sessionId, token);

  // 3) Send message mutation
  const { mutate: sendChat } = useSendChatMessage({
    token,
    onSessionCreated: (newId) => {
      setSessionId(newId);
    },
  });

  const messageEndRef = useRef(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessionHistory]);

  // Start a brand-new chat
  const handleNewChat = () => {
    if (!token) {
      toast.error("No token found; please log in again.");
      return;
    }
    setSessionId(null); // not strictly necessary if you want to show "Not started"

    // Send an empty message to create a brand new session
    sendChat(
      { sessionId: null, message: "", token },
      {
        onSuccess: (data) => {
          // The sessionHistory query is invalidated, so once the new
          // session_id is set, sessionHistory will load from the server.
          // If you want an immediate “assistant’s first message” from data.response:
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 1000);
        },
      },
    );
  };

  // Send a user message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !token) return;
    // sessionId can be null => server creates a new session
    sendChat(
      { sessionId, message: newMessage, token },
      {
        onSuccess: (data) => {
          // The onSuccess invalidates ["chatHistory", sessionId],
          // so sessionHistory re-fetches with the new message + assistant’s response.
          setNewMessage("");
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 1000);
        },
      },
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // File & image placeholders
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const handleFileUpload = () => fileInputRef.current?.click();
  const handleImageUpload = () => imageInputRef.current?.click();
  const handleFileChange = () => toast("File upload not supported yet.");
  const handleImageChange = () => toast("Image upload not supported yet.");

  const formatTime = (ts) => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`flex h-full ${className}`}>
      {/* SIDEBAR: listing sessions */}
      <div className="hidden md:block w-64 border-r border-border bg-background overflow-y-auto">
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full px-4 text-black dark:text-white py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors button-hover"
          >
            New Conversation
          </button>

          <div className="mt-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">
              Recent Conversations
            </h2>

            {isLoadingSessions ? (
              <div className="text-sm text-muted-foreground text-center py-6">
                Loading...
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-6">
                No conversations yet
              </div>
            ) : (
              <div className="space-y-2">
                {conversations.map((session) => (
                  <button
                    key={session.session_id}
                    onClick={() => setSessionId(session.session_id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-secondary/50 ${
                      sessionId === session.session_id
                        ? "bg-secondary text-secondary-foreground"
                        : ""
                    }`}
                  >
                    <div className="font-medium text-sm truncate">
                      {`Session: ${session.session_id}`}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
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
      <div className="flex-1 flex flex-col bg-background overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-4 border-b border-border">
          <div>
            <h2 className="font-medium">Conversation</h2>
            <p className="text-xs text-muted-foreground">
              Session: {sessionId || "Not started"}
            </p>
          </div>
          {/* On mobile, show a "New Chat" button */}
          <div className="md:hidden">
            <button
              onClick={handleNewChat}
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              New Chat
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 dark:bg-slate-800 bg-gray-100 overflow-y-auto p-4 space-y-4">
          {!sessionId && sessionHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <div className="text-6xl mb-4">👋</div>
              <h3 className="text-lg font-medium">No conversation selected</h3>
              <p className="max-w-md mt-2">
                Select or start a new conversation from the sidebar.
              </p>
            </div>
          ) : isLoadingHistory ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <div className="text-2xl mb-4">Loading conversation...</div>
            </div>
          ) : sessionHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-medium">No messages yet</h3>
              <p className="max-w-md mt-2">
                Type a message below to start the conversation.
              </p>
            </div>
          ) : (
            sessionHistory.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3 ${
                    m.sender === "user"
                      ? "bg-primary text-primary-foreground shadow-md dark:bg-green-600 bg-green-700 rounded-tr-none"
                      : "neo-glass rounded-tl-none"
                  }`}
                >
                  <div className="text-sm">{m.message}</div>
                  <div className="text-right mt-1">
                    <span className="text-xs opacity-70">
                      {formatTime(m.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-xl p-3 neo-glass rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-primary rounded-full animate-pulse-slow" />
                  <div
                    className="h-2 w-2 bg-primary rounded-full animate-pulse-slow"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="h-2 w-2 bg-primary rounded-full animate-pulse-slow"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messageEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <button
              onClick={handleFileUpload}
              className="p-2 text-muted-foreground hover:text-primary bg-secondary rounded-full"
            >
              <Paperclip size={20} />
            </button>
            <button
              onClick={handleImageUpload}
              className="p-2 text-muted-foreground hover:text-primary bg-secondary rounded-full"
            >
              <Image size={20} />
            </button>
            <div className="flex-1 relative text-black">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full py-2 px-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type your message..."
                rows={1}
                disabled={!sessionId}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!sessionId || !newMessage.trim()}
              className={`p-2 rounded-full ${
                newMessage.trim() && sessionId
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-muted-foreground"
              } transition-colors`}
            >
              <Send size={20} />
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
