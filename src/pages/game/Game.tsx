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

export default function Game() {
    const [board, setBoard] = useState<Array<Array<Piece>>>(Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" })));
    const userData = useLocation().state?.data;
    const { setLastMove } = useGame(); 
    const [showGameOver, setShowGameOver] = useState<{ show: boolean, result: string | null, reason: string | null }>({ show: false, result: null, reason: null });
    const prevShowGameOverRef = useRef(showGameOver);

    useEffect(() => {
        prevShowGameOverRef.current = showGameOver;
    }, [showGameOver]);

    const makeMove = (data: any) => {
        setLastMove(data);
    };

    const handleGameOver = (result: string, reason: string) => {
        if (!prevShowGameOverRef.current.show) {
            setShowGameOver({ show: true, result, reason });
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
            <GameHeaders userName={userData?.user_name} />
            <GameControls gameData={gameData} userData={userData} />
            {gameData.isSearching && <SearchingIndicator />}
            <GameLayout board={board} gameData={gameData} />
            {showGameOver.show && <GameOverModal setShowGameOver={setShowGameOver} showGameOver={showGameOver} gameData={gameData} />}
        </div>
    );
}
