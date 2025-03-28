import React, { useEffect, useState, useRef } from "react";
import { useGameSocket } from '../../gameSocket/GameSocket.tsx';
import './Game.css';
import SearchingIndicator from "./searchingIndicator/SearchingIndicator.tsx";
import { useLocation } from "react-router-dom";
import { Piece } from "../../interfaces/Piece.tsx";
import GameHeaders from "./headers/GameHeaders.tsx";
import GameControls from "./controls/GameControls.tsx";
import GameLayout from "./layout/GameLayout.tsx";
import { useGame } from "./GameContext";
import GameOverModal from "./gameover/GameOverModal.tsx"; 
import { UserData } from "../../interfaces/UserData.tsx";
import { MakeMoveData } from "../../interfaces/MakeMoveData.tsx";

export default function Game() {
    const [board, setBoard] = useState<Array<Array<Piece>>>(Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" })));
    const userData: UserData = useLocation().state?.data;
    const { setLastMove } = useGame(); 
    const [showGameOver, setShowGameOver] = useState<{ show: boolean, result: string | null, reason: string | null, rating_change: number | null }>({ show: false, result: null, reason: null, rating_change: null });
    const prevShowGameOverRef = useRef(showGameOver);

    useEffect(() => {
        prevShowGameOverRef.current = showGameOver;
    }, [showGameOver]);

    const makeMove = (data: MakeMoveData) => {
        setLastMove(data);
    };

    const handleGameOver = (result: string, reason: string, rating_change: number) => {
        if (!prevShowGameOverRef.current.show) {
            setShowGameOver({ show: true, result, reason, rating_change });
        }
    };

    const gameData = useGameSocket(setBoard, userData, makeMove, setLastMove, handleGameOver);

    useEffect(() => {
        if (userData?.board_setup) {
            setBoard(userData.board_setup);
        }
    }, [userData]);

    return (
        <div className="game-container">
            <GameHeaders userData={userData} />
            <GameControls gameData={gameData} userData={userData} />
            {gameData.isSearching && <SearchingIndicator />}
            <GameLayout board={board} gameData={gameData} />
            {showGameOver.show && <GameOverModal setShowGameOver={setShowGameOver} showGameOver={showGameOver} gameData={gameData} />}
        </div>
    );
}
