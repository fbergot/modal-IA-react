import { AutoResizeTextarea } from "./Textarea";

const MessageInput = ({
    message,
    setMessage,
    onSendMessage,
    onVoiceToggle,
    isListening,
}) => {
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.altKey) {
            e.preventDefault();
            onSendMessage();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage();
    };

    return (
        <div className="chatIA-input-area">
            <form onSubmit={handleSubmit} className="chatIA-input-container">
                <AutoResizeTextarea
                    message={message}
                    setMessage={setMessage}
                    handleKeyPress={handleKeyPress}
                    className="chatIA-message-input"
                />
                <div className="chatIA-input-buttons">
                    <button
                        type="button"
                        className={`chatIA-voice-button ${isListening ? "listening" : ""}`}
                        onClick={onVoiceToggle}
                        title="Parler à l'IA"
                    >
                        <i
                            className={`fa-light ${isListening ? "fa-microphone-slash" : "fa-microphone"}`}
                        ></i>
                    </button>
                    <button
                        type="submit"
                        className="chatIA-send-button"
                        disabled={!message.trim()}
                    >
                        <i className="fa-light fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;
