import { InputData } from "../../interfaces/InputData.tsx"
import { Piece } from "../../interfaces/Piece.tsx";

export function handleBoardUpdate(
    data: InputData, 
    setBoard: React.Dispatch<React.SetStateAction<Array<Array<Piece>>>>, 
    setNumberOfPlayer: React.Dispatch<React.SetStateAction<number>>,
) {
    if (data.board) {
        setBoard(data.board);
    }
    if (data.number_of_player) {
        setNumberOfPlayer(data.number_of_player); 
    }
}
