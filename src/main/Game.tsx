import React from "react";
import { useGameSocket } from './GameSocket.tsx';
import Board from '../elements/Board.tsx';
import '../style/Game.css';
import ConnectButton from './buttons/ConnectButton';
import DisconnectButton from './buttons/DisconnectButton';
import Graveyard from '../elements/Graveyard.tsx';

export default function Game() {
    const { board, numberOfPlayer, graveyard, markedCell, markedCellHovered, possibleMoves, connectToGame, disconnectFromGame, socketRef, playersData } = useGameSocket();

    return (
        <div className="game-container">
            <h1>Stratego Game</h1>
            <div className="game-controls">
                <ConnectButton connectToGame={connectToGame} />
                <DisconnectButton disconnectFromGame={disconnectFromGame} />
            </div>
            <div className="game-layout">
                <div className="player-names">
                    <div className="opponent-name">{playersData.opponent_name}</div>
                </div>

                <Board
                    board={board}
                    markedCell={markedCell}
                    markedCellHovered={markedCellHovered}
                    possibleMoves={possibleMoves}
                    socketRef={socketRef}
                />

                <div className="player-names">
                    <div className="your-name">{playersData.your_name}</div>
                </div>

                <Graveyard numberOfPlayer={numberOfPlayer} graveyard={graveyard}/>
            </div>
        </div>
    );
}
