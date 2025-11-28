import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaHome, FaHeart, FaCog, FaRunning } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiAiGenerate, RiLogoutCircleLine } from "react-icons/ri";
import { BiBarChartAlt2 } from "react-icons/bi";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome size={16} /> },
    { name: "Recommendations", path: "/recommendations", icon: <BiBarChartAlt2 size={16} /> },
    { name: "Reports", path: "/reports", icon: <FaHeart size={16} /> },
    { name: "My AI", path: "/ai", icon: <RiAiGenerate size={16} /> },
    { name: "Settings", path: "/settings", icon: <FaCog size={16} /> },
  ];

  return (
    <div className="h-[130vh] w-64 bg-[#F6E8D8] border-r border-gray-200 p-6 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl shadow-md">

      {/* LOGO SECTION */}
      <div>
        <div className="flex items-left justify-left mb-10">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-md">
            <img src={logo} className="h-12 w-12 object-cover rounded-full" />
          </div>
        </div>

        {/* MENU LIST */}
        <ul className="space-y-4">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition-all duration-200
                  ${isActive
                    ? "bg-[#8B0A0A] text-white shadow-sm"
                    : "text-[#6A3A2B] hover:bg-[#E8CDB9]"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* LOGOUT */}
      <NavLink
        to="/"
        className="flex items-center gap-3 px-4 py-2 text-[#6A3A2B] hover:bg-[#E8CDB9] rounded-xl transition-all duration-200"
      >
        <RiLogoutCircleLine size={16} />
        Log out
      </NavLink>

    </div>
  );
};

export default Sidebar;
