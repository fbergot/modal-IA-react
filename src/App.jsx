import { useEffect, useState } from "react";
import IADialog from "./components/IADialog";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [documentId, setDocumentId] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const handleToggleModal = (event) => {
            setIsOpen((prev) => !prev);

            const { documentId, userId: userid } = event.detail;
            setDocumentId(documentId);
            userid && setUserId(userid);
        };

        document.addEventListener("toggleModalIA", handleToggleModal);

        // Nettoyage au démontage
        return () => {
            document.removeEventListener("toggleModalIA", handleToggleModal);
        };
    }, [userId]);

    return (
        <div className="App">
            {isOpen && <IADialog userId={userId} documentId={documentId} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
        </div>
    );
}

export default App;
