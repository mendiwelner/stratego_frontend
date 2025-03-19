import React from 'react';
import PlayerCircle from './PlayerCircle';
import '../style/Graveyard.css';
import { Piece } from "../interfaces/Piece.tsx";

interface GraveyardProps {
    numberOfPlayer: number;
    graveyard: Piece[];
}

const Graveyard: React.FC<GraveyardProps> = ({ numberOfPlayer, graveyard }) => {
    function countPiecesByValueAndPlayer(
        graveyard: Piece[],
        value: string,
        numberOfPlayer: number
    ): number {
        return graveyard.filter(piece => piece.value === value && piece.number_of_player === numberOfPlayer).length;
    }

    const playerPieces = [
        'b', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
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
                                numberOfPlayer={numberOfPlayer}
                                value={piece}
                            />
                            <div className="piece-number">
                                {numberOfPlayer === 0 ? '' : countPiecesByValueAndPlayer(graveyard, String(index), numberOfPlayer)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="graveyard-items2">
                    {playerPieces.map((piece, index) => (
                        <div key={index} className="graveyard-item2">
                            <PlayerCircle
                                numberOfPlayer={numberOfPlayer === 0 ? 0 : numberOfPlayer === 1 ? 2 : 1}
                                value={piece}
                            />
                            <div className="piece-number">
                                {numberOfPlayer === 0 ? '' : countPiecesByValueAndPlayer(graveyard, String(index), numberOfPlayer === 1 ? 2 : 1)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );


};

export default Graveyard;
