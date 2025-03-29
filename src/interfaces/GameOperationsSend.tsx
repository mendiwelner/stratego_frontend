import { MakeMoveData } from "./MakeMoveData";
import { Piece } from "./Piece";

export interface GameOperationsSend {
    setBoard: React.Dispatch<React.SetStateAction<Array<Array<Piece>>>>;
    makeMove: (data: MakeMoveData) => void;
    setLastMove: (data: MakeMoveData) => void;
    handleGameOver: (result: string, reason: string, rating_change: number) => void;
}