
import React from 'react';
import "../style/GameHeaders.css";
import ConnectButton from "../main/buttons/ConnectButton.tsx";
import DisconnectButton from "../main/buttons/DisconnectButton.tsx";
import LogoutButton from "../main/buttons/LogoutButton.tsx";
import SetupButton from "../main/buttons/SetupButton.tsx"
import "../style/GameControls.css";

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
