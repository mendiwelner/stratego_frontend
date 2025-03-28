import { CellInterface } from "./Cell.tsx"
import { Piece } from "./Piece.tsx"

export interface Move {
    move_type: string;
    from_cell: CellInterface;
    to_cell: CellInterface;
    in_from_cell?: Piece | string;
    in_to_cell?: Piece | string;
    in_from_cell_show?: Piece | null;
    in_to_cell_show?: Piece | null;
    attacker_position: CellInterface | null;
};