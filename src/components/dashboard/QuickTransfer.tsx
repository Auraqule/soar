import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import SuccessPopup from "../SuccessPopup";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const QuickTransfer = () => {
  const contacts = useSelector((state: RootState) => state.store.contacts);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef<any>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction: string) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "right" ? 200 : -200,
        behavior: "smooth",
      });
    }
  };

  const handleSend = async () => {
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!amount) return;
      setSuccessMessage("Money sent successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setSelectedContact(null);
      setAmount("");
    } catch (error) {
      console.error("Error sending money:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="px-2 md:px-4 lg:px-4 py-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Transfer
      </h2>

      <SuccessPopup successMessage={successMessage} />

      <div className="flex flex-col justify-center space-y-4 md:h-69 md:bg-white rounded-3xl px-2 pt-4 md:p-6">
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
                    ? "bg-blue-50"
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
        <div className="flex items-center space-x-7 mt-4 relative">
          <div>
            <label htmlFor="amount" className="text-[#718EBF]">
              Write amount
            </label>
          </div>
          <div className="flex-1 bg-[#EDF1F7] rounded-[50px] h-[50px]">
            <input
              type="text"
              id="amount"
              placeholder="0.00"
              className="w-full h-full  px-8 pr-22 py-2 placeholder:text-[#718EBF] border-gray-300 outline-none"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, "");
                setAmount(value);
              }}
            />
          </div>

          <button
            className={`absolute top-1/2   -translate-y-1/2 right-0 px-4 py-2 rounded-[50px] flex items-center h-full transition-all duration-300 ease-in-out transform
    ${
      isSubmitting
        ? "!bg-gray-600 !cursor-not-allowed"
        : "!bg-primary-black hover:!bg-gray-800 hover:scale-105 hover:shadow-lg"
    }
    text-white gap-2 ${
      amount
        ? "!bg-gray-900 text-white hover:!bg-gray-800 hover:scale-105 hover:shadow-lg"
        : "!bg-gray-200 text-gray-500 cursor-not-allowed"
    }`}
            disabled={!amount || isSubmitting}
            onClick={handleSend}
          >
            {isSubmitting ? "Sending..." : "Send"}
            <Icon
              icon="ph:telegram-logo-duotone"
              width="26"
              height="26"
              className={` ${amount ? "animate-pulse" : "animate-none"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickTransfer;
