import { useState, useRef } from "react";
import { handleDisconnectFromGame } from "./gameConnection/DisconnectFromGame.tsx"
import { handleConnectToGame } from "./gameConnection/ConnectToGame.tsx";

export function useGameSocket() {
    const [board, setBoard] = useState<Array<Array<{ number_of_player: number; value: string }>>>(
        Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" }))
    );
    const [markedCell, setMarkedCell] = useState<{ row: number; column: number } | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<Array<{ row: number; column: number }>>([]);
    const socketRef = useRef<WebSocket | null>(null);

    const updateBoardManually = () => {
        setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[0][0] = { number_of_player: 1, value: "X" };
            return newBoard;
        });
    };

    const connectToGame = () => {
        handleConnectToGame(socketRef, setBoard, setMarkedCell, setPossibleMoves, disconnectFromGame);
    };

    const disconnectFromGame = () => {
        handleDisconnectFromGame(socketRef, setBoard, setMarkedCell, setPossibleMoves);
    };

    return {
        board,
        markedCell,
        possibleMoves,
        connectToGame,
        disconnectFromGame,
        updateBoardManually,
        socketRef
    };
}
