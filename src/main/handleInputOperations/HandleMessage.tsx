import { BoardData } from "../interfaces/BoardData.tsx"


export function handleMessage(data: BoardData, disconnectFromGame: () => void, socketRef: React.MutableRefObject<WebSocket | null>) {
    if (data.message) {
        console.log(data.message);
        if (data.message === "you are disconnected" && socketRef.current) {
            disconnectFromGame();
        }
    }
}