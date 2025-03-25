// GameLayout.tsx
import React from 'react';
import Board from '../elements/Board.tsx';
import Graveyard from '../elements/Graveyard.tsx';
import { Piece } from "../interfaces/Piece.tsx";
import "../style/GameLayout.css";

interface GameLayoutProps {
    board: Array<Array<Piece>>;
    gameData: any;
}

const GameLayout: React.FC<GameLayoutProps> = ({ board, gameData }) => {
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

            <Graveyard numberOfPlayer={gameData.numberOfPlayer} graveyard={gameData.graveyard} />
        </div>
    );
};

export default GameLayout;
