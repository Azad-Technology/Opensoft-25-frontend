import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import { Send, Paperclip, Image } from "lucide-react";

const ChatUI = ({ className = "" }) => {
  const { user } = useAuth();
  const {
    chatSessions,
    chatMessages,
    getRecentMessages,
    startNewChatSession,
    sendChatMessage,
  } = useData();

  const [selectedSession, setSelectedSession] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const userSessions = chatSessions
    .filter((session) => user && session.employeeId === user.employeeId)
    .sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
    );

  useEffect(() => {
    if (!user) return;

    if (userSessions.length > 0 && !selectedSession) {
      const latestSession = userSessions[0];
      setSelectedSession(latestSession);
    }
  }, [user, userSessions, selectedSession]);

  useEffect(() => {
    if (selectedSession) {
      const messages = getRecentMessages(selectedSession.id);
      setCurrentMessages(messages);
    }
  }, [selectedSession, getRecentMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleNewChat = () => {
    if (!user) return;

    const newSession = startNewChatSession(user.employeeId);
    setSelectedSession(newSession);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedSession) return;

    sendChatMessage(selectedSession.id, newMessage, "user");
    setNewMessage("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && selectedSession) {
      sendChatMessage(
        selectedSession.id,
        `[Attached file: ${file.name}]`,
        "user",
        [
          {
            type: "file",
            url: "#",
            name: file.name,
          },
        ],
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && selectedSession) {
      const imageUrl = URL.createObjectURL(file);
      sendChatMessage(selectedSession.id, `[Attached image]`, "user", [
        {
          type: "image",
          url: imageUrl,
          name: file.name,
        },
      ]);
    }
  };

  return (
    <div className={`flex h-full ${className}`}>
      {/* Sidebar */}
      <div className="hidden md:block w-64 border-r  border-border bg-background overflow-y-auto">
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
            <div className="space-y-2">
              {userSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedSession?.id === session.id
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <div className="font-medium text-sm truncate">
                    {session.title || formatDate(session.startTime)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(session.startTime).toLocaleDateString()}
                    {session.completed ? " • Completed" : ""}
                  </div>
                </button>
              ))}

              {userSessions.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-6">
                  No conversations yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-background overflow-hidden">
        {selectedSession ? (
          <>
            <div className="flex justify-between items-center py-3 px-4 border-b border-border">
              <div>
                <h2 className="font-medium">
                  {selectedSession.title || "Conversation"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {formatDate(selectedSession.startTime)}
                </p>
              </div>
              <div className="md:hidden">
                <button
                  onClick={handleNewChat}
                  className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  New Chat
                </button>
              </div>
            </div>

            <div className="flex-1 dark:bg-slate-800 bg-gray-100 overflow-y-auto p-4 space-y-4">
              {currentMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-lg font-medium">
                    Start the conversation
                  </h3>
                  <p className="max-w-md mt-2">
                    Share how you're feeling today or any thoughts you'd like to
                    discuss.
                  </p>
                </div>
              ) : (
                currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground shadow-md shadow-black/30 dark:bg-green-600 bg-green-700 rounded-tr-none"
                          : "neo-glass rounded-tl-none"
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>

                      {message.attachments?.map((attachment, index) => (
                        <div key={index} className="mt-2">
                          {attachment.type === "image" ? (
                            <img
                              src={attachment.url}
                              alt={attachment.name}
                              className="max-w-full h-auto rounded-lg"
                            />
                          ) : (
                            <div className="flex items-center p-2 bg-background bg-opacity-10 rounded-lg">
                              <Paperclip size={16} className="mr-2" />
                              <span className="text-xs">{attachment.name}</span>
                            </div>
                          )}
                        </div>
                      ))}

                      <div className="text-right mt-1">
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

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
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-full ${
                    newMessage.trim()
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <div className="text-6xl mb-4">👋</div>
            <h3 className="text-lg font-medium">No conversation selected</h3>
            <button
              onClick={handleNewChat}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start a new conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUI;
