import React from "react";
import "./GameOverModal.css";
import { GameData } from "../../../interfaces/GameData";

interface GameOverModalProps {
    setShowGameOver: any;
    showGameOver: any;
    gameData: GameData;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ setShowGameOver, showGameOver, gameData }) => {
    const handleClick = () => {
        setShowGameOver({ show: false, result: null, reason: null });
        gameData.disconnectFromGame();
    };
    function message1() {
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
            }
        }
    }
    
    return (
        <div className="game-over-overlay">
            <div className="game-over-modal">
                <h2>{message1()}</h2>
                <button onClick={() => handleClick()}>close</button>
            </div>
        </div>
    );
};

export default GameOverModal;
