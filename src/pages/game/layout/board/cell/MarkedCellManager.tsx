class MarkedCellManager {
    private markedCell: { row: number; col: number } | null = null;

    setMarkedCell(cell: { row: number; col: number } | null) {
        this.markedCell = cell;
    }

    getMarkedCell() {
        return this.markedCell;
    }

    clearMarkedCell() {
        this.markedCell = null;
    }
}
