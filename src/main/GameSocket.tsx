import { useState, useRef } from "react";
import { handleDisconnectFromGame } from "./gameConnection/DisconnectFromGame.tsx"
import { handleConnectToGame } from "./gameConnection/ConnectToGame.tsx";

export function useGameSocket() {
    const [board, setBoard] = useState<Array<Array<{ number_of_player: number; value: string }>>>(
        Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" }))
    );
    const [markedCell, setMarkedCell] = useState<{ row: number; column: number } | null>(null);
    const [markedCellHovered, setMarkedCellHovered] = useState<{ row: number; column: number } | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<Array<{ row: number; column: number }>>([]);
    const socketRef = useRef<WebSocket | null>(null);

    const connectToGame = () => {
        handleConnectToGame(socketRef, setBoard, setMarkedCell, setMarkedCellHovered, setPossibleMoves, disconnectFromGame);
    };

    const disconnectFromGame = () => {
        handleDisconnectFromGame(socketRef, setBoard, setMarkedCell, setMarkedCellHovered, setPossibleMoves);
    };

    return {
        board,
        markedCell,
        markedCellHovered, 
        possibleMoves,
        connectToGame,
        disconnectFromGame,
        socketRef
    };
}
