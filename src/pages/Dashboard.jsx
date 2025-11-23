import { Search, User } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useState } from "react";
import Header from "../components/Header";

const activityData = [
  { name: "Jan\n1", Aerobics: 65, Yoga: 45, Meditation: 30 },
  { name: "Jan\n2", Aerobics: 75, Yoga: 55, Meditation: 85 },
  { name: "Jan\n3", Aerobics: 60, Yoga: 50, Meditation: 40 },
  { name: "Jan\n4", Aerobics: 85, Yoga: 50, Meditation: 75 },
  { name: "Jan\n5", Aerobics: 70, Yoga: 45, Meditation: 65 },
  { name: "Jan\n6", Aerobics: 65, Yoga: 50, Meditation: 80 },
  { name: "Jan\n7", Aerobics: 75, Yoga: 60, Meditation: 70 },
  { name: "Jan\n8", Aerobics: 80, Yoga: 55, Meditation: 65 },
  { name: "Jan\n9", Aerobics: 65, Yoga: 45, Meditation: 70 },
  { name: "Jan\n10", Aerobics: 70, Yoga: 50, Meditation: 60 },
  { name: "Jan\n11", Aerobics: 75, Yoga: 48, Meditation: 75 },
  { name: "Jan\n12", Aerobics: 68, Yoga: 55, Meditation: 80 },
  { name: "Jan\n13", Aerobics: 72, Yoga: 52, Meditation: 85 },
  { name: "Jan\n14", Aerobics: 80, Yoga: 58, Meditation: 78 },
  { name: "Jan\n15", Aerobics: 76, Yoga: 48, Meditation: 82 },
  { name: "Jan\n16", Aerobics: 74, Yoga: 54, Meditation: 88 },
  { name: "Jan\n17", Aerobics: 78, Yoga: 60, Meditation: 75 },
  { name: "Jan\n18", Aerobics: 82, Yoga: 56, Meditation: 80 },
];


const totalBars = 30;
const percentage = 86;
const filledBars = Math.round((percentage / 100) * totalBars);


const heartRateData = [
  { time: "00:00", rate: 75 },
  { time: "04:00", rate: 80 },
  { time: "08:00", rate: 88 },
  { time: "12:00", rate: 95 },
  { time: "16:00", rate: 92 },
  { time: "20:00", rate: 85 },
];

const bloodPressureData = [
  { time: "00:00", pressure: 95 },
  { time: "06:00", pressure: 100 },
  { time: "12:00", pressure: 108 },
  { time: "18:00", pressure: 102 },
];

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState("Oct 2025");

  return (
    <div className="min-h-screen bg-[#faf9f7] p-3 md:p-4">
      {/* Header */}
      <Header />

      {/* Main content grid */}
      <div className="flex gap-3 mb-3 ">
        {/* Heart Rate Card */}
        <div className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100 w-[20em]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3 className="text-gray-900 font-semibold text-sm">Heart Rate</h3>
          </div>
          <div className="mb-1">
            <p className="text-3xl font-bold text-gray-900">98</p>
            <p className="text-xs text-gray-500">bpm</p>
          </div>
          <p className="text-xs text-gray-900 bg-gray-100 rounded-full px-2 py-0.5 inline-block mb-2">Normal</p>
          <div className="h-10 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData}>
                <defs>
                  <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fecaca" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#fecaca" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  fill="url(#heartGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Blood Pressure Card */}
        <div className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100 w-[20em]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
              <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <h3 className="text-gray-900 font-semibold text-sm">Blood Pressure</h3>
          </div>
          <div className="mb-1">
            <p className="text-3xl font-bold text-gray-900">102</p>
            <p className="text-xs text-gray-500">/ 70 mmhg</p>
          </div>
          <p className="text-xs text-gray-900 bg-gray-100 rounded-full px-2 py-0.5 inline-block mb-2">Normal</p>
          <div className="h-10 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bloodPressureData}>
                <defs>
                  <linearGradient id="bpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fed7aa" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#fed7aa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="pressure"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={false}
                  fill="url(#bpGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* This Week Stats */}
        <div className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1 w-[35em]">
          <h3 className="text-gray-900 font-semibold text-sm mb-3">This Week</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-900 font-medium">Stress Level</span>
                <span className="text-xs font-semibold text-gray-900">95%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className="text-[10px] text-gray-400">Correct</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-900 font-medium">Sleep Quality</span>
                <span className="text-xs font-semibold text-gray-900">92%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-[10px] text-gray-400">Correct</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-900 font-medium">Blood Pressure</span>
                <span className="text-xs font-semibold text-gray-900">89%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" style={{ width: '89%' }}></div>
                </div>
                <span className="text-[10px] text-gray-400">Correct</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Growth Chart and Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* Activity Growth Chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900 font-semibold text-sm">Activity Growth</h3>
            <div className="flex items-center gap-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option>Oct 2025</option>
                <option>Sep 2025</option>
                <option>Aug 2025</option>
              </select>
            </div>
          </div>

          <div className="h-48 md:h-[21em]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} barGap={0} barCategoryGap="15%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  ticks={[0, 20, 40, 60, 80]}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    fontSize: "12px"
                  }}
                  cursor={{ fill: 'transparent' }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar dataKey="Aerobics" fill="#dc2626" radius={[8, 8, 0, 0]} maxBarSize={30} />
                <Bar dataKey="Yoga" fill="#be123c" radius={[8, 8, 0, 0]} maxBarSize={30} />
                <Bar dataKey="Meditation" fill="#ea580c" radius={[8, 8, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reports Panel */}
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
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center w-full max-w-sm mx-auto">
              <div className="relative w-full flex justify-center">
                <svg width="300" height="100" viewBox="0 0 220 120" className="mb-10 mr-4">
                  {Array.from({ length: totalBars }).map((_, i) => {
                    const angle = (i / totalBars) * Math.PI; // 0 to π
                    const x1 = 110 + Math.cos(angle) * 80;
                    const y1 = 110 - Math.sin(angle) * 80;
                    const x2 = 110 + Math.cos(angle) * 60;
                    const y2 = 110 - Math.sin(angle) * 60;

                    const active = i < filledBars;

                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={active ? "#8B0A0A" : "#D4D4D8"}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
                  <span className="text-4xl font-bold text-gray-900">86%</span>
                </div>
              </div>

              <p className="text-sm text-[#8B0A0A] font-medium -mt-4 leading-tight">
                You have achieved 86% <br /> of your goals this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}