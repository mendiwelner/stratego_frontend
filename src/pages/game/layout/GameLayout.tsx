// GameLayout.tsx
import React from 'react';
import Board from "./board/Board.tsx"
import Graveyard from "./graveyard/Graveyard.tsx"
import { Piece } from "../../../interfaces/Piece.tsx";
import "./GameLayout.css";
import { GameData } from '../../../interfaces/GameData.tsx';

interface GameLayoutProps {
    board: Array<Array<Piece>>;
    gameData: GameData;
}

const GameLayout: React.FC<GameLayoutProps> = ({ board, gameData }) => {
    return (
        <div className="game-layout">
            <div className="player-names">
                <div className="opponent-name">{gameData.playersData.opponent_name}</div>
            </div>
            <div className="board-graveyard-container">
                <div className="game-left-section">
                    {gameData.isInGame && !gameData.isSearching && <Graveyard
                        numberOfPlayer={gameData.numberOfPlayer}
                        graveyard={gameData.graveyard}
                    />}
                </div>
                <div className="game-center-section">
                    <Board
                        board={board}
                        markedCell={gameData.markedCell}
                        markedCellHovered={gameData.markedCellHovered}
                        possibleMoves={gameData.possibleMoves}
                        socketRef={gameData.socketRef}
                        numberOfPlayer={gameData.numberOfPlayer}
                    />
                </div>
                <div className="game-right-section"></div> 
            </div>
            <div className="player-names">
                <div className="your-name">{gameData.playersData.your_name}</div>
            </div>
        </div>
    );
};


export default GameLayout;
