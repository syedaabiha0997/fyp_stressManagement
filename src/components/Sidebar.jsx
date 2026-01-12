import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  Activity,
  Lightbulb,
  Database,
  BrainCircuit // Maine icon bhi thora stress/mind related upgrade kiya hai
} from "lucide-react";
import { auth } from "../firebase"; 
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: <LayoutDashboard size={22} strokeWidth={2} /> 
    },
    { 
      name: "Reports", 
      path: "/reports", 
      icon: <FileText size={22} strokeWidth={2} /> 
    },
    { 
      name: "Recommendations", 
      path: "/recommendations", 
      icon: <Lightbulb size={24} strokeWidth={2.5} /> 
    },
    { 
      name: "AI Health", 
      path: "/ai", 
      icon: <MessageSquare size={22} strokeWidth={2} /> 
    },
    { 
      name: "Settings", 
      path: "/settings", 
      icon: <Settings size={22} strokeWidth={2} /> 
    },
    { 
      name: "Raw Data", 
      path: "/data", 
      icon: <Database size={22} strokeWidth={2} /> 
    },
  ];

  return (
    <div className="h-screen w-64 bg-[#111827] text-slate-400 flex flex-col border-r border-slate-800 sticky top-0">
      
      {/* --- BRAND LOGO UPDATED --- */}
      <div className="p-8 flex items-center gap-3">
        <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg shadow-emerald-500/20">
          <BrainCircuit size={24} />
        </div>
        <div className="flex flex-col">
           <span className="text-white font-black tracking-tighter text-sm uppercase leading-none"> AI Stress</span>
           <span className="text-emerald-500 font-black tracking-tighter text-lg uppercase italic leading-none">Detector</span>
        </div>
      </div>

      {/* Links Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-[11px] uppercase tracking-[0.15em] ${
                isActive 
                  ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/30" 
                  : "hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <span className={isActive ? "text-white" : "text-emerald-500/60"}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-6 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-rose-500/10 text-rose-500 hover:bg-rose-600 hover:text-white transition-all duration-300 font-black text-[10px] uppercase tracking-[0.2em]"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;