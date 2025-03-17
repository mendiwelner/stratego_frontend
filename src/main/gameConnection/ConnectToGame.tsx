import { BoardData } from "../interfaces/BoardData.tsx";
import { handleMakeMove } from "../handleInputOperations/HandleMakeMove.tsx";
import { handleMarkCell } from "../handleInputOperations/HandleMarkCell.tsx";
import { handleErrorCellPushed } from "../handleInputOperations/HandleErrorCellPushed.tsx";
import { handleMessage } from "../handleInputOperations/HandleMessage.tsx";
import { handleBoardUpdate } from "../handleInputOperations/HandleBoardUpdate.tsx";

export function handleConnectToGame(
    socketRef: React.MutableRefObject<WebSocket | null>,
    setBoard: React.Dispatch<React.SetStateAction<Array<Array<{ number_of_player: number; value: string }>>>>,
    setMarkedCell: React.Dispatch<React.SetStateAction<{ row: number; column: number } | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<{ row: number; column: number }>>>,
    disconnectFromGame: () => void
) {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        console.log("Already connected to the game!");
        return;
    }

    const wsUrl = "ws://e276-2a00-a041-f129-eb00-6d3e-9aa3-ad55-2d66.ngrok-free.app/player_connect_game";
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
            const data: BoardData | null = JSON.parse(event.data);
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

                case "mark_cell":
                    handleMarkCell(data, setMarkedCell, setPossibleMoves);
                    break;

                case "make_move":
                    handleMakeMove(data, setBoard, setMarkedCell, setPossibleMoves);
                    break;

                case "board":
                    handleBoardUpdate(data, setBoard);
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
        console.log("Disconnected from game.");
        socketRef.current = null;
    };

    socketRef.current.onerror = () => {
        clearTimeout(connectionTimeout);
        console.log("Error: WebSocket connection failed.");
    };
}
