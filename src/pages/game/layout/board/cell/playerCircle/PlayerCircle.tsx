import React, { useEffect, useState } from 'react';
import './PlayerCircle.css';
import { useGame } from '../../../../GameContext.tsx';
import { CellInterface } from '../../../../../../interfaces/Cell.tsx';

interface PlayerCircleProps {
    color: number;
    value: string;
    row: number;
    column: number;
    isHoverMarked: boolean;
}

const PlayerCircle: React.FC<PlayerCircleProps> = React.memo(({ color, value, row, column, isHoverMarked }) => {
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
        } else {
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

    const imageDictionary: { [key: string]: string } = {
        'b': '/images/stratego-bomb.svg',
        'f': '/images/stratego-flag.svg',
        '1': '/images/stratego-spy.svg',
        '2': '/images/stratego-scout.svg',
        '3': '/images/stratego-miner.svg',
        '4': '/images/stratego-sergeant.svg',
        '5': '/images/stratego-lieutenant.svg',
        '6': '/images/stratego-captain.svg',
        '7': '/images/stratego-major.svg',
        '8': '/images/stratego-colonel.svg',
        '9': '/images/stratego-general.svg',
        '10': '/images/stratego-marshal.svg'
    };

    const imageSrc = imageDictionary[value];

    const backgroundColor = color === 0 ? 'var(--color-0)' :
                            color === 1 ? 'var(--color-1)' :
                            color === 2 ? 'var(--color-2)' : 'var(--color-3)';

    const scaleValue = isHoverMarked ? 1.08 : 1; // הגדלה ב-30% כאשר יש hover

    return (
        <div className="player-circle"
            style={row === -1 ? { backgroundColor } : {
                backgroundColor,
                position: 'absolute',
                top: `${position.top}%`,
                left: `${position.left}%`,
                transform: `translate(-50%, -50%) scale(${scaleValue})`, // כל הערכים באותו transform
                transition: 'top 0.4s ease, left 0.4s ease, transform 0.3s ease',
                zIndex: 1,
                width: `${38 * scaleValue}px`,  // הגדלת גודל העיגול
                height: `${38 * scaleValue}px`, // הגדלת גובה העיגול
            }}>
            <div className="circle-content"
                style={{
                    transition: 'transform 0.3s ease',
                    transform: `scale(${scaleValue})`, // הגדלת התמונה והמספר
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {imageSrc ? (
                    <img src={imageSrc} alt="player" className="circle-image" />
                ) : null}
                <span className="circle-text">{value}</span>
            </div>
        </div>
    );
    
});

export default PlayerCircle;
