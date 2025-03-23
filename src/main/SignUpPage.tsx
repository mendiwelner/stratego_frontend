import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!username || !password) {
      setError("נא להזין שם משתמש וסיסמה.");
      return;
    }
  
    setError("");
    setSuccessMessage("");
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HTTP_URL}/users/?name=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        sessionStorage.setItem("access_token", data.access_token);
        
        setSuccessMessage("הרשמה בוצעה בהצלחה!");
        setTimeout(() => {
          navigate("/game");
        }, 1500);
      } else {
        console.error("Error response:", data);
        setError(data.message || "אירעה שגיאה במהלך הרישום.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      setError("אירעה שגיאה, אנא נסה מאוחר יותר.");
    }
  };  


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 shadow-lg p-6">
        <h2 className="text-center text-xl mb-4">הירשם עכשיו</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="שם משתמש"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            הירשם
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
