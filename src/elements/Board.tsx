import React from 'react';
import '../style/Board.css';
import  Cell from "./Cell.tsx"
import { CellInterface } from '../interfaces/Cell.tsx';
import { Piece } from '../interfaces/Piece.tsx';

interface BoardProps {
  board: Piece[][];
  markedCell?: CellInterface | null;
  markedCellHovered?: CellInterface | null;
  possibleMoves?: CellInterface[] | null;
  socketRef: React.RefObject<WebSocket | null>;
}

const Board: React.FC<BoardProps> = ({ board, markedCell, markedCellHovered, possibleMoves = [], socketRef }) => {

  const forbiddenCells = [
    { row: 4, column: 2 }, { row: 4, column: 3 },
    { row: 5, column: 2 }, { row: 5, column: 3 },
    { row: 4, column: 6 }, { row: 4, column: 7 },
    { row: 5, column: 6 }, { row: 5, column: 7 }
  ];

  const isCellForbidden = (row: number, column: number): boolean => {
    return forbiddenCells.some(cell => cell.row === row && cell.column === column);
  };

  const isPossibleMove = (row: number, column: number): boolean => {
    if (!possibleMoves) return false; 
    return possibleMoves.some(move => move.row === row && move.column === column);
  };

  return (
    <div className="board-container">
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              column={colIndex}
              cell={cell}
              isForbidden={isCellForbidden(rowIndex, colIndex)}
              isMarked={markedCell?.row === rowIndex && markedCell?.column === colIndex}
              isHoverMarked={markedCellHovered?.row === rowIndex && markedCellHovered?.column === colIndex}
              isPossibleMove={isPossibleMove(rowIndex, colIndex)}
              markedCell={markedCell}
              socketRef={socketRef}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
