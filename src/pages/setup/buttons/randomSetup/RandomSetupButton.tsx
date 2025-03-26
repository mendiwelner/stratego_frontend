import React from 'react';

interface RandomSetupButtonProps {
  setBoardSetup: React.Dispatch<React.SetStateAction<any[]>>;
}

const RandomSetupButton: React.FC<RandomSetupButtonProps> = ({ setBoardSetup }) => {
  
  // פונקציה שמבצעת את הסידור האקראי
  const fetchSetup = async () => {
    const url = `${process.env.REACT_APP_API_HTTP_URL}/setup/get_setup/`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.board_setup)) {
          setBoardSetup(data.board_setup);  
        } else {
          console.error('Invalid data format. Expected board_setup to be an array.');
        }
      } else {
        console.error('Failed to fetch setup:', response.statusText);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  };

  return (
    <button onClick={fetchSetup} className="random-setup-button">
      Random Setup
    </button>
  );
};

export default RandomSetupButton;
