import React from "react";

interface SaveButtonProps {
  boardSetup: any[];
  userData: any;
}

const SaveButton: React.FC<SaveButtonProps> = ({ boardSetup, userData }) => {
  const handleSave = async () => {
    if (userData) {
      userData.board_setup = [...boardSetup];
    }

    console.log("Board setup saved");
    const token = sessionStorage.getItem("access_token");
    const url = `${process.env.REACT_APP_API_HTTP_URL}/setup/update_setup/${token}`;
    const data = {
      board_setup: boardSetup,
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
      } else {
        console.error('Failed to update setup:', response.statusText);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  };

  return <button onClick={handleSave} className="save-button">Save Changes</button>;
};

export default SaveButton;
