import React, { createContext, useContext, useState, useEffect } from "react";

interface GameContextType {
    lastMove: any;
    setLastMove: (move: any) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lastMove, setLastMove] = useState<any>(null);

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
