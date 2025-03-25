import React from 'react';
import PlayerCircle from "../board/cell/playerCircle/PlayerCircle.tsx"
import './Graveyard.css';
import { Piece } from "../../../../interfaces/Piece.tsx"; 

interface GraveyardProps {
    numberOfPlayer: number;
    graveyard: Piece[];
}

const Graveyard: React.FC<GraveyardProps> = ({ numberOfPlayer, graveyard }) => {
    function countPiecesByValueAndPlayer(
        graveyard: Piece[],
        index: number,
        numberOfPlayer: number,
        rotate: boolean
    ): number | string {
        if (rotate) {
            if (numberOfPlayer === 1) {
                numberOfPlayer = 2;
            } else if (numberOfPlayer === 2) {
                numberOfPlayer = 1;
            }
        }
        const value = String(index);
        if (numberOfPlayer === 0) {
            return '';
        }
        const amount = playerPiecesAmounts[index];
        return graveyard.filter(piece => piece.value === value && piece.number_of_player === numberOfPlayer).length + '/' + amount;
    }

    const playerPieces = [
        'b', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
    ];

    const playerPiecesAmounts = [
        6, 1, 8, 5, 4, 4, 4, 3, 2, 1, 1
    ];

    return (
        <div className="graveyard-container">
            <div className="graveyard">
                <div className="graveyard-title">
                    <h2>Graveyard</h2>
                </div>
                <div className="graveyard-items1">
                    {playerPieces.map((piece, index) => (
                        <div key={index} className="graveyard-item">
                            <PlayerCircle
                                color={numberOfPlayer === 0 ? 0 : 1}
                                value={piece}
                            />
                            <div className="piece-number">
                                {countPiecesByValueAndPlayer(graveyard, index, numberOfPlayer, false)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="graveyard-items2">
                    {playerPieces.map((piece, index) => (
                        <div key={index} className="graveyard-item2">
                            <PlayerCircle
                                color={numberOfPlayer === 0 ? 0 : 2}
                                value={piece}
                            />
                            <div className="piece-number">
                                {countPiecesByValueAndPlayer(graveyard, index, numberOfPlayer, true)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );


};

export default Graveyard;
