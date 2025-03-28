import { Piece } from "../interfaces/Piece.tsx";

export interface UserData {
    user_name: string;
    user_rating: number;
    board_setup: Piece[][];
    token: string;
}