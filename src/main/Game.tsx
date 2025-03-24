import React from "react";
import { useGameSocket } from './GameSocket.tsx';
import Board from '../elements/Board.tsx';
import '../style/Game.css';
import ConnectButton from './buttons/ConnectButton';
import DisconnectButton from './buttons/DisconnectButton';
import Graveyard from '../elements/Graveyard.tsx';
import SearchingIndicator from "../elements/SearchingIndicator.tsx";
import LogoutButton from "./buttons/LogoutButton.tsx";

export default function Game() {
    const gameData = useGameSocket(); 

    return (
        <div className="game-container">
            <h1>Stratego Game</h1>
            <div className="game-controls">
                <LogoutButton logout={gameData.logout} />
                <ConnectButton connectToGame={gameData.connectToGame} />
                <DisconnectButton disconnectFromGame={gameData.disconnectFromGame} />
            </div>
            {gameData.isSearching && <SearchingIndicator />}
            <div className="game-layout">
                <div className="player-names">
                    <div className="opponent-name">{gameData.playersData.opponent_name}</div>
                </div>

                <Board
                    board={gameData.board}
                    markedCell={gameData.markedCell}
                    markedCellHovered={gameData.markedCellHovered}
                    possibleMoves={gameData.possibleMoves}
                    socketRef={gameData.socketRef}
                />

                <div className="player-names">
                    <div className="your-name">{gameData.playersData.your_name}</div>
                </div>

                <Graveyard numberOfPlayer={gameData.numberOfPlayer} graveyard={gameData.graveyard} />
            </div>
        </div>
    );
}
