import React, { createContext, useContext, useState } from "react";
import { MakeMoveData } from "../../interfaces/MakeMoveData";

interface GameContextType {
    lastMove: MakeMoveData | null;
    setLastMove: (move: MakeMoveData) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lastMove, setLastMove] = useState<MakeMoveData | null>(null);

    const contextValue = React.useMemo(() => ({ lastMove, setLastMove }), [lastMove]);

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};


export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
};
