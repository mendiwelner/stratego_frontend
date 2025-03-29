import React, { useState } from "react";

interface SaveButtonProps {
  boardSetup: any[];
  userData: any;
}

const SaveButton: React.FC<SaveButtonProps> = ({ boardSetup, userData }) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (userData) {
      userData.board_setup = [...boardSetup];
    }

    console.log("Board setup saved");
    const token = sessionStorage.getItem("access_token");
    const url = `${process.env.REACT_APP_API_HTTP_URL}/setup/update_setup/${token}`;
    const data = { board_setup: boardSetup };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("✅ Setup updated successfully!");
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage("❌ Failed to update setup.");
      }
    } catch (error) {
      console.error('Error during request:', error);
      setMessage("❌ Error updating setup.");
    }
  };

  return (
    <>
      <button onClick={handleSave} className="save-button">Save Changes</button>
      {message && <div className="message-box">{message}</div>}
    </>
  );
};

export default SaveButton;
