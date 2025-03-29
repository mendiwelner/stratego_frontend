import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LogoutButton.css";  

interface LogoutButtonProps {
    isInGame: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ isInGame }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (isInGame) {
            const confirmLeave = window.confirm("You have to leave the game first!");
        } else {
            navigate('/');
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
