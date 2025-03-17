// UpdateBoardButton.tsx
import React from "react";

interface UpdateBoardButtonProps {
    updateBoardManually: () => void;
}

const UpdateBoardButton: React.FC<UpdateBoardButtonProps> = ({ updateBoardManually }) => {
    return <button onClick={updateBoardManually}>Update Board Manually</button>;
};

export default UpdateBoardButton;
