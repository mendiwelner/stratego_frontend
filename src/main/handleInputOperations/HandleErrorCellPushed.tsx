export function handleErrorCellPushed(
    data: { type?: string, message?: string },
    setMarkedCell: React.Dispatch<React.SetStateAction<{ row: number; column: number } | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<{ row: number; column: number }>>>
) {
    console.log(data.message);
    setMarkedCell(null);
    setPossibleMoves([]);
}