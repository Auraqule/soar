import { useEffect, useRef, useState } from "react";
import { useStore } from "../../store";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

const QuickTransfer = () => {
  const { contacts } = useStore();
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [amount, setAmount] = useState("");

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef<any>(null);

  // Handle scroll events
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  // Scroll left or right
  const scroll = (direction: string) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "right" ? 200 : -200, // Adjust scroll distance
        behavior: "smooth",
      });
    }
  };

  const handleSend = () => {
    if (selectedContact === null || !amount) return;

    // In a real app, you would call an API to process the transfer
    console.log(`Sending $${amount} to contact ID: ${selectedContact}`);

    // Reset form after sending
    setSelectedContact(null);
    setAmount("");
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="py-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Transfer
      </h2>

      <div className="md:h-69 md:bg-white rounded-3xl px-2 pt-4 md:p-6">
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
              onClick={() => scroll("left")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Contact List */}
          <div
            ref={containerRef}
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
            onScroll={handleScroll}
          >
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
                    src={contact.avatar}
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

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
              onClick={() => scroll("right")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Amount Input and Send Button */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Write Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={amount}
              onChange={(e) => {
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
    </div>
  );
};

export default QuickTransfer;
