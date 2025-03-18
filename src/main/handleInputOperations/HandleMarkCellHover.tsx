export function handleMarkCellHover(
    data: { cell?: { row: number; column: number }; possible_moves?: { row: number; column: number }[] },
    setMarkedCellHover: React.Dispatch<React.SetStateAction<{ row: number; column: number } | null>>,
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
