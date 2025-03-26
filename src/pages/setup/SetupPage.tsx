import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SetupLayout from "./setupLayout/SetupLayout.tsx";
import RandomSetupButton from "./buttons/randomSetup/RandomSetupButton.tsx";
import FlipSetupButton from "./buttons/flipSetup/FlipSetupButton.tsx";
import SaveButton from "./buttons/save/SaveButton.tsx";
import BackToGameButton from "./buttons/backToGame/BackToGameButton.tsx";
import "./SetupPage.css";

export default function SetupPage() {
    const location = useLocation();

    const userData = location.state?.userData;
    const initialBoardSetup = location.state?.userData.board_setup || [];
    const [boardSetup, setBoardSetup] = useState(initialBoardSetup);
    const [data, setData] = useState(userData);

    useEffect(() => {
        if (userData) {
            setData(userData);
        }
    }, [userData]);

    return (
        <div className="game-container">
            <div className="button-group">
                <BackToGameButton data={data} />
                <SaveButton boardSetup={boardSetup} userData={userData} />
            </div>
            <div className="button-group second-row">
                <FlipSetupButton setBoardSetup={setBoardSetup} />
                <RandomSetupButton setBoardSetup={setBoardSetup} />
            </div>
            <SetupLayout boardSetup={boardSetup} setBoardSetup={setBoardSetup} />
        </div>
    );
}
