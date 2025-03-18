import { InputData } from "../../interfaces/InputData.tsx"

export function handleErrorCellPushed(
    data: InputData,
    setMarkedCell: React.Dispatch<React.SetStateAction<{ row: number; column: number } | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<{ row: number; column: number }>>>
) {
    console.log(data.message);
    setMarkedCell(null);
    setPossibleMoves([]);
}