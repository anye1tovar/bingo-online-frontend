import React, { useState } from "react";

interface BingoCardProps {
  values: string[];
  cardSize: number;
}

const BingoCard: React.FC<BingoCardProps> = ({ values, cardSize }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectValue = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues((prevSelected) =>
        prevSelected.filter((selected) => selected !== value)
      );
    } else {
      setSelectedValues((prevSelected) => [...prevSelected, value]);
    }
  };

  const gridColsClass =
    cardSize === 3
      ? "grid-cols-3"
      : cardSize === 4
      ? "grid-cols-4"
      : cardSize === 5
      ? "grid-cols-5"
      : "";

  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">LOGIC BINGO</h2>
      <div className={`grid ${gridColsClass} gap-2 w-full`}>
        {values.map((value, index) => (
          <div
            key={index}
            onClick={() => handleSelectValue(value)}
            className={`flex items-center justify-center text-center w-full min-h-[60px] p-2 rounded-lg cursor-pointer 
              ${
                selectedValues.includes(value)
                  ? "bg-gold text-black"
                  : "bg-blue-600 text-gold"
              }
              ${cardSize === 5 ? "text-sm" : "text-base"}
            `}
          >
            <span className="break-words max-w-full leading-tight">
              {value}
            </span>{" "}
            {/* Permite el ajuste del texto en varias líneas */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingoCard;
