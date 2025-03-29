// DisconnectButton.tsx
import React from "react";

interface DisconnectButtonProps {
    disconnectFromGame: () => void;
    isSearching: boolean;
}

const DisconnectButton: React.FC<DisconnectButtonProps> = ({ disconnectFromGame, isSearching }) => {
    return (
        <button onClick={disconnectFromGame}>
            {isSearching ? "Cancel Searching" : "Leave the Game"}
        </button>
    );
};

export default DisconnectButton;
