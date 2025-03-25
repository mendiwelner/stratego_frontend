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
      setError("please enter user name and password");
      return;
    }
  
    setError("");
    setSuccessMessage("");
    const url = `${process.env.REACT_APP_API_HTTP_URL}/users/?name=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    console.log(url);
    try {
      const response = await fetch(
        url,
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
        sessionStorage.setItem("access_token", data.token.access_token);
        console.log(data);
        setSuccessMessage("Registration was successful!");
        setTimeout(() => {
          navigate("/game", { state: { data } });
        }, 1500);
      } else {
        console.error("Error response:", data);
        if (data.detail === "Address already exists!") {
          setError("user name already exists, please choose an another name");
        } else if (data.detail === "Invalid password format") {
          setError("Invalid password format!");
        } else {
          setError(data.message || "log in error!");
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
      setError("log in error, please try again later!");
    }
  };  


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 shadow-lg p-6">
        <h2 className="text-center text-xl mb-4">sign in now</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="user name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
