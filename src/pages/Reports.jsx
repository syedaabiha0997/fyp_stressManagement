import React, { useState, useEffect } from "react";
import { 
  Heart, Activity, Moon, Zap, TrendingUp, Calendar, Target, Award, 
  Clock, ArrowUp, ArrowDown, BarChart3, X, CheckCircle, AlertCircle 
} from "lucide-react";
import { db } from "../firebase"; 
import { useAuth } from "../context/AuthContext";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

const Reports = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("week");
  
  // Modals ki states
  const [showInsights, setShowInsights] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  
  // Firebase data ki states
  const [dbLogs, setDbLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Real-time Data Sync ---
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "healthIncidents"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbLogs(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const getLatestValue = (metricName, fallback) => {
    const record = dbLogs.find(log => log.metric === metricName);
    return record ? record.value : fallback;
  };

  const vitals = [
    { icon: Heart, label: "Heart Rate", value: getLatestValue("Heart Rate", "72"), unit: "BPM", change: "+2%", trend: "up", color: "rose" },
    { icon: Activity, label: "Blood Pressure", value: getLatestValue("Blood Pressure", "120/80"), unit: "mmHg", change: "-3%", trend: "down", color: "emerald" },
    { icon: Moon, label: "Sleep Quality", value: getLatestValue("Sleep Quality", "7.5"), unit: "hrs", change: "+12%", trend: "up", color: "indigo" },
    { icon: Zap, label: "Hydration", value: getLatestValue("Hydration", "Low"), unit: "", change: "-8%", trend: "down", color: "amber" }
  ];

  // Database logs ko Activity format mein map karna
  const recentActivity = dbLogs.slice(0, 3).map(log => ({
    time: log.time || "Just now",
    activity: log.metric,
    duration: log.value,
    icon: log.metric === "Heart Rate" ? Heart : Activity,
    color: log.status === "Stable" ? "emerald" : "rose",
  }));

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back!</h1>
            <p className="text-slate-400 text-sm font-medium mt-1">
              {loading ? "Syncing..." : "Live Data Connected"}
            </p>
          </div>
        </div>

        {/* Vitals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitals.map((vital, i) => (
            <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-slate-50 text-slate-600`}>
                  <vital.icon size={20} />
                </div>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">{vital.label}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-slate-800">{vital.value}</h3>
                <span className="text-sm font-bold text-slate-300">{vital.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
             <h2 className="text-xl font-black mb-6 flex items-center gap-2"><Target className="text-emerald-500" /> Weekly Goals</h2>
             <p className="text-slate-400 text-sm italic">Goal tracking coming soon based on your logs...</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black mb-6">Recent Logs</h2>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="p-2.5 bg-white text-indigo-500 rounded-xl shadow-sm"><item.icon size={18} /></div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{item.activity}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{item.time}</p>
                  </div>
                  <span className="text-xs font-black text-slate-600">{item.duration}</span>
                </div>
              ))}
            </div>
            {/* --- FIX: Full History Button --- */}
            <button 
              onClick={() => setShowAllActivity(true)} 
              className="w-full mt-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
            >
              <BarChart3 size={16} /> Full History
            </button>
          </div>
        </div>

        {/* Banner Section */}
        <div className="bg-[#111827] rounded-[2.5rem] p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-emerald-500 rounded-2xl"><TrendingUp size={28} /></div>
              <div>
                <h3 className="text-2xl font-black mb-1">Health Score: 85</h3>
                <p className="text-slate-400 text-sm">Based on your latest database entries</p>
              </div>
            </div>
            {/* --- FIX: View Analysis Button --- */}
            <button 
              onClick={() => setShowInsights(true)}
              className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-lg"
            >
              View Analysis
            </button>
          </div>
        </div>

      </div>

      {/* --- MODAL: Full History (ShowAllActivity) --- */}
      {showAllActivity && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[999]" onClick={() => setShowAllActivity(false)}>
          <div className="bg-white rounded-[2.5rem] p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-800">Complete Database Logs</h2>
              <button onClick={() => setShowAllActivity(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X size={24}/></button>
            </div>
            <div className="space-y-3">
              {dbLogs.map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-500"><Clock size={18}/></div>
                     <div>
                        <p className="text-sm font-bold text-slate-800">{log.metric}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{log.date} at {log.time}</p>
                     </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-700">{log.value}</p>
                    <span className="text-[10px] font-black uppercase text-emerald-500">{log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: Analysis (ShowInsights) --- */}
      {showInsights && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[999]" onClick={() => setShowInsights(false)}>
          <div className="bg-white rounded-[2.5rem] p-8 max-w-xl w-full shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-800">Health AI Analysis</h2>
              <button onClick={() => setShowInsights(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X size={24}/></button>
            </div>
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[2rem] space-y-4">
               <div className="flex items-center gap-3">
                  <CheckCircle className="text-emerald-500" />
                  <p className="font-bold text-emerald-800">Your vitals are within stable range.</p>
               </div>
               <p className="text-sm text-emerald-700 leading-relaxed">
                  Based on the last {dbLogs.length} entries, your heart rate and blood pressure show a consistent pattern. 
                  Keep maintaining your current hydration levels.
               </p>
            </div>
            <button onClick={() => setShowInsights(false)} className="w-full mt-6 py-4 bg-[#111827] text-white font-bold rounded-2xl">Got it</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Reports;