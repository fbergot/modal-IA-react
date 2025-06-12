import { useEffect, useRef } from "react";
import { marked } from "marked";
import { Lightbulb, Loader } from "lucide-react";
import { getSuggestions } from "../utils/documentSuggestions";

const MessageList = ({ messages, document, handleSuggestionClick }) => {
    const messagesEndRef = useRef(null);
    const suggestions = document?.type ? getSuggestions(document.type) : [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (messages.length === 0) {
        return (
            <div className="chatIA-messages-area">
                <div className="chatIA-messages-content">
                    <div className="chatIA-welcome-section">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="chatIA-welcome-icon"
                        >
                            <path d="M12 8V4H8"></path>
                            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                            <path d="M2 14h2"></path>
                            <path d="M20 14h2"></path>
                            <path d="M15 13v2"></path>
                            <path d="M9 13v2"></path>
                        </svg>
                        <h3 className="chatIA-welcome-title">Commencez une conversation</h3>
                        <p className="chatIA-welcome-tip">
                            <Lightbulb style={{ width: "1.5rem", height: "1.5rem", color: "#58c0cc" }} />
                            Vous pouvez aussi utiliser la reconnaissance vocale
                        </p>
                    </div>
                </div>

                {/* on gère les Suggestions ici */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="chatIA-header-suggestions">
                        <Lightbulb style={{ width: "1.5rem", height: "1.5rem", color: "#58c0cc" }} />
                        Questions suggérées pour ce type de document
                    </div>

                    <div style={{ display: "grid", gap: "0.5rem" }}>
                        {
                            suggestions.length ?
                                suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="chatIA-suggestion-tile"
                                    >
                                        {suggestion.question}
                                    </button>
                                ))
                            :
                        <div className="chatIA-container-chat-loader">
                            <Loader size={24} className="chatIA-animate-spin" />
                        </div>
                    }
                    </div>
                </div>
            </div>
        );
    }

    const renderMessage = (msg) => {
        if (msg.isTyping) {
            return (
                <>
                    <div className="typing-indicator">
                        <span>•</span>
                        <span>•</span>
                        <span>•</span>
                    </div>
                </>
            );
        }
        const htmlContent = marked(msg.text || "");
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    };

    return (
        <div className="chatIA-messages-area">
            <div className="chatIA-messages-content">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.isUser ? "message-user" : "message-ai"}`}>
                        <div className="message-content">{renderMessage(msg)}</div>
                        <div className="message-time">
                            {msg.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default MessageList;
