import React from 'react';
import '../style/PlayerCircle.css';

interface PlayerCircleProps {
    numberOfPlayer: number;
    value: string;
}

const PlayerCircle: React.FC<PlayerCircleProps> = ({ numberOfPlayer, value }) => {
    let backgroundColor;

    if (numberOfPlayer === 0) {
        backgroundColor = '#D27C28'; 
    } else if (numberOfPlayer === 1) {
        backgroundColor = 'blue';   
    } else if (numberOfPlayer === 2) {
        backgroundColor = 'red';   
    }

    return (
        <div className="player-circle" style={{ backgroundColor }}>
            {value && <span className="circle-text">{value}</span>}
        </div>
    );
};

export default PlayerCircle;
