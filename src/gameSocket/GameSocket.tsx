import { useState, useRef, useEffect } from "react";
import { handleDisconnectFromGame } from "./gameConnection/DisconnectFromGame.tsx";
import { handleConnectToGame } from "./gameConnection/ConnectToGame.tsx";
import { Piece } from "../interfaces/Piece.tsx";
import { CellInterface } from "../interfaces/Cell.tsx";
import { PlayersData } from "../interfaces/PlayersData.tsx";
import { GameData } from "../interfaces/GameData.tsx";
import { UserData } from "../interfaces/UserData.tsx";
import { GameOperationsSend } from "../interfaces/GameOperationsSend.tsx";

export function useGameSocket(userData: UserData, gameOperations: GameOperationsSend): GameData {
    const { setBoard, makeMove, setLastMove, handleGameOver } = gameOperations;
    const [markedCell, setMarkedCell] = useState<CellInterface | null>(null);
    const [markedCellHovered, setMarkedCellHovered] = useState<CellInterface | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<Array<CellInterface>>([]);
    const [graveyard, setGraveyard] = useState<Piece[]>([]);
    const [numberOfPlayer, setNumberOfPlayer] = useState<number>(0);
    const socketRef = useRef<WebSocket | null>(null);
    const [playersData, setPlayersData] = useState<PlayersData>({ your_name: "", opponent_name: "" });
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isInGame, setIsInGame] = useState<boolean>(false);

    // useRef to track the value of isSearching
    const isSearchingRef = useRef(isSearching);

    // Update the ref whenever isSearching changes
    useEffect(() => {
        isSearchingRef.current = isSearching;
    }, [isSearching]);

    const logout = () => {
        leaveTheGame();
        console.log("User logged out.");
    };

    useEffect(() => {
        console.log("isSearching changed:", isSearching);
    }, [isSearching]);

    const connectToGame = () => {
        handleConnectToGame(
            socketRef,
            setBoard,
            setNumberOfPlayer,
            setMarkedCell,
            setMarkedCellHovered,
            setPossibleMoves,
            setGraveyard,
            disconnectFromGame,
            setPlayersData,
            setIsSearching,
            setIsInGame,
            handleGameOver,
            makeMove
        );
    };

    const leaveTheGame = () => {
        if (isSearchingRef.current) { 
            setIsSearching(false);
            handleDisconnectFromGame(socketRef, setBoard, setNumberOfPlayer, setMarkedCell, setMarkedCellHovered, setPossibleMoves, setGraveyard, setPlayersData, setIsInGame, setLastMove, userData.board_setup, true);
        } else {
            console.log("l");
            socketRef.current?.send(JSON.stringify({action: "disconnect"}));
        }
    }

    const disconnectFromGame = () => {
        if (socketRef.current) {
            socketRef.current.onmessage = null;
            socketRef.current.onclose = null;
            socketRef.current.onerror = null;
            socketRef.current.close();
        }
        handleDisconnectFromGame(socketRef, setBoard, setNumberOfPlayer, setMarkedCell, setMarkedCellHovered, setPossibleMoves, setGraveyard, setPlayersData, setIsInGame, setLastMove, userData.board_setup, true);
        socketRef.current = null;
        setIsSearching(false);
    };

    useEffect(() => {
        if (!socketRef.current) return;
        socketRef.current.onopen = () => {
            console.log("✅ WebSocket connected!");
        };

        socketRef.current.onclose = (event) => {
            console.log(isSearchingRef.current);  // This should now log the updated value of isSearching
            if (event.code == 1012) {
                if (isSearchingRef.current) {
                    leaveTheGame();
                    alert("the server can't get the connection");
                } else {
                    setTimeout(() => {
                        handleGameOver("draw", "server_disconnected", 0);
                    }, 1500);
                }
            }
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
        numberOfPlayer,
        graveyard,
        markedCell,
        markedCellHovered,
        possibleMoves,
        connectToGame,
        leaveTheGame,
        disconnectFromGame,
        socketRef,
        playersData,
        isSearching,
        isInGame,
        logout
    };
}
