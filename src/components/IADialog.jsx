import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "./IADialog.css";
import { useCallback } from "react";

const IADialog = ({ isOpen, onClose, documentId }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [documentDetails, setDocumentDetails] = useState({});
    const [chatHistory, setChatHistory] = useState([]);
    const [speechRecognition, setSpeechRecognition] = useState(null);

    // Fermer la modale avec Escape
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        // nettoyage au démontage
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.querySelector(".dashboard-content").style.zIndex = "10";
            document.querySelector(".container-scroll").style.overflowY = "auto";
        };
    }, [isOpen, onClose]);

    // on vient chercher les détails du doc
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/fr/document/details/${documentId}`);
                if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
                const document = await response.json();
                setDocumentDetails(document);
            } catch (error) {
                console.error("Erreur fetch:", error);
            }
        })();
    }, [documentId]);

    const fetchChatHistory = useCallback(async (documentId, searchParams) => {
        try {
            const response = await fetch(
                `/fr/document/chathistory/${documentId}?search=${encodeURIComponent(searchParams || "")}`
            );
            if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
            const data = await response.json();

            let newChat = [];
            if (data.chatHistory?.length) {
                newChat = [
                    {
                        id: 0,
                        title: "Nouvelle conversation",
                        createdAt: new Date(),
                    },
                    ...data.chatHistory,
                ];
            } else {
                newChat = [
                    {
                        id: 0,
                        title: "Nouvelle conversation",
                        createdAt: new Date(),
                    },
                ];
            }
            setChatHistory(newChat);
        } catch (error) {
            console.error("Erreur fetch:", error);
        }
    }, []);

    // ON vient chercher l'historique des requetes/réponses
    useEffect(() => {
        fetchChatHistory(documentId);
    }, [documentId, fetchChatHistory]);

    useEffect(() => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "fr-FR";

            recognition.onstart = () => {
                setIsListening(true);
                setMessage('Enregistrement en cours ...');
            };

            // Ajouter le message audio de l'utilisateur
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setIsListening(false);
                setMessage(transcript);
            };

            recognition.onerror = (event) => {
                console.error("Erreur de reconnaissance vocale:", event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            setSpeechRecognition(recognition);
        }
    }, []);

    const handleChangeChat = (id) => {
        const currentChat = chatHistory.find((chat) => chat.id === id);
        const newMessages =
            currentChat.id === 0
                ? []
                : [
                      {
                          id: Date.now(),
                          text: currentChat.userPrompt,
                          isUser: true,
                          timestamp: new Date(currentChat.createdAt),
                      },
                      {
                          id: Date.now() + 5,
                          text: currentChat.response,
                          isUser: false,
                          timestamp: new Date(currentChat.createdAt),
                      },
                  ];
        setMessages(newMessages);
        setMessage("");
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Ajouter le message de l'utilisateur
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                text: message,
                isUser: true,
                timestamp: new Date(),
            },
        ]);

        setMessage("");

        try {
            // On ajoute un message avec loader le telmps de la réponse
            const typingId = Date.now() + 1;
            setMessages((prev) => [
                ...prev,
                {
                    id: typingId,
                    isUser: false,
                    isTyping: true,
                    timestamp: new Date(),
                },
            ]);

            const urlAnalyze = `/fr/document/analyzeIA/${documentId}?prompt=${encodeURIComponent(message)}`;
            const response = await fetch(urlAnalyze);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const data = await response.json();

            // Retire l'indicateur de typing et ajoute la vraie réponse
            setMessages((prev) => [
                ...prev.filter((msg) => msg.id !== typingId),
                {
                    id: Date.now(),
                    text: data.responseMessage,
                    isUser: false,
                    timestamp: new Date(),
                },
            ]);
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error);

            setMessages((prev) => prev.filter((msg) => !msg.isTyping));

            // Ajouter un message d'erreur
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    text: "Désolé, une erreur s'est produite. Veuillez réessayer.",
                    isUser: false,
                    isError: true,
                    timestamp: new Date(),
                },
            ]);
        }
    };

    const handleVoiceToggle = () => {
        if (speechRecognition && isListening) {
            speechRecognition.stop();
        }
        if (speechRecognition && !isListening) {
            speechRecognition.start();
        }
    };

    const handleKeyUpSearchChat = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            fetchChatHistory(documentId, searchTerm);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setMessage(suggestion.question);
    };

    if (!isOpen) return null;

    return (
        <div className="chatIA-overlay" onClick={onClose}>
            <div className="chatIA-container open" onClick={(e) => e.stopPropagation()}>
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    searchTerm={searchTerm}
                    handleKeyUpSearchChat={handleKeyUpSearchChat}
                    chatHistory={chatHistory}
                    handleChangeChat={handleChangeChat}
                    setSearchTerm={setSearchTerm}
                />

                <MainContent
                    documentDetails={documentDetails}
                    onMenuClick={() => setSidebarOpen(true)}
                    onClose={onClose}
                    messages={messages}
                    message={message}
                    setMessage={setMessage}
                    onSendMessage={handleSendMessage}
                    onVoiceToggle={handleVoiceToggle}
                    isListening={isListening}
                    handleSuggestionClick={handleSuggestionClick}
                />
            </div>
        </div>
    );
};

export default IADialog;
