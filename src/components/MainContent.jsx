import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const MainContent = ({
    onMenuClick,
    onClose,
    messages,
    message,
    setMessage,
    onSendMessage,
    onVoiceToggle,
    isListening,
    documentDetails,
    handleSuggestionClick,
}) => {
    return (
        <div className="chatIA-main-content">
            <div className="chatIA-main-header">
                <div className="chatIA-main-header-left">
                    <button className="chatIA-menu-button" onClick={onMenuClick}>
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
                        >
                            <line x1="4" x2="20" y1="12" y2="12"></line>
                            <line x1="4" x2="20" y1="6" y2="6"></line>
                            <line x1="4" x2="20" y1="18" y2="18"></line>
                        </svg>
                    </button>
                    <div className="chatIA-main-header-content">
                        <h2 className="chatIA-main-title">Assistant IA - {documentDetails?.document?.name}</h2>
                        <p className="chatIA-main-subtitle">{documentDetails?.document?.type}</p>
                    </div>
                </div>
                <button className="chatIA-close-main-button" onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </button>
            </div>

            <MessageList document={documentDetails?.document} messages={messages} handleSuggestionClick={handleSuggestionClick} />

            <MessageInput
                message={message}
                setMessage={setMessage}
                onSendMessage={onSendMessage}
                onVoiceToggle={onVoiceToggle}
                isListening={isListening}
            />
        </div>
    );
};

export default MainContent;
