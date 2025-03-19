import { useState, useRef, useEffect } from "react";
import { handleDisconnectFromGame } from "./gameConnection/DisconnectFromGame.tsx";
import { handleConnectToGame } from "./gameConnection/ConnectToGame.tsx";
import { Piece } from "../interfaces/Piece.tsx"
import { CellInterface } from "../interfaces/Cell.tsx"

export function useGameSocket() {
    const [board, setBoard] = useState<Array<Array<Piece>>>(Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" })));
    const [markedCell, setMarkedCell] = useState<CellInterface | null>(null);
    const [markedCellHovered, setMarkedCellHovered] = useState<CellInterface | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<Array<CellInterface>>([]);
    const [graveyard, setGraveyard] = useState<Piece[]>([]);
    const [numberOfPlayer, setNumberOfPlayer] = useState<number>(0);
    const socketRef = useRef<WebSocket | null>(null);

    const connectToGame = () => {
        handleConnectToGame(socketRef, setBoard, setNumberOfPlayer, setMarkedCell, setMarkedCellHovered, setPossibleMoves, setGraveyard, disconnectFromGame, numberOfPlayer);
    };

    const disconnectFromGame = () => {
        if (socketRef.current) {
            socketRef.current.onmessage = null;
            socketRef.current.onclose = null;
            socketRef.current.onerror = null;
            socketRef.current.close();
        }
        handleDisconnectFromGame(socketRef, setBoard, setNumberOfPlayer, setMarkedCell, setMarkedCellHovered, setPossibleMoves, setGraveyard, true); 
        socketRef.current = null;
    };

    useEffect(() => {
        if (!socketRef.current) return;

        socketRef.current.onopen = () => {
            console.log("✅ WebSocket connected!");
        };

        socketRef.current.onclose = () => {
            handleDisconnectFromGame(socketRef, setBoard, setNumberOfPlayer, setMarkedCell, setMarkedCellHovered, setPossibleMoves, setGraveyard, false); 
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
        numberOfPlayer,
        graveyard,
        markedCell,
        markedCellHovered,
        possibleMoves,
        connectToGame,
        disconnectFromGame,
        socketRef
    };
}
