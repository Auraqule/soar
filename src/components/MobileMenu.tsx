import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { NavLink } from "react-router";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { assets } from "../constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        {/* Drawer */}
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            {/* Close Button */}
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className={`ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${
                  isOpen ? "flex" : "hidden"
                }`}
                onClick={onClose}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="h-8 w-8 text-white flex items-center justify-center rounded">
                  <img
                    src={assets.logo}
                    alt="Soar task logo"
                    className="h-[30px] w-6"
                  />
                </div>
                <h1 className="ml-2 font-extrabold">Soar Task</h1>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 h-full overflow-y-auto">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3  border-l-3 ${
                          isActive
                            ? "border-black !text-primary-black opacity-100"
                            : "border-transparent !text-black opacity-35 hover:bg-gray-100"
                        }`
                      }
                    >
                      <img src={item.icon} className="h-5 w-5 mr-3" />
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

const navItems = [
  { name: "Dashboard", path: "/", icon: assets.home },
  { name: "Transactions", path: "/transactions", icon: assets.transaction },
  { name: "Accounts", path: "/accounts", icon: assets.account },
  { name: "Investments", path: "/investments", icon: assets.investment },
  { name: "Credit Cards", path: "/credit-cards", icon: assets.creditCard },
  { name: "Loans", path: "/loans", icon: assets.loan },
  { name: "Services", path: "/services", icon: assets.service },
  { name: "My Privileges", path: "/privileges", icon: assets.priviledge },
  { name: "Setting", path: "/settings", icon: assets.settings },
];

export default MobileMenu;
