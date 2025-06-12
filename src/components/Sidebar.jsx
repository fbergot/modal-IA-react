import { Loader } from "lucide-react";
import { useState } from "react";

const Sidebar = ({ isOpen, onClose, searchTerm, setSearchTerm, chatHistory, handleChangeChat, handleKeyUpSearchChat, chatHistoryIsLoading }) => {
    const [isActive, setIsActive] = useState({ id: 0, state: true });

    const handleClickChat = (id) => {
        handleChangeChat(id), setIsActive({ id, state: true });
    };

    const getChatClassName = (id) => {
        let classNames = "chatIA-chat-item";
        if (isActive.id === id && isActive.state) {
            classNames = classNames.concat(" isActive");
        }
        return classNames;
    };
    return (
        <div className={`chatIA-sidebar ${isOpen ? "sidebar-open" : ""}`}>
            <div className="chatIA-sidebar-header">
                <div className="chatIA-sidebar-title-row">
                    <h3 className="chatIA-sidebar-title">Historique</h3>
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
                <div className="chatIA-search-container">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="chatIA-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyUp={handleKeyUpSearchChat}
                    />
                </div>
            </div>
            <div className="chatIA-sidebar-content">
                {
                    chatHistoryIsLoading ?
                        <div className="chatIA-container-chat-loader">
                            <Loader size={24} className="chatIA-animate-spin" />
                        </div>
                    : chatHistory.map((chat) => (
                        <div onClick={() => handleClickChat(chat.id)} key={chat.id} className={getChatClassName(chat.id)}>
                            <div className="chatIA-chat-item-title">{chat.userPrompt || chat.title}</div>
                            <div className="chatIA-chat-item-time">
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
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                {moment(chat.createdAt).format("DD/MM/YYYY")}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Sidebar;
