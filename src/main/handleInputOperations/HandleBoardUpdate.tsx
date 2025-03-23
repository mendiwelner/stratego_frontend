import { InputData } from "../../interfaces/InputData.tsx"
import { Piece } from "../../interfaces/Piece.tsx";
import { PlayersData } from "../../interfaces/PlayersData.tsx";

export function handleBoardUpdate(
    data: InputData,
    setBoard: React.Dispatch<React.SetStateAction<Array<Array<Piece>>>>,
    setPlayersData: React.Dispatch<PlayersData>,
    setNumberOfPlayer: React.Dispatch<React.SetStateAction<number>>,
) {
    if (data.board) {
        setBoard(data.board);
    }
    if (data.players_data) {
        setPlayersData({
            your_name: data.players_data.your_name,
            opponent_name: data.players_data.opponent_name
        });
    }
    if (data.number_of_player) {
        setNumberOfPlayer(data.number_of_player); 
    }if (data.number_of_player) {
        setNumberOfPlayer(data.number_of_player); 
    }
}
