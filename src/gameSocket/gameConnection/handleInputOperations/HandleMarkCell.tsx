import { CellInterface } from "../../../interfaces/Cell.tsx"

export function handleMarkCell(
    data: { cell?: CellInterface; possible_moves?: CellInterface[] },
    setMarkedCell: React.Dispatch<React.SetStateAction<CellInterface | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<CellInterface>>>
) {
    if (data.cell) {
        setMarkedCell((prevMarkedCell) => {
            if (prevMarkedCell && prevMarkedCell.row === data.cell!.row && prevMarkedCell.column === data.cell!.column) {
                setPossibleMoves([]);
                return null;
            }
            setPossibleMoves(data.possible_moves ?? []);
            return { row: data.cell!.row, column: data.cell!.column };
        });
    }
}
