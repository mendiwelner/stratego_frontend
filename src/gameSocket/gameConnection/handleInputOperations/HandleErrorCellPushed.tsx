import { InputData } from "../../../interfaces/InputData.tsx"
import { CellInterface } from "../../../interfaces/Cell.tsx"

export function handleErrorCellPushed(
    data: InputData,
    setMarkedCell: React.Dispatch<React.SetStateAction<CellInterface | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<CellInterface>>>
) {
    setMarkedCell(null);
    setPossibleMoves([]);
}