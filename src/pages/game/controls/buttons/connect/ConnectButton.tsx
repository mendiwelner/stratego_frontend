// ConnectButton.tsx
import React from "react";

interface ConnectButtonProps {
    connectToGame: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ connectToGame }) => {
    return <button onClick={connectToGame}>start a Game</button>;
};

export default ConnectButton;
