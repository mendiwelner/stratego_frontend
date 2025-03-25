// ConnectButton.tsx
import React from "react";

interface ConnectButtonProps {
    connectToGame: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ connectToGame }) => {
    return <button onClick={connectToGame}>Connect to Game</button>;
};

export default ConnectButton;
