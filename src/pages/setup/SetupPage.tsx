import React, { useEffect, useState } from "react";
import { useGameSocket } from '../../gameSocket/GameSocket.tsx';
import { useLocation } from "react-router-dom";
import { Piece } from "../../interfaces/Piece.tsx";
import SetupLayout from "./setupLayout/SetupLayout.tsx";

export default function SetupPage() {
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
            <SetupLayout board={board} gameData={gameData} />
        </div>
    );
}
