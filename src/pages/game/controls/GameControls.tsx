
import React from 'react';
import ConnectButton from "./buttons/connect/ConnectButton.tsx";
import DisconnectButton from "./buttons/disconnect/DisconnectButton.tsx";
import LogoutButton from "./buttons/logout/LogoutButton.tsx";
import SetupButton from "./buttons/setup/SetupButton.tsx"
import "./GameControls.css";

interface GameControlsProps {
    gameData: any;
}

const GameControls: React.FC<GameControlsProps> = ({ gameData }) => {
    return (
        <div className="game-controls">
            <div className="left-section">
                <SetupButton logout={gameData.logout} />
            </div>
            <div className="center-section">
                <ConnectButton connectToGame={gameData.connectToGame} />
                <DisconnectButton disconnectFromGame={gameData.disconnectFromGame} />
            </div>
            <div className="right-section">
                <LogoutButton logout={gameData.logout} />
            </div>
        </div>
    );
};

export default GameControls;
