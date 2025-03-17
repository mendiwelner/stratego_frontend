import React from 'react';
import '../style/PlayerCircle.css';

interface PlayerCircleProps {
    numberOfPlayer: number;
    value: string;
}

const PlayerCircle: React.FC<PlayerCircleProps> = ({ numberOfPlayer, value }) => {
    return (
        <div
            className="player-circle"
            style={{ backgroundColor: numberOfPlayer === 1 ? 'blue' : 'red' }}
        >
            {value && <span className="circle-text">{value}</span>}
        </div>
    );
};

export default PlayerCircle;
