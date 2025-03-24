import React from "react";
import { useGameSocket } from './GameSocket.tsx';
import Board from '../elements/Board.tsx';
import '../style/Game.css';
import ConnectButton from './buttons/ConnectButton';
import DisconnectButton from './buttons/DisconnectButton';
import Graveyard from '../elements/Graveyard.tsx';
import SearchingIndicator from "../elements/SearchingIndicator.tsx";
import LogoutButton from "./buttons/LogoutButton.tsx";
import { useLocation } from "react-router-dom";

export default function Game() {
    const location = useLocation();
    const username = location.state?.username;
    const gameData = useGameSocket();

    return (
        <div className="game-container">
            <div className="game-headers">
                <div className="left-section">
                </div>
                <div className="center-section">
                    <h1>Stratego Game</h1>
                </div>
                <div className="right-section">
                    <h1>{username}</h1>
                </div>
            </div>
            <div className="game-controls">
                <div className="left-section">
                </div>
                <div className="center-section">
                    <ConnectButton connectToGame={gameData.connectToGame} />
                    <DisconnectButton disconnectFromGame={gameData.disconnectFromGame} />
                </div>
                <div className="right-section">
                    <LogoutButton logout={gameData.logout}/>
                </div>
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
