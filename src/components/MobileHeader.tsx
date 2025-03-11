import { useState } from "react";
import { useLocation } from "react-router";
import MobileMenu from "./MobileMenu";
import { Icon } from "@iconify/react";

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname === "/") return "Overview";
    if (location.pathname === "/settings") return "Setting";
    return (
      location.pathname.substring(1).charAt(0).toUpperCase() +
      location.pathname.substring(2)
    );
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 py-4 px-4 flex items-center justify-between">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
          aria-label="Open menu"
        >
          <Icon icon="material-symbols:menu-rounded" width="24" height="24" />
        </button>

        <h1 className="text-lg font-semibold text-gray-800">
          {getPageTitle()}
        </h1>

        <div className="h-8 w-8 rounded-full overflow-hidden">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="User profile"
            className="h-full w-full object-cover"
          />
        </div>
      </header>

      <div className="bg-white px-4 py-2 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for something"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Icon
            icon="material-symbols-light:search"
            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default MobileHeader;
