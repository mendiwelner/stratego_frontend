import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './Game.css';
import SearchingIndicator from "./searchingIndicator/SearchingIndicator.tsx";
import GameHeaders from "./headers/GameHeaders.tsx";
import GameControls from "./controls/GameControls.tsx";
import GameLayout from "./layout/GameLayout.tsx";
import GameOverModal from "./gameover/GameOverModal.tsx"; 
import { useGameOperations } from "./gameOperations/GameOperations.tsx";

export default function Game() {
    const location = useLocation();
    const initialUserData = location.state?.data || {};
    const { board, showGameOver, setShowGameOver, gameData, userData } = useGameOperations(initialUserData);
    const [refreshKey, setRefreshKey] = useState(0); 

    const handleGameOverButtonClick = () => {
        setRefreshKey(prevKey => prevKey + 1); 
    };

    return (
        <div key={refreshKey} className="game-container">
            <GameHeaders userData={userData} />
            <GameControls gameData={gameData} userData={userData} />
            {gameData.isSearching && <SearchingIndicator />}
            <GameLayout board={board} gameData={gameData} />
            {showGameOver.show && <GameOverModal 
                setShowGameOver={setShowGameOver} 
                showGameOver={showGameOver} 
                gameData={gameData} 
                renderGame={handleGameOverButtonClick} 
            />}
        </div>
    );
}
