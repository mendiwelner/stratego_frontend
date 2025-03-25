import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./SetupButton.css";  

interface SetupButtonProps {
    logout: () => void;
}

const SetupButton: React.FC<SetupButtonProps> = ({ logout }) => {
    const navigate = useNavigate();

    const handleSetUp = () => {
        navigate('/setup');
    };

    return (
        <button onClick={handleSetUp}>setup</button>
    );
};

export default SetupButton;



