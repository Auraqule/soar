import { NavLink } from "react-router";
import { assets } from "../constants";
const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
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
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-4 border-l-3 ${
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
      </nav>
    </aside>
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

export default Sidebar;
