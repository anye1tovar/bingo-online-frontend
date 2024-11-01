import React, { useState } from "react";
import { shuffleArray } from "../utils/generateBingoCard";
import HostControls from "../components/host-controls.component";

const Game: React.FC = () => {
  const [gameValues, setGameValues] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleStartGame = (values: string[]) => {
    const shuffledValues = shuffleArray(values); // Mezclamos los valores para mostrarlos en orden aleatorio
    setGameValues(shuffledValues);
    setCurrentIndex(0);
    setCurrentValue(shuffledValues[0]);
    setHistory([shuffledValues[0]]);
  };

  // Avanza al siguiente valor en el orden aleatorio
  const handleNextValue = () => {
    if (currentIndex < gameValues.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentValue(gameValues[nextIndex]);
      setHistory((prevHistory) => [...prevHistory, gameValues[nextIndex]]);
    } else {
      alert("No more values left in the game!");
    }
  };

  return (
    <div className="p-8 text-center min-h-screen flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-2 text-gold">LOGIC ESCAPE ROOM</h1>
      <h2 className="text-3xl font-semibold mb-8 text-blue">
        BINGO DE INAUGURACIÓN
      </h2>

      {/* Controles para el host para configurar el juego */}
      <HostControls onStartGame={handleStartGame} />

      {/* Visualización del valor actual generado */}
      <div className="my-8 text-center">
        <h2 className="text-2xl font-bold">Valor actual</h2>
        <div className="text-4xl mt-4 p-4 bg-blue text-white border border-gold rounded-lg">
          {currentValue || "Crea el juego para comenzar"}
        </div>
        <button
          onClick={handleNextValue}
          className="mt-4 bg-gold text-black font-semibold py-2 px-4 rounded-lg"
        >
          Siguiente valor
        </button>
      </div>

      {/* Historial de valores generados */}
      <div className="my-8">
        <h3 className="text-xl font-bold text-center">Historial de valores</h3>
        <ul className="mt-4 space-y-2">
          {history.map((value, index) => (
            <li
              key={index}
              className="text-lg text-center bg-gray-200 p-2 rounded text-gray-500"
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
