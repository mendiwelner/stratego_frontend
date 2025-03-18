export function handleErrorCellHovered(
    setMarkedCellHovered: React.Dispatch<React.SetStateAction<{ row: number; column: number } | null>>,
) {
    setMarkedCellHovered(null);
}