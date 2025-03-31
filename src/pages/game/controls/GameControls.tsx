
import React from 'react';
import ConnectButton from "./buttons/connect/ConnectButton.tsx";
import DisconnectButton from "./buttons/disconnect/DisconnectButton.tsx";
import LogoutButton from "./buttons/logout/LogoutButton.tsx";
import SetupButton from "./buttons/setup/SetupButton.tsx"
import "./GameControls.css";
import { UserData } from '../../../interfaces/UserData.tsx';
import { GameData } from '../../../interfaces/GameData.tsx';

interface GameControlsProps {
    gameData: GameData;
    userData: UserData;
}

const GameControls: React.FC<GameControlsProps> = ({ gameData, userData }) => {
    return (
        <div className="game-controls">
            <div className="controls-left-section">
                {!gameData.isInGame && <SetupButton userData={userData} />}
            </div>
            <div className="controls-center-section">
                {!gameData.isInGame && <ConnectButton connectToGame={gameData.connectToGame} />}
                {gameData.isInGame && <DisconnectButton disconnectFromGame={gameData.leaveTheGame} isSearching={gameData.isSearching}/>}
            </div>
            <div className="controls-right-section">
                <LogoutButton isInGame={gameData.isInGame} userName={userData.user_name}/>
            </div>
        </div>
    );
};

export default GameControls;
