export function handleMakeMove(
    data: {
        move?: {
            from_cell: { row: number; column: number };
            to_cell: { row: number; column: number };
            in_from_cell?: { number_of_player: number; value: string } | string;
            in_to_cell?: { number_of_player: number; value: string } | string;
        };
    },    
    setBoard: React.Dispatch<React.SetStateAction<Array<Array<{ number_of_player: number; value: string }>>>>,
    setMarkedCell: React.Dispatch<React.SetStateAction<{ row: number; column: number } | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<{ row: number; column: number }>>>
) {
    if (data.move) {
        console.log("Processing move:", data.move);
        const { from_cell, to_cell, in_from_cell, in_to_cell } = data.move;

        setBoard(prevBoard => {
            const newBoard = prevBoard.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    if (rowIndex === from_cell.row && colIndex === from_cell.column) {
                        // אם in_from_cell הוא אובייקט, השתמש בו, אחרת החזר ברירת מחדל
                        return typeof in_from_cell === "object"
                            ? in_from_cell
                            : { number_of_player: 0, value: "" }; // ברירת מחדל במקרה של מחרוזת
                    }
                    if (rowIndex === to_cell.row && colIndex === to_cell.column) {
                        // אם in_to_cell הוא אובייקט, השתמש בו, אחרת החזר ברירת מחדל
                        return typeof in_to_cell === "object"
                            ? in_to_cell
                            : { number_of_player: 0, value: "" }; // ברירת מחדל במקרה של מחרוזת
                    }
                    return cell;
                })
            );

            return newBoard;
        });

        setMarkedCell(null);
        setPossibleMoves([]);
    }
}
