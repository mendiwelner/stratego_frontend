import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";  // יש לכלול את useLocation
import { useGameSocket } from "../../../gameSocket/GameSocket.tsx";
import { Piece } from "../../../interfaces/Piece.tsx";
import { UserData } from "../../../interfaces/UserData.tsx";
import { MakeMoveData } from "../../../interfaces/MakeMoveData.tsx";
import { useGame } from "../GameContext";

export function useGameOperations(initialUserData: UserData) {
    const [userData, setUserData] = useState<UserData>(initialUserData);
    const [board, setBoard] = useState<Array<Array<Piece>>>(Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" })));
    const { setLastMove } = useGame();
    const [showGameOver, setShowGameOver] = useState<{ show: boolean, result: string | null, reason: string | null, rating_change: number | null }>({
        show: false,
        result: null,
        reason: null,
        rating_change: null
    });
    const prevShowGameOverRef = useRef(showGameOver);
    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state as { data: UserData }; 

    useEffect(() => {
        prevShowGameOverRef.current = showGameOver;
    }, [showGameOver]);

    const makeMove = (data: MakeMoveData) => setLastMove(data);

    const handleGameOver = (result: string, reason: string, rating_change: number) => {
        if (!prevShowGameOverRef.current.show) {
            const updatedUserData = { user_rating: (userData.user_rating || 0) + rating_change };
            updateUserData(updatedUserData);
            navigate(location.pathname, { state: { ...locationState, data: { ...userData, ...updatedUserData } } });
            setShowGameOver({ show: true, result, reason, rating_change });
        }
    };

    const gameOperationsSend = {
        setBoard,
        makeMove,
        setLastMove,
        handleGameOver,
        setUserData,
    };

    const gameData = useGameSocket(userData, gameOperationsSend);

    useEffect(() => {
        if (userData?.board_setup) {
            setBoard(userData.board_setup);
        }
    }, [userData]);

    const updateUserData = (newData: Partial<UserData>) => {
        setUserData(prev => ({ ...prev, ...newData }));
    };

    return {
        board,
        showGameOver,
        setShowGameOver,
        gameData,
        userData
    };
}
