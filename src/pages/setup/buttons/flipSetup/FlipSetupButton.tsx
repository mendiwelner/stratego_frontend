import React from 'react';

interface FlipSetupButtonProps {
  setBoardSetup: React.Dispatch<React.SetStateAction<any[]>>;
}

const FlipSetupButton: React.FC<FlipSetupButtonProps> = ({ setBoardSetup }) => {
  
  // פונקציה להיפוך הסטאפ
  const handleFlipSetup = () => {
    setBoardSetup((prevSetup) => prevSetup.map((row: any[]) => [...row].reverse()));
  };

  return (
    <button onClick={handleFlipSetup} className="flip-button">
      Flip Setup (Right to Left)
    </button>
  );
};

export default FlipSetupButton;
