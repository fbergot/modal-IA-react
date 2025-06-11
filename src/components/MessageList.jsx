import { useEffect, useRef } from "react";
import { marked } from "marked";

const MessageList = ({ messages, document }) => {
    const messagesEndRef = useRef(null);

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
                            <rect
                                width="16"
                                height="12"
                                x="4"
                                y="8"
                                rx="2"
                            ></rect>
                            <path d="M2 14h2"></path>
                            <path d="M20 14h2"></path>
                            <path d="M15 13v2"></path>
                            <path d="M9 13v2"></path>
                        </svg>
                        <h3 className="chatIA-welcome-title">
                            Commencez une conversation
                        </h3>
                        <p className="chatIA-welcome-text">
                            Posez une question sur le document {document?.name}
                        </p>
                        <p className="chatIA-welcome-tip">
                            💡 Vous pouvez aussi utiliser la reconnaissance
                            vocale
                        </p>
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
                    <div
                        key={msg.id}
                        className={`message ${msg.isUser ? "message-user" : "message-ai"}`}
                    >
                        <div className="message-content">
                            {renderMessage(msg)}
                        </div>
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
