import React from 'react';
import './SetupCell.css';
import PlayerCircle from "../../../../game/layout/board/cell/playerCircle/PlayerCircle.tsx";

interface SetupCellProps {
  row: number;
  column: number;
  cell: { number_of_player: number; value: string };
  onCellClick: (row: number, column: number) => void;
  isSelected: boolean;
  isForbidden: boolean;
}

const SetupCell: React.FC<SetupCellProps> = ({ row, column, cell, onCellClick, isSelected, isForbidden }) => {
  return (
    <div
      className={`SetupCell ${cell.value ? "hoverable" : ""} 
      ${isSelected && cell.value ? "selected" : ""}
      ${isForbidden ? 'forbidden' : ''}`}
      onClick={() => onCellClick(row, column)}
    >
      {cell.number_of_player ? (
        <PlayerCircle
          color={3}
          value={cell.value}
          row={-1}
          column={-1}
          isMarked={false} />
      ) : (
        cell.value && <span>{cell.value}</span>
      )}
    </div>
  );
};

export default SetupCell;
