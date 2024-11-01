import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/game.page";
import PlayerGame from "./pages/player-game.page";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/game/:gameId" element={<PlayerGame />} />
      </Routes>
    </Router>
  );
};

export default App;
