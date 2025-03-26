import { InputData } from "../../../interfaces/InputData.tsx"
import { Piece } from "../../../interfaces/Piece.tsx"
import { CellInterface } from "../../../interfaces/Cell.tsx"

export function handleMakeMove(
    data: InputData,
    setBoard: React.Dispatch<React.SetStateAction<Array<Array<Piece>>>>,
    setMarkedCell: React.Dispatch<React.SetStateAction<CellInterface | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<CellInterface>>>
) {
    if (!data.move) return;
    const { from_cell, to_cell, in_from_cell, in_to_cell, in_from_cell_show, in_to_cell_show, move_type, attacker_position } = data.move;
    const updateBoard = (updates: { row: number; col: number; value: Piece }[]) => {
        setBoard(prevBoard =>
            prevBoard.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    const update = updates.find(u => u.row === rowIndex && u.col === colIndex);
                    return update ? update.value : cell;
                })
            )
        );
    };
    const initialUpdates = [
        attacker_position && move_type === "attack" && {
            row: attacker_position.row,
            col: attacker_position.column,
            value: in_from_cell_show || { number_of_player: 0, value: "" }
        },
        from_cell && {
            row: from_cell.row,
            col: from_cell.column,
            value: in_from_cell || { number_of_player: 0, value: "" }
        },
        to_cell && {
            row: to_cell.row,
            col: to_cell.column,
            value: in_to_cell_show || { number_of_player: 0, value: "" }
        }
    ].filter(Boolean) as { row: number; col: number; value: Piece }[];

    updateBoard(initialUpdates);
    if (move_type === "attack") {
        setTimeout(() => {
            const attackUpdates = [
                attacker_position && {
                    row: attacker_position.row,
                    col: attacker_position.column,
                    value: in_from_cell || { number_of_player: 0, value: "" }
                },
                to_cell && {
                    row: to_cell.row,
                    col: to_cell.column,
                    value: in_to_cell || { number_of_player: 0, value: "" }
                }
            ].filter(Boolean) as { row: number; col: number; value: Piece }[];

            updateBoard(attackUpdates);
        }, 1000);
    }
    setMarkedCell(null);
    setPossibleMoves([]);
}
