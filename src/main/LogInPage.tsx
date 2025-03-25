import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button.tsx";
import { Input } from "./Input.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "./Card.tsx";
import { Link } from "react-router-dom"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("please enter user name and password");
      return;
    }
    const url = `${process.env.REACT_APP_API_HTTP_URL}/users/login`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }).toString(),
      });

      if (!response.ok) {
        throw new Error("invalid user name or password");
      }

      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("access_token", data.token.access_token);
      setError("");
      navigate("/game", { state: { data } });
    } catch (err: any) {
      setError(err.message || "log in error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Stratego - log in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">log in</Button>
          </form>
          <div className="text-center mt-4">
            <Link to="/signup" className="text-blue-500 hover:underline">new user? sign in here</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
