import { useSelector } from "react-redux";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Card from "./Card";
import { Link } from "react-router";
import { RootState } from "../../store";

const CardSection = () => {
  const cards = useSelector((state: RootState) => state.store.cards);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="px-2 md:px-4 lg:px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">My Cards</h2>
        <Link
          to={"/credit-cards"}
          className="text-sm text-primary-text font-semibold hover:text-[14.5px] hover:text-primary-black transition-all duration-300  flex items-center md:mr-4"
          aria-label="See all cards"
        >
          See All
        </Link>
      </div>

      <div className="relative">
        <div className="flex space-x-[20px] overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`snap-start flex-shrink-0 ${
                isMobile ? "w-[85%] min-w-[256px]" : "w-[48.5%]"
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
