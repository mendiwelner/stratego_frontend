import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackToGameButtonProps {
  data: any;
}

const BackToGameButton: React.FC<BackToGameButtonProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleBackToGame = () => {
    navigate("/game", { state: { data } });
  };

  return (
    <button onClick={handleBackToGame} className="back-button">
      Back to Game
    </button>
  );
};

export default BackToGameButton;
