import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
    logout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); 
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
