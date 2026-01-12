import { Search, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-title font-bold text-primary">
          AI Stress Detection System
        </h1>
        <p className="text-secondary text-helper">{today}</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-background rounded-full">
          <Search className="w-4 h-4 text-primary" />
        </button>

        {/* USER INFO */}
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-accent">
          <User className="w-4 h-4 text-primary" />
          <span className="text-helper font-medium text-primary">
            {user?.displayName || user?.email || "User"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
