import React, { useState, useEffect, useRef } from 'react';
import './SetupBoard.css';
import SetupCell from "./SetupCell/SetupCell.tsx";
import { Piece } from "../../../../interfaces/Piece.tsx";

interface SetupBoardProps {
  boardSetup: Piece[][]; // לוח המשחק
  setBoardSetup: React.Dispatch<React.SetStateAction<Piece[][]>>; // פונקציה לעדכון הלוח
}

const SetupBoard: React.FC<SetupBoardProps> = ({ boardSetup, setBoardSetup }) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; column: number } | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const forbiddenCells = [
    { row: 4, column: 2 }, { row: 4, column: 3 },
    { row: 5, column: 2 }, { row: 5, column: 3 },
    { row: 4, column: 6 }, { row: 4, column: 7 },
    { row: 5, column: 6 }, { row: 5, column: 7 }
  ];

  const isCellForbidden = (row: number, column: number): boolean => {
    return forbiddenCells.some(cell => cell.row === row && cell.column === column);
  };

  const handleCellClick = (row: number, column: number) => {
    if (!boardSetup[row][column].value) {
      setSelectedCell(null);
      return;
    }
    if (!selectedCell) {
      setSelectedCell({ row, column });
    } else {
      swapCells(selectedCell, { row, column });
      setSelectedCell(null);
    }
  };

  const swapCells = (cell1: { row: number; column: number }, cell2: { row: number; column: number }) => {
    setBoardSetup(prevBoard => {
      const newBoard = prevBoard.map(row => [...row]); // יצירת העתק של הלוח
      const temp = newBoard[cell1.row][cell1.column];
      newBoard[cell1.row][cell1.column] = newBoard[cell2.row][cell2.column];
      newBoard[cell2.row][cell2.column] = temp;
      return newBoard;
    });
  };

  // Add event listener to detect click outside the board
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boardRef.current && !boardRef.current.contains(event.target as Node)) {
        setSelectedCell(null); // Reset selected cell if click is outside the board
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="board-container" ref={boardRef}>
      <div className="board">
        {boardSetup.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <SetupCell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              column={colIndex}
              cell={cell}
              onCellClick={handleCellClick}
              isSelected={selectedCell?.row === rowIndex && selectedCell?.column === colIndex}
              isForbidden={isCellForbidden(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SetupBoard;
