import React from 'react';
import './Cell.css';
import PlayerCircle from "./playerCircle/PlayerCircle.tsx"

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
    numberOfPlayer: number;
}

const Cell: React.FC<CellProps> = ({ row, column, cell, isForbidden, markedCell, isMarked, isHoverMarked, isPossibleMove, socketRef, numberOfPlayer }) => {
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

    const chooseColor = (cellPlayerNumber: number, PlayerNumber: number) => {
        if (PlayerNumber === 0) {
            return 3;
        } else if (PlayerNumber === cellPlayerNumber) {
            return 1;
        } else {
            return 2;
        }
    }

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
                <PlayerCircle color={chooseColor(cell.number_of_player, numberOfPlayer)} value={cell.value} row={row} column={column} isMarked={isHoverMarked || isMarked}/>
            ) : (
                cell.value && <span>{cell.value}</span>
            )}
        </div>
    );
};

export default Cell;
