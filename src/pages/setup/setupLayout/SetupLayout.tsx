import React from 'react';
import SetupBoard from './SetupBoard/SetupBoard.tsx';
import { Piece } from "../../../interfaces/Piece.tsx";

// הגדרת סוג המאפיינים כראוי
interface SetupLayoutProps {
  boardSetup: Piece[][]; // לוח משחק כ-matrix של חתיכות
  setBoardSetup: React.Dispatch<React.SetStateAction<Piece[][]>>; // פונקציה לעדכון הלוח
}

const SetupLayout: React.FC<SetupLayoutProps> = ({ boardSetup, setBoardSetup }) => {
  return (
    <div className="game-layout">
      <SetupBoard boardSetup={boardSetup} setBoardSetup={setBoardSetup} />
    </div>
  );
};

export default SetupLayout;
