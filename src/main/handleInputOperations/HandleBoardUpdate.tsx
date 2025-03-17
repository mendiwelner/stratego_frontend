import { BoardData } from "../interfaces/BoardData.tsx"


export function handleBoardUpdate(data: BoardData, setBoard: React.Dispatch<React.SetStateAction<Array<Array<{ number_of_player: number; value: string }>>>>) {
    if (data.board) {
        setBoard(data.board);
    }
}
