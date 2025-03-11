import { useState } from "react";
import { useLocation } from "react-router";
import { BellIcon, CogIcon } from "@heroicons/react/16/solid";
import { BellAlertIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react";
import { assets } from "../constants";
const Header = () => {
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
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold">{getPageTitle()}</h1>

      <div className="flex items-center space-x-[30px]">
        <div className="relative bg-[#F5F7FA] rounded-[40px] h-[50px]">
          <input
            type="text"
            placeholder="Search for something"
            className="pl-12 h-full pr-4 py-2 placeholder:text-placeholder rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-black focus:border-transparent w-64"
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

        <button
          className="p-2 rounded-full bg-elavated-bg text-gray-500 hover:bg-gray-100 focus:outline-none"
          aria-label="Settings"
        >
          <Icon
            icon="system-uicons:settings"
            width="30"
            height="30"
            color="#718EBF"
          />
        </button>

        <button
          className="p-2 rounded-full bg-elavated-bg text-gray-500 hover:bg-gray-100 focus:outline-none"
          aria-label="Notifications"
        >
          <Icon
            icon="iconoir:bell-notification"
            width="25"
            height="25"
            color="#396AFF"
          />
        </button>

        <div className="h-15 w-15 rounded-full overflow-hidden">
          <img
            src={assets.user}
            alt="User profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
