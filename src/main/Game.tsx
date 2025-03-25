import React, { useEffect, useState } from "react";
import { useGameSocket } from './GameSocket.tsx';
import '../style/Game.css';
import SearchingIndicator from "../elements/SearchingIndicator.tsx";
import { useLocation } from "react-router-dom";
import { Piece } from "../interfaces/Piece.tsx";
import GameHeaders from "../elements/GameHeaders.tsx";
import GameControls from "../elements/GameControls.tsx";
import GameLayout from "../elements/GameLayout.tsx";

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
            <GameControls gameData={gameData} />
            {gameData.isSearching && <SearchingIndicator />}
            <GameLayout board={board} gameData={gameData} />
        </div>
    );
}
