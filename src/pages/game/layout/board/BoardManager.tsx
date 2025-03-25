class BoardManager {
    private board: Array<Array<{ number_of_player: number; value: string }>>;

    constructor() {
        this.board = Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" }));
    }

    setBoard(newBoard: Array<Array<{ number_of_player: number; value: string }>>) {
        this.board = newBoard;
    }

    getBoard() {
        return this.board;
    }
}
