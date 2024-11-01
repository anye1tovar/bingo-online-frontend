import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BingoCard from "../components/bingo-card.component";

const apiUrl = import.meta.env.VITE_API_URL;

const PlayerGame: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [card, setCard] = useState<string[][]>([]);
  const [cardSize, setCardSize] = useState<number>(5); // Tamaño por defecto es 5x5

  useEffect(() => {
    const joinGame = async () => {
      try {
        const response = await axios.get(`${apiUrl}join-game/${gameId}`);
        setCard(response.data.card);
        setCardSize(response.data.cardSize); // Obtenemos el tamaño de la tarjeta
      } catch (error) {
        console.error("Error joining game:", error);
      }
    };

    joinGame();
  }, [gameId]);

  // Configurar el mensaje de advertencia al intentar recargar la página
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      {card.length > 0 && cardSize >= 3 ? (
        <BingoCard values={card.flat()} cardSize={cardSize} />
      ) : (
        <p>Loading your Bingo card...</p>
      )}
    </div>
  );
};

export default PlayerGame;
