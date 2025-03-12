import { CardType } from "../../types";
import { assets } from "../../constants";
import { useMemo } from "react";

interface CardProps {
  card: CardType;
  className?: string;
}

const Card = ({ card, className = "" }: CardProps) => {
  const isDark = useMemo(() => {
    return card.id % 2 === 1;
  }, [card]);

  return (
    <div
      className={`rounded-3xl text-white ${
        isDark
          ? "bg-gradient-to-r from-[#5B5A6F] to-[#000000] border-0"
          : "bg-white text-black border-[1px] border-[#DFEAF2]"
      } ${className}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs text-gray-400">Balance</p>
            <p
              className={`text-xl font-semibold ${
                isDark ? "text-white" : "text-primary-text"
              }`}
            >
              ${card.balance.toLocaleString()}
            </p>
          </div>
          <img
            src={isDark ? assets.cardChip : assets.cardChipDark}
            alt="card chip"
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between w-[75%]">
            <div>
              <p className="text-xs text-gray-400">CARD HOLDER</p>
              <p
                className={`text-sm ${
                  isDark ? "text-white" : "text-primary-text"
                }`}
              >
                {card.cardHolder}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">VALID THRU</p>
              <p
                className={`text-sm ${
                  isDark ? "text-white" : "text-primary-text"
                }`}
              >
                {card.validThru}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        {isDark && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-white to-white/0 opacity-15" />
        )}

        <div
          className={`flex justify-between items-center mt-4 pl-4 pr-10 py-4 ${
            isDark ? "border-0" : "border-t-[#DFEAF2] border-t-[1px]"
          }`}
        >
          <div>
            <p
              className={`text-sm ${
                isDark ? "text-white" : "text-primary-text"
              }`}
            >
              {card.cardNumber}
            </p>
          </div>

          <div className="h-8 w-8">
            <div className="relative">
              <div
                className={`absolute h-[30px] w-[30px] ${
                  isDark ? "bg-[#FFFFFF]" : "bg-[#9199AF]"
                }  rounded-full opacity-50 -right-4`}
              />
              <div
                className={`absolute h-[30px] w-[30px] ${
                  isDark ? "bg-[#FFFFFF]" : "bg-[#9199AF]"
                } rounded-full opacity-50`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
