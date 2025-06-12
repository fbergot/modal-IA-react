import { useRef, useEffect } from "react";

export const AutoResizeTextarea = ({ message, setMessage, handleKeyPress }) => {
    const textareaRef = useRef(null);

    // Fonction pour ajuster la hauteur en fonction du contenu
    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            // Reset height to auto to get the correct scrollHeight
            textarea.style.height = "auto";
            // Set height to scrollHeight
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    // Ajuster la hauteur quand le message change
    useEffect(() => {
        adjustHeight();
    }, [message]);

    return (
        <textarea
            ref={textareaRef}
            placeholder="Posez une question sur ce document"
            className="chatIA-message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
            rows={1}
            style={{
                resize: "none",
                overflow: "hidden",
                minHeight: "40px",
                maxHeight: "120px",
            }}
        />
    );
};
