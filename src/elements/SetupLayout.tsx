
import React from 'react';
import Board from '../elements/Board.tsx';
import { Piece } from "../interfaces/Piece.tsx";
import "../style/GameLayout.css";

interface SetupLayoutProps {
    board: Array<Array<Piece>>;
    gameData: any;
}

const SetupLayout: React.FC<SetupLayoutProps> = ({ board, gameData }) => {
    return (
        <div className="game-layout">
            <div className="player-names">
                <div className="opponent-name">{gameData.playersData.opponent_name}</div>
            </div>

            <Board
                board={board}
                markedCell={gameData.markedCell}
                markedCellHovered={gameData.markedCellHovered}
                possibleMoves={gameData.possibleMoves}
                socketRef={gameData.socketRef}
                numberOfPlayer={gameData.numberOfPlayer}
            />

            <div className="player-names">
                <div className="your-name">{gameData.playersData.your_name}</div>
            </div>

        </div>
    );
};

export default SetupLayout;
