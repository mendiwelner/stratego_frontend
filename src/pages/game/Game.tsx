import React, { useEffect, useState } from "react";
import { useGameSocket } from '../../gameSocket/GameSocket.tsx';
import './Game.css';
import SearchingIndicator from "./searchingIndicator/SearchingIndicator.tsx";
import { useLocation } from "react-router-dom";
import { Piece } from "../../interfaces/Piece.tsx";
import GameHeaders from "./headers/GameHeaders.tsx";
import GameControls from "./controls/GameControls.tsx";
import GameLayout from "./layout/GameLayout.tsx";

export default function Game() {
    const [board, setBoard] = useState<Array<Array<Piece>>>(Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" })));
    const location = useLocation();
    const userData = location.state?.data;
    const gameData = useGameSocket(setBoard, userData);

    useEffect(() => {
        if (userData?.board_setup) {
            setBoard(userData.board_setup);
        }
    }, [userData]); 

    return (
        <div className="game-container">
            <GameHeaders userName={userData?.user_name} />
            <GameControls gameData={gameData} userData={userData}/>
            {gameData.isSearching && <SearchingIndicator />}
            <GameLayout board={board} gameData={gameData} />
        </div>
    );
}
