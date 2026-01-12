import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add kiya gaya
import { Search, User, Heart, Activity, ShieldCheck, Zap } from "lucide-react";
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
import Header from "../components/Header";
import { getLatestHealthData } from "../services/healthService";

// --- Mock Data ---
const activityData = [
  { name: "Jan 1", Aerobics: 65, Yoga: 45, Meditation: 30 },
  { name: "Jan 2", Aerobics: 75, Yoga: 55, Meditation: 85 },
  { name: "Jan 3", Aerobics: 60, Yoga: 50, Meditation: 40 },
  { name: "Jan 4", Aerobics: 85, Yoga: 50, Meditation: 75 },
  { name: "Jan 5", Aerobics: 70, Yoga: 45, Meditation: 65 },
  { name: "Jan 6", Aerobics: 65, Yoga: 50, Meditation: 80 },
  { name: "Jan 7", Aerobics: 75, Yoga: 60, Meditation: 70 },
  { name: "Jan 8", Aerobics: 80, Yoga: 55, Meditation: 65 },
  { name: "Jan 9", Aerobics: 65, Yoga: 45, Meditation: 70 },
  { name: "Jan 10", Aerobics: 70, Yoga: 50, Meditation: 60 },
  { name: "Jan 11", Aerobics: 75, Yoga: 48, Meditation: 75 },
];

const heartRateData = [
  { time: "00:00", rate: 75 },
  { time: "08:00", rate: 88 },
  { time: "16:00", rate: 92 },
  { time: "20:00", rate: 85 },
];

const bloodPressureData = [
  { time: "00:00", pressure: 95 },
  { time: "12:00", pressure: 108 },
  { time: "18:00", pressure: 102 },
];

export default function Dashboard() {
  const navigate = useNavigate(); // Hook initialize kiya gaya
  const [selectedMonth, setSelectedMonth] = useState("Oct 2025");
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  const USER_ID = "user_001";

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const data = await getLatestHealthData(USER_ID);
        setHealth(data);
      } catch (error) {
        console.error("Error fetching health data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHealthData();
  }, []);

  // Helpers for Status Labels
  const getStatusStyle = (type, value) => {
    if (!value) return "bg-slate-100 text-slate-500";
    return "bg-emerald-50 text-emerald-600"; 
  };

  const heartRate = health?.heart_rate || 82;
  const bpSystolic = health?.BP?.systolic || 128;
  const bpDiastolic = health?.BP?.diastolic || 85;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <Header />

        {/* --- Top Metrics Row --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Heart Rate Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#10B981]" />
                </div>
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest">Heart Rate</h3>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${getStatusStyle('hr', heartRate)}`}>
                Normal
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-black tracking-tight text-slate-800">
                {loading ? "..." : heartRate}
              </span>
              <span className="text-slate-400 font-semibold text-sm">bpm</span>
            </div>
            <div className="h-12 -mx-2 opacity-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={heartRateData}>
                  <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Blood Pressure Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#10B981]" />
                </div>
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest">Blood Pressure</h3>
              </div>
              <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 uppercase">
                Healthy
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-black tracking-tight text-slate-800">
                {loading ? "..." : `${bpSystolic}/${bpDiastolic}`}
              </span>
              <span className="text-slate-400 font-semibold text-sm">mmHg</span>
            </div>
            <div className="h-12 -mx-2 opacity-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodPressureData}>
                  <Line type="monotone" dataKey="pressure" stroke="#059669" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* This Week Stats Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
            <h3 className="text-slate-800 font-bold text-sm mb-5">This Week's Accuracy</h3>
            <div className="space-y-4">
              {[
                { label: "Stress Level", val: 95, color: "bg-[#10B981]" },
                { label: "Sleep Quality", val: 92, color: "bg-[#34D399]" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-slate-400 font-bold uppercase tracking-tighter">{item.label}</span>
                    <span className="text-slate-800 font-black">{item.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Activity Chart */}
          <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-slate-800 font-black text-xl">Activity Growth</h3>
                <p className="text-slate-400 text-sm">Your physical progress over time</p>
              </div>
              <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none ring-1 ring-slate-200 cursor-pointer">
                <option>October 2025</option>
                <option>September 2025</option>
              </select>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} 
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94A3B8', fontSize: 11}} 
                  />
                  <Tooltip 
                    cursor={{fill: '#F8FAFC'}} 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '20px', fontSize: '12px', fontWeight: '600'}} />
                  <Bar dataKey="Aerobics" fill="#10B981" radius={[4, 4, 4, 4]} barSize={8} />
                  <Bar dataKey="Yoga" fill="#34D399" radius={[4, 4, 4, 4]} barSize={8} />
                  <Bar dataKey="Meditation" fill="#059669" radius={[4, 4, 4, 4]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Panel: Summary & Reports */}
          <div className="space-y-6">
            {/* Charcoal Summary Card */}
            <div className="bg-[#111827] rounded-[2.5rem] p-8 shadow-xl text-white flex flex-col justify-between min-h-[320px] relative overflow-hidden">
                <Zap className="absolute -right-4 -top-4 w-32 h-32 text-gray-800 opacity-30" />
                <div className="relative z-10">
                  <h3 className="text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-2">Monthly Goal</h3>
                  <p className="text-3xl font-bold leading-tight">Great job,<br/>keep going!</p>
                </div>
                
                <div className="relative z-10 text-center py-6">
                  <span className="text-7xl font-black text-white tracking-tighter">86%</span>
                  <p className="text-gray-400 text-xs font-medium mt-2">Achievement reached</p>
                </div>

                {/* Yahan Navigate logic lagaya hai */}
                <button 
                  onClick={() => navigate("/reports")} 
                  className="relative z-10 w-full py-4 bg-[#10B981] hover:bg-emerald-600 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-emerald-900/40"
                >
                  Full Report
                </button>
            </div>

            {/* Health Tip Card */}
            <div className="bg-[#10B981] rounded-[2rem] p-6 text-white shadow-lg shadow-emerald-100">
                <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold text-sm">Health Tip</span>
                </div>
                <p className="text-xs opacity-90 leading-relaxed">
                    Increasing Yoga by 15 mins daily could improve your sleep score by 10%.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}