import React, { useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

const apiUrl = import.meta.env.VITE_API_URL;

interface HostControlsProps {
  onStartGame: (values: string[]) => void;
}

const HostControls: React.FC<HostControlsProps> = ({ onStartGame }) => {
  const [gameLink, setGameLink] = useState<string | null>(null);
  const [mode, setMode] = useState<string>("numbers");
  const [numberRange, setNumberRange] = useState<{ min: number; max: number }>({
    min: 1,
    max: 75,
  });
  const [wordList, setWordList] = useState<string>("");
  const [cardSize, setCardSize] = useState<number>(5); // Tamaño de la tarjeta (por defecto 5x5)

  const handleCreateGame = async () => {
    let values: string[] = [];

    if (mode === "numbers") {
      const { min, max } = numberRange;
      values = Array.from({ length: max - min + 1 }, (_, i) =>
        (min + i).toString()
      );
    } else if (mode === "words") {
      values = wordList
        .trim()
        .split("\n")
        .map((word) => word.trim())
        .filter((word) => word);
    }

    if (values.length < cardSize * cardSize) {
      alert(
        `Please provide enough values to fill a ${cardSize}x${cardSize} Bingo card (at least ${
          cardSize * cardSize
        } values).`
      );
      return;
    }

    try {
      // Enviamos los valores y el tamaño de tarjeta al backend
      const response = await axios.post(`${apiUrl}create-game`, {
        values,
        cardSize,
      });
      setGameLink(`${window.location.origin}/game/${response.data.gameId}`);

      // Iniciamos el juego en el frontend
      onStartGame(values);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <label>
        Modo de juego
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="ml-2 p-1 border border-gold rounded"
        >
          <option value="numbers">Numbers</option>
          <option value="words">Words</option>
        </select>
      </label>

      {mode === "numbers" && (
        <div className="flex flex-col space-y-2">
          <label>
            Número mínimo:
            <input
              type="number"
              value={numberRange.min}
              onChange={(e) =>
                setNumberRange({
                  ...numberRange,
                  min: parseInt(e.target.value),
                })
              }
              className="ml-2 p-1 border border-gold rounded w-20"
              min={1}
              max={100}
            />
          </label>
          <label>
            Número máximo:
            <input
              type="number"
              value={numberRange.max}
              onChange={(e) =>
                setNumberRange({
                  ...numberRange,
                  max: parseInt(e.target.value),
                })
              }
              className="ml-2 p-1 border border-gold rounded w-20"
              min={numberRange.min + 1}
              max={100}
            />
          </label>
        </div>
      )}

      {mode === "words" && (
        <div>
          <label>
            Lista de palabras (una por linea)
            <textarea
              rows={5}
              value={wordList}
              onChange={(e) => setWordList(e.target.value)}
              className="mt-2 p-2 border border-gold rounded w-full"
              placeholder="Enter each word on a new line"
            />
          </label>
        </div>
      )}

      {/* Dropdown para seleccionar el tamaño de la tarjeta */}
      <label>
        Tamaño del cartón:
        <select
          value={cardSize}
          onChange={(e) => setCardSize(parseInt(e.target.value))}
          className="ml-2 p-1 border border-gold rounded"
        >
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
        </select>
      </label>

      <button
        onClick={handleCreateGame}
        className="bg-gold text-black font-semibold py-2 rounded-lg"
      >
        Crear Juego
      </button>

      {gameLink && (
        <div>
          <p>Comparte este link con los jugadores:</p>
          <a href={gameLink} target="_blank" rel="noopener noreferrer">
            {gameLink}
          </a>

          {/* Generar y mostrar el código QR debajo del enlace */}
          <div className="flex justify-center mt-4">
            <QRCodeSVG
              value={gameLink}
              size={150}
              bgColor="#000000"
              fgColor="#ffffff"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HostControls;
