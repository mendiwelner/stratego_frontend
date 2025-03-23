import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button.tsx";
import { Input } from "./Input.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "./Card.tsx";
import { Link } from "react-router-dom"; // יבוא של Link

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("נא להזין שם משתמש וסיסמה.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }).toString(),
      });

      if (!response.ok) {
        throw new Error("שם משתמש או סיסמה שגויים.");
      }

      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("access_token", data.access_token);
      setError("");
      navigate("/game");
    } catch (err: any) {
      setError(err.message || "שגיאה בהתחברות.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Stratego - התחברות</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="שם משתמש"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">התחבר</Button>
          </form>
          <div className="text-center mt-4">
            <Link to="/signup" className="text-blue-500 hover:underline">הירשם כאן אם אין לך חשבון</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
