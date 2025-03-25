// GameHeaders.tsx
import React from 'react';
import "./GameHeaders.css";

interface GameHeadersProps {
    userName: string;
}

const GameHeaders: React.FC<GameHeadersProps> = ({ userName }) => {
    return (
        <div className="game-headers">
            <div className="left-section">
            </div>
            <div className="center-section">
                <h1>Stratego Game</h1>
            </div>
            <div className="right-section">
                <h1>{userName}</h1>
            </div>
        </div>
    );
};

export default GameHeaders;
