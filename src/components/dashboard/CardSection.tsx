import { useState } from "react";
import { useStore } from "../../store";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Card from "./Card";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

const CardSection = () => {
  const { cards } = useStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // For mobile, show only one card at a time
  const visibleCards = isMobile ? [cards[activeCardIndex]] : cards.slice(0, 2);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">My Cards</h2>
        <a
          href="#"
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          aria-label="See all cards"
        >
          See All
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </a>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        {visibleCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            className={isMobile ? "w-full" : "w-72"}
          />
        ))}
      </div>

      {isMobile && cards.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === activeCardIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              onClick={() => setActiveCardIndex(index)}
              aria-label={`View card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardSection;
