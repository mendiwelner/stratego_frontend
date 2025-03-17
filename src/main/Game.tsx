import React from "react";
import { useGameSocket } from './GameSocket.tsx';
import Board from '../elements/Board.tsx'; 
import '../style/Game.css';
import ConnectButton from './buttons/ConnectButton';
import DisconnectButton from './buttons/DisconnectButton';
import UpdateBoardButton from './buttons/UpdateBoardButton';

export default function Game() {
    const { board, markedCell, possibleMoves, connectToGame, disconnectFromGame, updateBoardManually, socketRef } = useGameSocket(); 

    return (
        <div className="game-container">
            <h1>Stratego Game</h1>
            <ConnectButton connectToGame={connectToGame} />
            <DisconnectButton disconnectFromGame={disconnectFromGame} />
            <Board board={board} markedCell={markedCell} possibleMoves={possibleMoves} socketRef={socketRef} />
        </div>
    );
}
