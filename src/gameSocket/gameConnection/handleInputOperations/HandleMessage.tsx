import { InputData } from "../../../interfaces/InputData.tsx"


export function handleMessage(data: InputData, disconnectFromGame: () => void, socketRef: React.MutableRefObject<WebSocket | null>) {
    if (data.message) {
        console.log(data.message);
        if (data.message === "you are disconnected" && socketRef.current) {
            disconnectFromGame();
        }
    }
}