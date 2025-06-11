import { useEffect, useState } from "react";
import IADialog from "./components/IADialog";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [documentId, setDocumentId] = useState(null);

    useEffect(() => {
        const handleToggleModal = (event) => {
            setIsOpen((prev) => !prev);
            const { documentId } = event.detail;
            setDocumentId(documentId);
        };

        document.addEventListener("toggleModalIA", handleToggleModal);

        // Nettoyage au démontage
        return () => {
            document.removeEventListener("toggleModalIA", handleToggleModal);
        };
    }, []);

    return (
        <div className="App">
            {isOpen && (
                <IADialog
                    documentId={documentId}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}

export default App;
