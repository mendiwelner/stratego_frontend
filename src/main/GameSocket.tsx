import { useState, useRef, useEffect } from "react";
import { handleDisconnectFromGame } from "./gameConnection/DisconnectFromGame.tsx";
import { handleConnectToGame } from "./gameConnection/ConnectToGame.tsx";

export function useGameSocket() {
    const [board, setBoard] = useState<Array<Array<{ number_of_player: number; value: string }>>>(Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" })));
    const [markedCell, setMarkedCell] = useState<{ row: number; column: number } | null>(null);
    const [markedCellHovered, setMarkedCellHovered] = useState<{ row: number; column: number } | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<Array<{ row: number; column: number }>>([]);
    const [graveyard, setGraveyard] = useState<Array<{ player: number; value: string }>>([]);
    const socketRef = useRef<WebSocket | null>(null);

    const connectToGame = () => {
        handleConnectToGame(socketRef, setBoard, setMarkedCell, setMarkedCellHovered, setPossibleMoves, setGraveyard, disconnectFromGame);
    };

    const disconnectFromGame = () => {
        if (socketRef.current) {
            socketRef.current.onmessage = null;
            socketRef.current.onclose = null;
            socketRef.current.onerror = null;
            socketRef.current.close();
        }
        handleDisconnectFromGame(socketRef, setBoard, setMarkedCell, setMarkedCellHovered, setPossibleMoves, setGraveyard, true); 
        socketRef.current = null;
    };

    useEffect(() => {
        if (!socketRef.current) return;

        socketRef.current.onopen = () => {
            console.log("✅ WebSocket connected!");
        };

        socketRef.current.onclose = () => {
            handleDisconnectFromGame(socketRef, setBoard, setMarkedCell, setMarkedCellHovered, setPossibleMoves, setGraveyard, false); 
            console.log("🔴 WebSocket connection closed!");
        };

        socketRef.current.onerror = (error) => {
            console.error("❌ WebSocket encountered an error:", error);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.onmessage = null;
                socketRef.current.onclose = null;
                socketRef.current.onerror = null;
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [socketRef.current]);

    return {
        board,
        markedCell,
        markedCellHovered,
        possibleMoves,
        graveyard,
        connectToGame,
        disconnectFromGame,
        socketRef
    };
}
