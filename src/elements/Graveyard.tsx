import React from "react";
import '../style/Graveyard.css';

interface GraveyardProps {
    pieces: { player: number; value: string }[];
}

const Graveyard: React.FC<GraveyardProps> = ({ pieces }) => {
    return (
        <div className="graveyard">
            <h2>Graveyard</h2>
            <div className="graveyard-pieces">
                {pieces.length > 0 ? (
                    pieces.map((piece, index) => (
                        <div key={index} className={`piece player-${piece.player}`}>
                            {piece.value}
                        </div>
                    ))
                ) : (
                    <p>No captured pieces yet</p>
                )}
            </div>
        </div>
    );
};

export default Graveyard;
