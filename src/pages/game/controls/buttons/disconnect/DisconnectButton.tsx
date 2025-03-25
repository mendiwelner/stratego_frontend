// DisconnectButton.tsx
import React from "react";

interface DisconnectButtonProps {
    disconnectFromGame: () => void;
}

const DisconnectButton: React.FC<DisconnectButtonProps> = ({ disconnectFromGame }) => {
    return <button onClick={disconnectFromGame}>Disconnect from Game</button>;
};

export default DisconnectButton;
