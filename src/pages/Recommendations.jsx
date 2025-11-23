import { Search, User } from "lucide-react";
import React from "react";
import { FaLungs, FaBrain, FaWalking } from "react-icons/fa";
import { RiHeartPulseFill } from "react-icons/ri";
import Header from "../components/Header";
import waves from "../assets/waves.png"

const Recommendations = () => {

  
const totalBars = 30;
const percentage = 86;
const filledBars = Math.round((percentage / 100) * totalBars);

  return (
    <div className="p-3 space-y-8 bg-[#FCF7F2] min-h-screen">

      <Header />


      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Guided Breathing Exercise</h3>
              <p className="text-gray-600 text-sm mt-1">
                Reduce stress with a 2-minute box breathing technique.
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <RiHeartPulseFill className="text-orange-600" />
            </div>
          </div>

          <button className="mt-5 bg-[#F8DEBD] text-black text-sm px-4 py-2 rounded-full">
            Start Exercise
          </button>

          <img src={waves} className="mt-0  w-[100em] h-[3em] opacity-80" />
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Practice Mindfulness</h3>
              <p className="text-gray-600 text-sm mt-1">
                Take a 5-minute break to focus on senses.
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <RiHeartPulseFill className="text-orange-600" />
            </div>
          </div>

         <button className="mt-5 bg-[#F8DEBD] text-black text-sm px-4 py-2 rounded-full">
            Learn More
          </button>

          <img src={waves} className="mt-0  w-[100em] h-[3em] opacity-80" />
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Short Walk Suggestion</h3>
              <p className="text-gray-600 text-sm mt-1">
                A quick 15-minute walk can boost your mood.
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <RiHeartPulseFill className="text-orange-600" />
            </div>
          </div>

       <button className="mt-5 bg-[#F8DEBD] text-black text-sm px-4 py-2 rounded-full">
            Mark as Done
          </button>

          <img src={waves} className="mt-0  w-[100em] h-[3em] opacity-80" />
        </div>

      </div>

      {/* SECTION TITLE */}
      <h2 className="text-3xl font-bold">Recommendations</h2>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Recommendations List */}
        <div className="space-y-5 col-span-2">

          {/* Card A */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-[2em] flex items-center gap-5">
            <FaLungs className="text-black text-5xl" />
            <div>
              <h3 className="font-semibold text-lg">Guided Breathing Exercise</h3>
              <p className="text-gray-600 text-sm">
                Reduce stress with a 2-minute box breathing technique
              </p>
            </div>
          </div>

          {/* Card B */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-[2em] flex items-center gap-5">
            <FaBrain className="text-black text-5xl" />
            <div>
              <h3 className="font-semibold text-lg">Practice Mindfulness</h3>
              <p className="text-gray-600 text-sm">
                Take a 5-minute break to focus, drink a glass of water
              </p>
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">

          {/* REPORTS */}
         <div className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 font-semibold text-sm mb-3">Reports</h3>
          <div className="space-y-4">
            {/* Stress Release */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 relative">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#fee2e2"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#ef4444"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 20 * 0.8} ${2 * Math.PI * 20}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gray-900">80%</span>
                </div>
              </div>
              <div className="flex-1 pt-1">
                <p className="text-xs font-semibold text-gray-900">Stress Release</p>
                <p className="text-[10px] text-red-500">80% decrease</p>
              </div>
            </div>

            {/* General Health */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 relative">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#fecaca"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#be123c"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 20 * 0.75} ${2 * Math.PI * 20}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gray-900">75%</span>
                </div>
              </div>
              <div className="flex-1 pt-1">
                <p className="text-xs font-semibold text-gray-900">General Health</p>
                <p className="text-[10px] text-green-500">75% increase</p>
              </div>
            </div>

            {/* Overall Score */}
       
          </div>
        </div>

        </div>

      </div>
    </div>
  );
};

export default Recommendations;
