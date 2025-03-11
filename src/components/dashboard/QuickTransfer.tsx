import { useState } from "react";
import { useStore } from "../../store";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

const QuickTransfer = () => {
  const { contacts } = useStore();
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [amount, setAmount] = useState("");

  const handleSend = () => {
    if (selectedContact === null || !amount) return;

    // In a real app, you would call an API to process the transfer
    console.log(`Sending $${amount} to contact ID: ${selectedContact}`);

    // Reset form after sending
    setSelectedContact(null);
    setAmount("");
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Transfer
      </h2>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            className={`flex flex-col items-center p-2 rounded-lg min-w-[80px] ${
              selectedContact === contact.id
                ? "bg-blue-50 ring-2 ring-blue-500"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedContact(contact.id)}
          >
            <div className="h-12 w-12 rounded-full overflow-hidden mb-2">
              <img
                src={contact.avatar || "/placeholder.svg?height=48&width=48"}
                alt={contact.name}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
              {contact.name}
            </p>
            <p className="text-xs text-gray-500 whitespace-nowrap">
              {contact.role}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Write Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={amount}
            onChange={(e) => {
              // Only allow numbers and decimal point
              const value = e.target.value.replace(/[^0-9.]/g, "");
              setAmount(value);
            }}
          />
        </div>

        <button
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            selectedContact !== null && amount
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={selectedContact === null || !amount}
          onClick={handleSend}
        >
          Send
          <PaperAirplaneIcon className="h-4 w-4 transform rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default QuickTransfer;
