import React from "react";
import "../style/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from './Game.tsx';
import Login from './LogInPage.tsx';
import SignUpPage from './SignUpPage.tsx';
import SetupPage from "./SetupPage.tsx";

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
