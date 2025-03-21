import React from 'react';
import '../style/Cell.css';
import PlayerCircle from './PlayerCircle.tsx';

interface CellProps {
    row: number;
    column: number;
    cell: { number_of_player: number; value: string };
    isForbidden: boolean;
    markedCell?: { row: number; column: number } | null;
    isMarked: boolean;
    isHoverMarked: boolean;
    isPossibleMove: boolean;
    socketRef: React.RefObject<WebSocket | null>;
}

const Cell: React.FC<CellProps> = ({ row, column, cell, isForbidden, markedCell, isMarked, isHoverMarked, isPossibleMove, socketRef }) => {
    const handleCellClick = () => {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            console.log('WebSocket is not connected.');
            return;
        }
        if (isForbidden) {
            console.log('This cell is forbidden!');
            return;
        }
        if (isPossibleMove && markedCell) {
            const move = {
                action: "make_move",
                move: {
                    from_cell: { row: markedCell.row, column: markedCell.column },
                    to_cell: { row: row, column: column }
                }
            };
            socketRef.current.send(JSON.stringify(move));
        } else {
            const checkMove = {
                action: "check_cell_move",
                cell: { row: row, column: column }
            };
            socketRef.current.send(JSON.stringify(checkMove));
        }
    };

    const handleHover = () => {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            return;
        }
        
        const checkHover = {
            action: "check_cell_hover",
            cell: { row: row, column: column }
        };
        socketRef.current.send(JSON.stringify(checkHover));
    };

    return (
        <div
            className={`cell 
                ${isForbidden ? 'forbidden' : ''} 
                ${isMarked ? 'marked' : ''} 
                ${isHoverMarked ? 'hover-marked' : ''} 
                ${isPossibleMove ? 'possible-move' : ''}`} 
            onClick={handleCellClick}
            onMouseEnter={handleHover}  
        >
            {cell.number_of_player ? (
                <PlayerCircle numberOfPlayer={cell.number_of_player} value={cell.value} />
            ) : (
                cell.value && <span>{cell.value}</span>
            )}
        </div>
    );
};

export default Cell;
