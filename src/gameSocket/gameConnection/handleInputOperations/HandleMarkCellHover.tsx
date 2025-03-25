import { InputData } from "../../../interfaces/InputData.tsx"
import { CellInterface } from "../../../interfaces/Cell.tsx"

export function handleMarkCellHover(
    data: InputData,
    setMarkedCellHover: React.Dispatch<React.SetStateAction<CellInterface | null>>,
    ) {
    if (data.cell) {
        setMarkedCellHover((prevMarkedCell) => {
            if (prevMarkedCell && prevMarkedCell.row === data.cell!.row && prevMarkedCell.column === data.cell!.column) {
                return null;
            }
            return { row: data.cell!.row, column: data.cell!.column };
        });
    }
}
