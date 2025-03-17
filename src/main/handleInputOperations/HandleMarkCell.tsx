export function handleMarkCell(
    data: { cell?: { row: number; column: number }; possible_moves?: { row: number; column: number }[] },
    setMarkedCell: React.Dispatch<React.SetStateAction<{ row: number; column: number } | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<{ row: number; column: number }>>>
) {
    if (data.cell) {
        console.log(`Marking cell at row ${data.cell.row}, column ${data.cell.column}`);
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
