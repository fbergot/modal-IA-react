import { AutoResizeTextarea } from "./Textarea";

const MessageInput = ({ message, setMessage, onSendMessage, onVoiceToggle, isListening }) => {
    const handleKeyPress = (e) => {
        // Ctrl+Enter : ajouter une nouvelle ligne
        if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
            const cursorPosition = e.target.selectionStart;
            const newMessage = message.slice(0, cursorPosition) + '\n' + message.slice(cursorPosition);
            setMessage(newMessage);

            // Repositionner le curseur après la nouvelle ligne
            e.target.selectionStart = cursorPosition + 1;
            e.target.selectionEnd = cursorPosition + 1;
        } else if (e.key === "Enter" && !e.ctrlKey) {
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
                        <i className={`fa-light ${isListening ? "fa-microphone-slash" : "fa-microphone"}`}></i>
                    </button>
                    <button type="submit" className="chatIA-send-button" disabled={!message.trim()}>
                        <i className="fa-light fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;
