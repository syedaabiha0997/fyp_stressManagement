import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import sparkle from "../../public/sparkales.png"; // Replace with your sparkle icon if needed


export default function MyAI() {
  const [inputValue, setInputValue] = useState("");

  const suggestions = [
    "What diet should I follow?",
    "What would be best to do in high bp?",
    "What exercise should I avoid in high blood pressure?"
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fff5f0] via-[#fffbf7] to-[#fff0e6] p-6 flex flex-col">

      {/* BACK BUTTON */}
      <button className="h-12 w-12 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors mb-8">
        <ArrowLeft className="text-gray-800" size={20} />
      </button>

      {/* CENTER CONTENT */}
      <div className="flex-grow flex flex-col items-center justify-center -mt-16">

        {/* Sparkle Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img src={sparkle} alt="sparkle" className="h-20" />
          </div>
        </div>

        <h1 className="text-2xl font-medium text-gray-900 text-center mb-16">
          Ask Your AI About Diet/Exercise
        </h1>

        {/* Suggestions */}
        <div className="w-full max-w-4xl px-4 mb-12">
          <h2 className="text-sm font-medium text-gray-600 mb-6 text-center">
            Suggestions on what to ask Our AI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-800 text-sm">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/80 transition-colors cursor-pointer border border-gray-100"
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INPUT BOX */}
      <div className="w-full max-w-3xl mx-auto pb-4">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about your health"
            className="w-full px-5 py-4 pr-14 rounded-2xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-transparent focus:outline-none placeholder-gray-400 text-gray-800"
          />

          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
            <Send className="text-gray-600 ml-0.5" size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}