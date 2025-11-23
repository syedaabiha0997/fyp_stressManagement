import { Search, User } from 'lucide-react'
import React from 'react'

const Header = () => {

    // ✅ REAL DATE FORMAT (e.g., "Oct 18, 2025")
    const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

    return (
        <div>
            {/* TOP HEADER */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        AI Stress Detection System
                    </h1>

                    {/* 👇 Dynamic Date */}
                    <p className="text-gray-500 text-xs">{today}</p>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white rounded-lg transition">
                        <Search className="w-4 h-4 text-gray-900" />
                    </button>

                    <button className="p-2 bg-white rounded-full border border-gray-200">
                        <User className="w-4 h-4 text-gray-900" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
