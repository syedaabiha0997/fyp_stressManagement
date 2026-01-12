import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Wind, Brain, Footprints, Droplets, HeartPulse, 
  ChevronRight, Zap, Plus, Minus, GlassWater, Sparkles 
} from "lucide-react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext"; 
import { db } from "../firebase"; 
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

const Recommendations = () => {
  const { user } = useAuth();
  const [glasses, setGlasses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showMindfulnessDesc, setShowMindfulnessDesc] = useState(false);
  
  const today = new Date().toISOString().split('T')[0]; 
  const displayDate = new Date().toLocaleDateString('en-GB');

  // Firebase Fetch Logic
  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, "waterTracking", `${user.uid}_${today}`);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setGlasses(docSnap.data().count);
      } else {
        setGlasses(0);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user, today]);

  // Update Water Count
  const updateWater = async (amount) => {
    if (!user || (glasses + amount < 0)) return; 
    const docRef = doc(db, "waterTracking", `${user.uid}_${today}`);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, { count: docSnap.data().count + amount, lastUpdated: new Date() });
      } else if (amount > 0) {
        await setDoc(docRef, { userId: user.uid, date: today, count: amount, lastUpdated: new Date() });
      }
    } catch (error) { console.error("Error updating water intake:", error); }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />

        {/* --- TOP 3 MAIN CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Breathing -> Direct to AI */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-between transition-all hover:shadow-md group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Wind className="w-6 h-6 text-[#10B981]" />
              </div>
              <Sparkles className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 leading-tight">Guided Breathing Exercise</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">Personalize your calm with our AI-driven patterns.</p>
            <Link to="/ai" state={{ action: 'breathing', title: 'Breathing Exercise' }} className="mt-6 w-full py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100">
              <Sparkles size={16} /> AI Assistant
            </Link>
          </div>

          {/* Card 2: Mindfulness -> Toggle Description */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-between transition-all hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Practice Mindfulness</h3>
              <p className="text-slate-400 text-sm mt-2">Take a 5-minute break to focus on your senses.</p>
              {showMindfulnessDesc && (
                <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-500 italic animate-in fade-in slide-in-from-top-1">
                  Try the 5-4-3-2-1 technique: notice 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste.
                </div>
              )}
            </div>
            <button onClick={() => setShowMindfulnessDesc(!showMindfulnessDesc)} className="mt-6 w-full py-3 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-600 font-bold text-sm rounded-xl transition-all">
              {showMindfulnessDesc ? "Show Less" : "Learn More"}
            </button>
          </div>

          {/* Card 3: Water Tracker */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border-2 border-teal-100 flex flex-col justify-between transition-all hover:shadow-md bg-gradient-to-br from-white to-teal-50">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center"><Droplets className="w-6 h-6 text-teal-600" /></div>
                <div className="bg-teal-600 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">Live Sync</div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Hydration Tracker</h3>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-black text-teal-600">{loading ? "--" : glasses}</span>
                <span className="text-slate-400 font-bold mb-1">/ 8 Glasses</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => updateWater(-1)} className="flex-1 py-3 bg-red-50 text-red-600 hover:bg-red-100 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 border border-red-100 active:scale-95"><Minus size={16} /> Delete</button>
              <button onClick={() => updateWater(1)} className="flex-[2] py-3 bg-teal-600 text-white hover:bg-teal-700 font-bold text-sm rounded-xl transition-all shadow-lg shadow-teal-100 flex items-center justify-center gap-2 active:scale-95"><Plus size={16} /> Add Glass</button>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black tracking-tight text-slate-800">Recommendations</h2>
          <Link to="/ai" className="text-[10px] font-black text-[#10B981] bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 group">
            AI Personalized <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Clickable List Items */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { id: 'breathing', icon: <Wind />, title: "Deep Breathing", desc: "Follow the 4-4-4-4 rhythm to reset your nervous system.", color: "text-[#10B981]", bg: "bg-emerald-50" },
              { id: 'mindfulness', icon: <Brain />, title: "Mindfulness Session", desc: "Focus on 5 things you can see and 4 things you can feel.", color: "text-emerald-600", bg: "bg-emerald-50" },
              { id: 'walk', icon: <Footprints />, title: "Short Walk", desc: "A 15-minute brisk walk increases oxygen levels.", color: "text-[#059669]", bg: "bg-emerald-100" }
            ].map((item, idx) => (
              <Link 
                to="/ai" 
                state={{ action: item.id, title: item.title }} 
                key={idx} 
                className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-emerald-200 transition-all hover:-translate-y-1 block"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-[1.5rem] ${item.bg} flex items-center justify-center text-2xl ${item.color}`}>
                    {React.cloneElement(item.icon, { size: 28 })}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-[#10B981] transition-colors">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-slate-800 font-bold text-lg mb-6">Daily Health Report</h3>
              <div className="mb-8 p-4 bg-teal-50/50 rounded-2xl border border-teal-100">
                 <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] font-black text-teal-700 uppercase tracking-widest">Hydration Status</p>
                    <p className="text-[10px] font-bold text-slate-400">{displayDate}</p>
                 </div>
                 <div className="text-2xl font-black text-teal-600 mb-2">{glasses} <span className="text-xs text-slate-400 font-bold">Glasses</span></div>
                 <div className="h-1.5 w-full bg-teal-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 transition-all duration-500" style={{ width: `${Math.min((glasses / 8) * 100, 100)}%` }} />
                 </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="relative w-14 h-14">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="28" cy="28" r="24" stroke="#F1F5F9" strokeWidth="5" fill="none" />
                    <circle cx="28" cy="28" r="24" stroke="#10B981" strokeWidth="5" fill="none" strokeDasharray={150} strokeDashoffset={150 * (1 - 0.8)} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black">80%</div>
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Stress Release</p>
                  <p className="text-[10px] text-[#10B981] font-bold uppercase tracking-wider">Optimal</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-[2.5rem] p-8 shadow-xl text-white relative overflow-hidden group">
               <Zap className="absolute -right-4 -top-4 w-24 h-24 text-gray-800 opacity-30 group-hover:scale-110 transition-transform" />
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current Streak</p>
               <p className="text-2xl font-bold">5 <span className="text-emerald-400 italic">Days</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;