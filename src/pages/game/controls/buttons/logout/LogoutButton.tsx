import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LogoutButton.css";  

interface LogoutButtonProps {
    isInGame: boolean;
    userName: string;
}

const handleLogOutRequest = async () => {
    const token = sessionStorage.getItem("access_token");
    const url = `${process.env.REACT_APP_API_HTTP_URL}/users/log_out/${token}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log("✅ Logged out successfully!");
        } else {
            console.log("❌ Failed to log out.");
        }
    } catch (error) {
        console.error('Error during logout request:', error);
        console.log("❌ Error logging out.");
    }
};


const LogoutButton: React.FC<LogoutButtonProps> = ({ isInGame, userName }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (isInGame) {
            const confirmLeave = window.confirm("You have to leave the game first!");
        } else {
            handleLogOutRequest();
            navigate('/');
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
