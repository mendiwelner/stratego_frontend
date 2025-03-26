import { CellInterface } from "./Cell.tsx";
import { Move } from "./Move.tsx";
import { Piece } from "./Piece.tsx";

export interface InputData {
    type: string;
    message?: string;
    board?: Piece[][];
    cell?: CellInterface;
    possible_moves?: CellInterface[];
    move?: Move;
    piece?: { number_of_player: number; value: string };
    inputMove: Move;
    number_of_player: number;
    players_data: { your_name: string, opponent_name: string };
    result: string;
}