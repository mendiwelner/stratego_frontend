import { CellInterface } from "../../../interfaces/Cell.tsx"

export function handleErrorCellHovered(
    setMarkedCellHovered: React.Dispatch<React.SetStateAction<CellInterface | null>>,
) {
    setMarkedCellHovered(null);
}