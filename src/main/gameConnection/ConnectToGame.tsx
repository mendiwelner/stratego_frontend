import { InputData } from "../../interfaces/InputData.tsx"
import { handleMakeMove } from "../handleInputOperations/HandleMakeMove.tsx";
import { handleMarkCell } from "../handleInputOperations/HandleMarkCell.tsx";
import { handleMarkCellHover } from "../handleInputOperations/HandleMarkCellHover.tsx";
import { handleErrorCellPushed } from "../handleInputOperations/HandleErrorCellPushed.tsx";
import { handleErrorCellHovered } from "../handleInputOperations/HandleErrorCellHovered.tsx";
import { handleMessage } from "../handleInputOperations/HandleMessage.tsx";
import { handleBoardUpdate } from "../handleInputOperations/HandleBoardUpdate.tsx";
import { handlePieceCaptured } from "../handleInputOperations/HandlePieceCaptured.tsx";
import { Piece } from "../../interfaces/Piece.tsx";
import { CellInterface } from "../../interfaces/Cell.tsx"

export function handleConnectToGame(
    socketRef: React.MutableRefObject<WebSocket | null>,
    setBoard: React.Dispatch<React.SetStateAction<Array<Array<Piece>>>>,
    setNumberOfPlayer: React.Dispatch<React.SetStateAction<number>>,
    setMarkedCell: React.Dispatch<React.SetStateAction<CellInterface | null>>,
    setMarkedCellHovered: React.Dispatch<React.SetStateAction<CellInterface | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<CellInterface>>>,
    setGraveyard: React.Dispatch<React.SetStateAction<Array<Piece>>>,
    disconnectFromGame: () => void,
    numberOfPlayer: number
) {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        console.log("Already connected to the game!");
        return;
    }

    const wsUrl = "ws://127.0.0.1:8000/player_connect_game";
    socketRef.current = new WebSocket(wsUrl);

    const connectionTimeout = setTimeout(() => {
        if (socketRef.current?.readyState !== WebSocket.OPEN) {
            console.log("Failed to connect: Server unreachable.");
            socketRef.current?.close();
            socketRef.current = null;
        }
    }, 5000);

    socketRef.current.onopen = () => {
        clearTimeout(connectionTimeout);
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
                    handleMakeMove(data, setBoard, setMarkedCell, setPossibleMoves);
                    break;

                case "board":
                    handleBoardUpdate(data, setBoard, setNumberOfPlayer);
                    break;

                case "piece_captured":
                    handlePieceCaptured(data, setGraveyard);
                    break;

                default:
                    console.log("Unknown message type:", data.type);
                    break;
            }
        } catch (error) {
            console.error("Error parsing WebSocket message:", error, event.data);
        }
    };

    socketRef.current.onclose = () => {
        clearTimeout(connectionTimeout);
        setBoard(Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" })));
        setMarkedCell(null);
        setPossibleMoves([]);
        console.log("connection closed!");
    };

    socketRef.current.onerror = () => {
        clearTimeout(connectionTimeout);
        console.log("Error: WebSocket connection failed.");
    };
}
