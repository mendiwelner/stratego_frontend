import React, { useState } from 'react';
import './PlayerCircle.css';

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

    // אתחול מיקום העיגול
    const [position, setPosition] = useState({ top: 50, left: 50 }); // הגדר את המיקום ההתחלתי ל-50%

    // פונקציה לעדכון המיקום בעת לחיצה
    const handleCircleClick = () => {
        console.log("click");
        // עדכון המיקום על ידי הוספת 50px לכל כיוון (אתה יכול לשנות את זה איך שתרצה)
        setPosition(prevPosition => ({
            top: prevPosition.top - 100,
            left: prevPosition.left,
        }));
    };

    return (
        <div 
            className="player-circle" 
            onClick={handleCircleClick} 
            style={{
                backgroundColor,
                position: 'absolute', // מיקום מוחלט בתוך ה-cell
                top: `${position.top}%`, // ממקם את העיגול במרכז האנכי של ה-cell, תוצאת שינוי
                left: `${position.left}%`, // ממקם את העיגול במרכז האופקי של ה-cell, תוצאת שינוי
                transform: 'translate(-50%, -50%)', // מתקן את המיקום כך שהמרכז של העיגול יהיה במרכז ה-cell
                transition: 'top 0.4s ease, left 0.4s ease', // הנפשה חלקה לשינוי המיקום
                zIndex: 1, // הוספתי את ה-z-index, כך שהעיגול תמיד יישאר מעל ה-cell
            }}
        >
            {value && <span className="circle-text">{value}</span>}
        </div>
    );
};

export default PlayerCircle;
