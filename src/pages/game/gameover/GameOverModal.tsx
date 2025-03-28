import React from "react";
import "./GameOverModal.css";
import { GameData } from "../../../interfaces/GameData";

interface GameOverModalProps {
    setShowGameOver: React.Dispatch<React.SetStateAction<{ show: boolean, result: string | null, reason: string | null, rating_change: number | null }>>;
    showGameOver: { show: boolean, result: string | null, reason: string | null, rating_change: number | null };
    gameData: GameData;  
}


const GameOverModal: React.FC<GameOverModalProps> = ({ setShowGameOver, showGameOver, gameData }) => {
    const handleClick = () => {
        setShowGameOver({ show: false, result: null, reason: null, rating_change: null });
        gameData.disconnectFromGame();
    };
    function resultMessage() {
        if (showGameOver.result === "winner") {
            if (showGameOver.reason === "leaving") {
                return "🎉 you won because the opponent leave the game 🎉";
            } else if (showGameOver.reason === "flag_occupied") {
                return "🎉 you won because you occupied the opponent flag 🎉";
            } else if (showGameOver.reason === "no_moved_pieces") {
                return "🎉 you won because the opponent has no moved pieces 🎉";
            }
        } else if (showGameOver.result === "loser") {
            if (showGameOver.reason === "flag_occupied") {
                return "you lost because the opponent  occupied your flag";
            } else if (showGameOver.reason === "no_moved_pieces") {
                return "you lost because you have no moved pieces";
            }
        } else if (showGameOver.result === "draw") {
            if (showGameOver.reason === "no_moved_pieces") {
                return "it's a draw because you both have no moved pieces";
            } else if (showGameOver.reason === "server_disconnected") {
                return "it's a draw because the server is disconnected";
            }
        }
    }
    function ratingMessage() {
        return "your rating changed in " + showGameOver.rating_change + " points"
    }
    
    return (
        <div className="game-over-overlay">
            <div className="game-over-modal">
                <h2>{resultMessage()}</h2>
                <h2>{ratingMessage()}</h2>
                <button onClick={() => handleClick()}>close</button>
            </div>
        </div>
    );
};

export default GameOverModal;
