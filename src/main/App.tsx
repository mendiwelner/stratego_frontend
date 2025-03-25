import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from '../pages/game/Game.tsx';
import Login from '../pages/login/LogInPage.tsx';
import SignUpPage from '../pages/signup/SignUpPage.tsx';
import SetupPage from "../pages/setup/SetupPage.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/setup" element={<SetupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
