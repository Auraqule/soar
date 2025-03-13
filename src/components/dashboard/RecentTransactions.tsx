import { CreditCardIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react";
import { assets } from "../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const RecentTransactions = () => {
  const transactions = useSelector(
    (state: RootState) => state.store.transactions
  );

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return (
          <div className="h-14 w-14 rounded-full bg-[#FFF5D9] flex items-center justify-center">
            <img src={assets.deposit} alt="deposit" />
          </div>
        );
      case "payment":
        return (
          <div className="h-14 w-14 rounded-full bg-[#E7EDFF] flex items-center justify-center">
            <Icon
              icon="iconoir:paypal"
              width="24"
              height="24"
              color="#396AFF"
            />
          </div>
        );
      case "transfer":
        return (
          <div className="h-14 w-14 rounded-full bg-[#DCFAF8] flex items-center justify-center">
            <img src={assets.dollar} alt="currency" />
          </div>
        );
      default:
        return (
          <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
            <CreditCardIcon className="h-5 w-5 text-gray-600" />
          </div>
        );
    }
  };

  return (
    <div className="px-2 md:px-4 lg:pl-2 py-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Transaction
      </h2>

      <div className="flex flex-col justify-center space-y-6  md:bg-white rounded-3xl py-6  md:p-6  h-[236px] overflow-y-auto">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center">
            {getTransactionIcon(transaction.type)}

            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-800">
                {transaction.title}
              </p>
              <p className="text-xs text-[#718EBF]">{transaction.date}</p>
            </div>

            <div
              className={`text-sm font-medium ${
                transaction.action === "credit"
                  ? "text-[#41D4A8]"
                  : "text-[#FF4B4A]"
              }`}
            >
              {transaction.amount > 0
                ? `+$${transaction.amount.toLocaleString()}`
                : `-$${Math.abs(transaction.amount).toLocaleString()}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
