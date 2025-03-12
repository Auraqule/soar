import { useStore } from "../../store";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Card from "./Card";

const CardSection = () => {
  const { cards } = useStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="px-2 md:px-6 py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">My Cards</h2>
        <a
          href="#"
          className="text-sm text-primary-text font-semibold hover:text-blue-800 flex items-center"
          aria-label="See all cards"
        >
          See All
        </a>
      </div>

      {/* Card Container */}
      <div className="relative">
        <div className="flex space-x-[20px] overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`snap-start flex-shrink-0 ${
                isMobile ? "w-[85%]" : "w-[48.5%]"
              }`}
            >
              <Card card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSection;
