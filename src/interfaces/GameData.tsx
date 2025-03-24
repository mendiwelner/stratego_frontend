import { Piece } from "../interfaces/Piece.tsx";
import { CellInterface } from "../interfaces/Cell.tsx";
import { PlayersData } from "../interfaces/PlayersData.tsx";

export interface GameData {
    board: Array<Array<Piece>>;
    markedCell: CellInterface | null;
    markedCellHovered: CellInterface | null;
    possibleMoves: Array<CellInterface>;
    graveyard: Piece[];
    numberOfPlayer: number;
    socketRef: React.RefObject<WebSocket | null>;
    playersData: PlayersData;
    isSearching: boolean;
    connectToGame: () => void;
    disconnectFromGame: () => void;
    logout: () => void;
}