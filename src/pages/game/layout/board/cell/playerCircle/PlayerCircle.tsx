import React, { useEffect, useState } from 'react';
import './PlayerCircle.css';
import { useGame } from '../../../../GameContext.tsx';
import { CellInterface } from '../../../../../../interfaces/Cell.tsx';

interface PlayerCircleProps {
    color: number;
    value: string;
    row: number;
    column: number;
}

const PlayerCircle: React.FC<PlayerCircleProps> = React.memo(({ color, value, row, column }) => {
    const { lastMove } = useGame();
    const [position, setPosition] = useState({ top: 50, left: 50 });

    const moveCircle = (from_cell: CellInterface, to_cell: CellInterface, attacker_position: CellInterface | null, move_type: string) => {
        let deltaRow = to_cell.row - from_cell.row;
        let deltaCol = from_cell.column - to_cell.column;
        if (attacker_position) {
            deltaRow = attacker_position.row - from_cell.row;
            deltaCol = from_cell.column - attacker_position.column;
        }
        if (move_type === "move" || attacker_position) {
            setPosition(prevPosition => ({
                top: prevPosition.top + deltaRow * 100,
                left: prevPosition.left + deltaCol * 100,
            }));
        }
        else {
            setPosition(prevPosition => ({
                top: prevPosition.top + deltaRow * 20,
                left: prevPosition.left + deltaCol * 20,
            }));
        }
    };

    useEffect(() => {
        if (lastMove && lastMove.move.from_cell.row === row && lastMove.move.from_cell.column === column) {
            moveCircle(
                lastMove.move.from_cell,
                lastMove.move.to_cell,
                lastMove.move.attacker_position,
                lastMove.move.move_type
            );
        }
    }, [lastMove]);

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
        <div className="player-circle"
            style={row === -1 ? { backgroundColor } : {
                backgroundColor,
                position: 'absolute',
                top: `${position.top}%`,
                left: `${position.left}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'top 0.4s ease, left 0.4s ease',
                zIndex: 1,
            }}>
            {value && <span className="circle-text">{value}</span>}
        </div>
    );
});

export default PlayerCircle;
