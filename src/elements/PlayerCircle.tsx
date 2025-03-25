import React from 'react';
import '../style/PlayerCircle.css';

interface PlayerCircleProps {
    color: number;
    value: string;
}

const PlayerCircle: React.FC<PlayerCircleProps> = ({ color, value }) => {
    let backgroundColor;

    if (color === 0) {
        backgroundColor = '#D27C28'; 
    } else if (color === 1) {
        backgroundColor = 'blue';   
    } else if (color === 2) {
        backgroundColor = 'red';  
    } else if (color === 3) {
        backgroundColor = 'green';  
    }

    return (
        <div className="player-circle" style={{ backgroundColor }}>
            {value && <span className="circle-text">{value}</span>}
        </div>
    );
};

export default PlayerCircle;
