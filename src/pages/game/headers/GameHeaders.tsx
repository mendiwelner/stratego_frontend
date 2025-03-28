import React from 'react';
import "./GameHeaders.css";
import { UserData } from '../../../interfaces/UserData';

interface GameHeadersProps {
    userData: UserData;
}

const GameHeaders: React.FC<GameHeadersProps> = ({ userData }) => {
    return (
        <div className="game-headers">
            <div className="left-section"></div>
            <div className="center-section">
                <h1>Stratego Game</h1>
            </div>
            <div className="right-section">
                <div className="user-info">
                    <img 
                        src="/images/player_avatar.png" 
                        alt="User Avatar" 
                        className="user-avatar" 
                    />
                    <div className="user-details">
                        <h1 className="user-name">{userData?.user_name}</h1>
                        <h3 className="user-rating">{userData?.user_rating}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameHeaders;
