export interface BoardData {
    type: string;
    message?: string;
    board?: { number_of_player: number; value: string }[][];
    cell?: { row: number; col: number };
    possible_moves?: { row: number; col: number }[];
    move?: { from_cell: { row: number; col: number }; to_cell: { row: number; col: number } };
    piece?: { number_of_player: number; value: string }
}
