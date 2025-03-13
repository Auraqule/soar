import { useState } from "react";
import { useLocation } from "react-router";
import MobileMenu from "./MobileMenu";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((state: RootState) => state.store.user);
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
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none !bg-transparent"
          aria-label="Open menu"
        >
          <Icon icon="material-symbols:menu-rounded" width="24" height="24" />
        </button>

        <h1 className="text-lg font-semibold text-gray-800">
          {getPageTitle()}
        </h1>

        <div className="h-8 w-8 rounded-full overflow-hidden">
          <img
            src={user?.avatar}
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
            className="pl-12 pr-4 py-2 placeholder:text-placeholder bg-[#F5F7FA] border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-text focus:border-transparent w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Icon
            icon="tdesign:search"
            width="24"
            height="24"
            className="h-5 w-5 text-gray-400 absolute left-5 top-1/2 transform -translate-y-1/2"
          />
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default MobileHeader;
