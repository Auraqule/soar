import { ArrowDownIcon, CreditCardIcon } from "@heroicons/react/16/solid";
import { useStore } from "../../store";
import { Icon } from "@iconify/react";

const RecentTransactions = () => {
  const { transactions } = useStore();

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return (
          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <ArrowDownIcon className="h-5 w-5 text-yellow-600" />
          </div>
        );
      case "payment":
        return (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <CreditCardIcon className="h-5 w-5 text-blue-600" />
          </div>
        );
      case "transfer":
        return (
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <Icon
              icon="simple-icons:cashapp"
              width="24"
              height="24"
              className="h-5 w-5 text-green-600"
            />
          </div>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <CreditCardIcon className="h-5 w-5 text-gray-600" />
          </div>
        );
    }
  };

  return (
    <div className="px-2 md:px-6 py-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Transaction
      </h2>

      <div className="space-y-4  md:bg-white rounded-3xl py-6  md:p-6  h-[236px] overflow-y-auto">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center">
            {getTransactionIcon(transaction.type)}

            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-800">
                {transaction.title}
              </p>
              <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>

            <div
              className={`text-sm font-medium ${
                transaction.amount > 0 ? "text-green-600" : "text-gray-800"
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
