import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./SetupButton.css";  

interface SetupButtonProps {
    userData: any;
}

const SetupButton: React.FC<SetupButtonProps> = ({ userData }) => {
    const navigate = useNavigate();
    const handleSetUp = () => {
        navigate("/setup", { state: { userData } });
    };

    return (
        <button onClick={handleSetUp}>setup</button>
    );
};

export default SetupButton;



