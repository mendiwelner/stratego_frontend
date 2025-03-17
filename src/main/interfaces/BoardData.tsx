export interface BoardData {
    type: string;
    message?: string;
    board?: { number_of_player: number; value: string }[][];
    cell?: { row: number; column: number };
    possible_moves?: { row: number; column: number }[];
    move?: { from_cell: { row: number; column: number }; to_cell: { row: number; column: number } };
}