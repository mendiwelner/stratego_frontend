export function handleErrorCellHovered(
    data: { type?: string, message?: string },
    setMarkedCellHovered: React.Dispatch<React.SetStateAction<{ row: number; column: number } | null>>,
) {
    console.log(data.message);
    setMarkedCellHovered(null);
}