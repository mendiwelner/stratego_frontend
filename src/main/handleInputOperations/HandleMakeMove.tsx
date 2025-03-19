import { InputData } from "../../interfaces/InputData.tsx"
import { Piece } from "../../interfaces/Piece.tsx"
import { CellInterface } from "../../interfaces/Cell.tsx"

export function handleMakeMove(
    data: InputData,
    setBoard: React.Dispatch<React.SetStateAction<Array<Array<Piece>>>>,
    setMarkedCell: React.Dispatch<React.SetStateAction<CellInterface | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<CellInterface>>>
) {
    if (data.move) {
        const { from_cell, to_cell, in_from_cell, in_to_cell, in_from_cell_show, in_to_cell_show, move_type, attacker_position } = data.move;

        if (move_type === "attack") {
            setBoard(prevBoard =>
                prevBoard.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        if (attacker_position && rowIndex === attacker_position.row && colIndex === attacker_position.column) {
                            return in_from_cell_show && typeof in_from_cell_show === "object"
                                ? in_from_cell_show
                                : { number_of_player: 0, value: "" };
                        }
                        if (attacker_position && rowIndex === from_cell?.row && colIndex === from_cell.column) {
                            return typeof in_from_cell === "object"
                                ? in_from_cell
                                : { number_of_player: 0, value: "" };
                        }
                        if (rowIndex === to_cell?.row && colIndex === to_cell.column) {
                            return in_to_cell_show && typeof in_to_cell_show === "object"
                                ? in_to_cell_show
                                : { number_of_player: 0, value: "" };
                        }
                        return cell;
                    })
                )
            );

            setTimeout(() => {
                setBoard(prevBoard =>
                    prevBoard.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                            if (attacker_position && rowIndex === attacker_position.row && colIndex === attacker_position.column) {
                                return typeof in_from_cell === "object"
                                    ? in_from_cell
                                    : { number_of_player: 0, value: "" };
                            }
                            if (!attacker_position && rowIndex === from_cell?.row && colIndex === from_cell.column) {
                                return typeof in_from_cell === "object"
                                    ? in_from_cell
                                    : { number_of_player: 0, value: "" };
                            }
                            if (rowIndex === to_cell?.row && colIndex === to_cell.column) {
                                return typeof in_to_cell === "object"
                                    ? in_to_cell
                                    : { number_of_player: 0, value: "" };
                            }
                            return cell;
                        })
                    )
                );
            }, 1000);
        } else {
            setBoard(prevBoard =>
                prevBoard.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        if (rowIndex === from_cell?.row && colIndex === from_cell.column) {
                            return typeof in_from_cell === "object" && attacker_position
                                ? in_from_cell
                                : { number_of_player: 0, value: "" };
                        }
                        if (rowIndex === to_cell?.row && colIndex === to_cell.column) {
                            return typeof in_to_cell === "object"
                                ? in_to_cell
                                : { number_of_player: 0, value: "" };
                        }
                        return cell;
                    })
                )
            );
        }

        setMarkedCell(null);
        setPossibleMoves([]);
    }
}
