export function handleMakeMove(
    data: {
        move?: {
            move_type?: string;
            from_cell: { row: number; column: number };
            to_cell: { row: number; column: number };
            in_from_cell?: { number_of_player: number; value: string } | string;
            in_to_cell?: { number_of_player: number; value: string } | string;
            in_from_cell_show?: { number_of_player: number; value: string } | null;
            in_to_cell_show?: { number_of_player: number; value: string } | null;
        };
    },
    setBoard: React.Dispatch<React.SetStateAction<Array<Array<{ number_of_player: number; value: string }>>>>,
    setMarkedCell: React.Dispatch<React.SetStateAction<{ row: number; column: number } | null>>,
    setPossibleMoves: React.Dispatch<React.SetStateAction<Array<{ row: number; column: number }>>>
) {
    if (data.move) {
        console.log("Processing move:", data);
        const { from_cell, to_cell, in_from_cell, in_to_cell, in_from_cell_show, in_to_cell_show, move_type } = data.move;

        if (move_type === "attack") {
            setBoard(prevBoard =>
                prevBoard.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        if (rowIndex === from_cell.row && colIndex === from_cell.column) {
                            return in_from_cell_show && typeof in_from_cell_show === "object"
                                ? in_from_cell_show
                                : { number_of_player: 0, value: "" }; 
                        }
                        if (rowIndex === to_cell.row && colIndex === to_cell.column) {
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
                            if (rowIndex === from_cell.row && colIndex === from_cell.column) {
                                return typeof in_from_cell === "object"
                                    ? in_from_cell
                                    : { number_of_player: 0, value: "" }; 
                            }
                            if (rowIndex === to_cell.row && colIndex === to_cell.column) {
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
                        if (rowIndex === from_cell.row && colIndex === from_cell.column) {
                            return typeof in_from_cell === "object"
                                ? in_from_cell
                                : { number_of_player: 0, value: "" };
                        }
                        if (rowIndex === to_cell.row && colIndex === to_cell.column) {
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
