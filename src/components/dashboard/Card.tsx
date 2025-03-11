import { CreditCardIcon } from "@heroicons/react/24/outline";
import { CardType } from "../../types";

interface CardProps {
  card: CardType;
  className?: string;
}

const Card = ({ card, className = "" }: CardProps) => {
  return (
    <div className={`bg-gray-900 rounded-lg p-4 text-white ${className}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs text-gray-400">Balance</p>
          <p className="text-xl font-semibold">
            ${card.balance.toLocaleString()}
          </p>
        </div>
        <CreditCardIcon className="h-6 w-6" />
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-400">CARD HOLDER</p>
        <p className="text-sm">{card.cardHolder}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm">{card.cardNumber}</p>
        <div>
          <p className="text-xs text-gray-400">VALID THRU</p>
          <p className="text-sm">{card.validThru}</p>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="h-8 w-8">
          {card.network === "mastercard" ? (
            <div className="flex">
              <div className="h-5 w-5 bg-red-500 rounded-full opacity-80 -mr-2"></div>
              <div className="h-5 w-5 bg-yellow-500 rounded-full opacity-80"></div>
            </div>
          ) : (
            <div className="h-5 w-8 bg-blue-500 rounded-sm opacity-80"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
