import { InputData } from "../../interfaces/InputData.tsx"
import { handleMakeMove } from "./handleInputOperations/HandleMakeMove.tsx";
import { handleMarkCell } from "./handleInputOperations/HandleMarkCell.tsx";
import { handleMarkCellHover } from "./handleInputOperations/HandleMarkCellHover.tsx";
import { handleErrorCellPushed } from "./handleInputOperations/HandleErrorCellPushed.tsx";
import { handleErrorCellHovered } from "./handleInputOperations/HandleErrorCellHovered.tsx";
import { handleMessage } from "./handleInputOperations/HandleMessage.tsx";
import { handleBoardUpdate } from "./handleInputOperations/HandleBoardUpdate.tsx";
import { handlePieceCaptured } from "./handleInputOperations/HandlePieceCaptured.tsx";
import { Piece } from "../../interfaces/Piece.tsx";
import { CellInterface } from "../../interfaces/Cell.tsx";
import { PlayersData } from "../../interfaces/PlayersData.tsx";
import { useEffect } from 'react';

export function handleConnectToGame(
    socketRef: React.MutableRefObject<WebSocket | null>,
    setBoard: React.Dispatch<React.SetStateAction<Array<Array<Piece>>>>,
    setNumberOfPlayer: React.Dispatch<React.SetStateAction<number>>,
    setMarkedCell: React.Dispatch<React.SetStateAction<CellInterface | null>>,
    setMarkedCellHovered: React.Dispatch<React.SetStateAction<CellInterface | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<CellInterface>>>,
    setGraveyard: React.Dispatch<React.SetStateAction<Array<Piece>>>,
    disconnectFromGame: () => void,
    setPlayersData: React.Dispatch<React.SetStateAction<PlayersData>>,
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>,
    setIsInGame: React.Dispatch<React.SetStateAction<boolean>>,
    handleGameOver: any,
    makeMove: any
) {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        console.log("Already connected to the game!");
        return;
    }

    const token = sessionStorage.getItem("access_token");
    const wsUrl = `${process.env.REACT_APP_API_WS_URL}/games/player_connect_game?token=${token}`;
    socketRef.current = new WebSocket(wsUrl);
    setIsSearching(true);
    setIsInGame(true);


    socketRef.current.onopen = () => {
        console.log("Connected to game");
    };

    socketRef.current.onmessage = (event: MessageEvent) => {
        try {
            if (!event.data) {
                console.log("Received empty message.");
                return;
            }
            const data: InputData | null = JSON.parse(event.data);
            if (!data || typeof data !== "object" || !("type" in data)) {
                console.log("Invalid message format:", event.data);
                return;
            }
            switch (data.type) {
                case "message":
                    handleMessage(data, disconnectFromGame, socketRef);
                    break;

                case "error_cell_pushed":
                    handleErrorCellPushed(data, setMarkedCell, setPossibleMoves);
                    break;

                case "error_cell_hovered":
                    handleErrorCellHovered(setMarkedCellHovered);
                    break;

                case "mark_cell":
                    handleMarkCell(data, setMarkedCell, setPossibleMoves);
                    break;

                case "mark_cell_hover":
                    handleMarkCellHover(data, setMarkedCellHovered);
                    break;

                case "make_move":
                    makeMove(data);
                    setMarkedCell(null);
                    setPossibleMoves([]);
                    setTimeout(() => {
                        handleMakeMove(data, setBoard);
                    }, 400);
                    break;

                case "board":
                    setIsSearching(false);
                    handleBoardUpdate(data, setBoard, setPlayersData, setNumberOfPlayer);
                    break;

                case "piece_captured":
                    handlePieceCaptured(data, setGraveyard);
                    break;

                case "endgame":
                    setTimeout(() => {
                        handleGameOver(data.result, data.reason);
                    }, 1400);
                    break

                default:
                    console.log("Unknown message type:", data.type);
                    break;
            }
        } catch (error) {
            console.error("Error parsing WebSocket message:", error, event.data);
        }
    };

    socketRef.current.onclose = () => {
        setBoard(Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" })));
        setMarkedCell(null);
        setPossibleMoves([]);
        console.log("connection closed!");
    };

    socketRef.current.onerror = () => {
        console.log("Error: WebSocket connection failed.");
    };
}
