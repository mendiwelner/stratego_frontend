import React from "react";
import { useGameSocket } from './GameSocket.tsx';
import Board from '../elements/Board.tsx';
import '../style/Game.css';
import ConnectButton from './buttons/ConnectButton';
import DisconnectButton from './buttons/DisconnectButton';
import Graveyard from '../elements/Graveyard.tsx';

export default function Game() {
    const { board, numberOfPlayer, graveyard, markedCell, markedCellHovered,possibleMoves, connectToGame, disconnectFromGame, socketRef } = useGameSocket();
    return (
        <div className="game-container">
            <h1>Stratego Game</h1>
            <div className="game-controls">
                <ConnectButton connectToGame={connectToGame} />
                <DisconnectButton disconnectFromGame={disconnectFromGame} />
            </div>
            <div className="game-layout">
                <Board
                    board={board}
                    markedCell={markedCell}
                    markedCellHovered={markedCellHovered}
                    possibleMoves={possibleMoves}
                    socketRef={socketRef}
                />
                <Graveyard numberOfPlayer={numberOfPlayer} graveyard={graveyard}/>
            </div>
        </div>
    );
}
