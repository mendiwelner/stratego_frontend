import React, { useState } from "react";

interface GameOverModalProps {
    result: string; // שחקן מנצח או null אם אין מנצח עדיין
    onRestart: () => void; // פונקציה לסגירת המודאל
}

const GameOverModal: React.FC<GameOverModalProps> = ({ result, onRestart }) => {
    const [showModal, setShowModal] = useState(true);

    // פונקציה לסגירת המודאל
    const handleClose = () => {
        setShowModal(false);
        onRestart();
    };

    // אם לא הוגדר מנצח (למשל אם המשחק לא נגמר), לא נראה את המודאל
    if (!result) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: showModal ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    width: "300px",
                }}
            >
                <h2>Game Over</h2>
                <p>{result ? `${result} wins!` : "It's a tie!"}</p>
                <button onClick={handleClose} style={{ padding: "10px 20px", borderRadius: "4px", backgroundColor: "#4CAF50", color: "white" }}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default GameOverModal;
