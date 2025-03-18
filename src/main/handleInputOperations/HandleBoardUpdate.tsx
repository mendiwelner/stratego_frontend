import { InputData } from "../../interfaces/InputData.tsx"

export function handleBoardUpdate(data: InputData, setBoard: React.Dispatch<React.SetStateAction<Array<Array<{ number_of_player: number; value: string }>>>>) {
    if (data.board) {
        setBoard(data.board);
    }
}
