import { NavLink } from "react-router";
import { assets, navItems } from "../constants";
const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 h-full flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-center">
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
            <li key={item.path} className="relative">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center px-4 py-4 pl-13 transition-all duration-300
            ${
              isActive
                ? "text-primary-black opacity-100"
                : "text-black opacity-35 hover:bg-gray-100"
            }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="rounded-tr-[10px] rounded-br-[10px]  absolute left-0 top-1/2 -translate-y-1/2 h-[60px] w-1.5 bg-black"></div>
                    )}
                    <img src={item.icon} className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
