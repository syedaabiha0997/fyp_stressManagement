import React, { useEffect, useState } from "react";
import { User, Mail, Calendar, LogIn, ShieldCheck, Check, Shield, Clock, Key, Globe } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";

const Settings = () => {
  const { user } = useAuth();

  // --- Core States ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // --- Initial Data Load (Based on your photo details) ---
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
      
      const providerId = user.providerData[0]?.providerId;
      setProvider(providerId === "google.com" ? "Google Account" : "Email & Password");
      
      setCreatedAt(new Date(user.metadata.creationTime).toLocaleString());
      setLastLogin(new Date(user.metadata.lastSignInTime).toLocaleString());
    }
  }, [user]);

  // --- Firebase Update Logic ---
  const handleSave = async () => {
    try {
      setLoading(true);
      // Firebase server update
      await updateProfile(user, { displayName: name });
      
      setSuccess("Profile synchronized successfully");
      setIsEditing(false);

      setTimeout(() => {
        setSuccess("");
        window.location.reload(); 
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Error: Could not sync changes.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-10 text-center font-black text-slate-400 tracking-tighter">INITIALIZING SYSTEM...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#111827] tracking-tight">Account Settings</h1>
            <p className="text-slate-400 font-bold text-sm mt-2">Manage your profile identity and system preferences</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-emerald-500">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Identity Preview (From your photo) */}
          <div className="lg:col-span-4">
            <div className="bg-[#111827] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden sticky top-10">
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-28 w-28 rounded-[2.5rem] bg-gradient-to-tr from-emerald-400 to-emerald-600 border-4 border-[#1f2937] flex items-center justify-center text-4xl font-black mb-6 shadow-2xl">
                  {name?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <h2 className="text-2xl font-black tracking-tight mb-1 text-center">{name || "Abeeha"}</h2>
                <p className="text-slate-400 text-sm font-medium mb-8 text-center truncate w-full">{email}</p>
                
                {/* Provider Detail */}
                <div className="w-full bg-white/5 rounded-2xl p-5 border border-white/10">
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Login Provider</p>
                   <div className="flex items-center gap-2">
                      <Globe size={14} className="text-slate-400"/>
                      <span className="text-sm font-bold text-slate-200">{provider}</span>
                   </div>
                </div>
              </div>
              
              {/* Abstract decoration */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Right Column: Information Control */}
          <div className="lg:col-span-8 space-y-8">
            
            {success && (
              <div className="flex items-center gap-3 bg-emerald-500 text-white rounded-2xl p-5 shadow-xl animate-in fade-in slide-in-from-top-4">
                <Check className="w-5 h-5 bg-white/20 rounded-full p-0.5" />
                <p className="font-black text-xs uppercase tracking-widest">{success}</p>
              </div>
            )}

            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-8 md:p-12">
              
              {/* Personal Information Section */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><User size={20}/></div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <input
                      className={`w-full px-6 py-5 rounded-2xl border-2 transition-all outline-none font-bold text-sm ${
                        isEditing 
                        ? "border-emerald-500 bg-white shadow-xl shadow-emerald-50" 
                        : "border-slate-50 bg-slate-50 text-slate-500 cursor-not-allowed"
                      }`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-slate-300">Email Address (Locked)</label>
                    <input 
                      className="w-full px-6 py-5 rounded-2xl border-2 border-slate-50 bg-slate-50 text-slate-300 font-bold text-sm cursor-not-allowed opacity-60" 
                      value={email} 
                      disabled 
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-4 ml-1 italic">Email cannot be changed via System Configuration</p>
              </div>

              {/* Account Activity Section (Exact from image_d67c03.png) */}
              <div className="pt-10 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Clock size={20}/></div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Account Activity</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Calendar size={14} className="text-indigo-400"/> Account Created
                      </p>
                      <p className="text-sm font-black text-slate-600 tracking-tight">{createdAt}</p>
                   </div>
                   <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <LogIn size={14} className="text-indigo-400"/> Last Session Login
                      </p>
                      <p className="text-sm font-black text-slate-600 tracking-tight">{lastLogin}</p>
                   </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="flex-1 bg-[#111827] text-white font-black text-[11px] uppercase tracking-[0.2em] py-6 rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                  >
                    Edit Profile Details
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)} 
                      className="flex-1 bg-slate-100 text-slate-500 font-black text-[11px] uppercase tracking-[0.2em] py-6 rounded-2xl hover:bg-slate-200"
                    >
                      Abort Operation
                    </button>
                    <button 
                      onClick={handleSave} 
                      disabled={loading} 
                      className="flex-1 bg-emerald-500 text-white font-black text-[11px] uppercase tracking-[0.2em] py-6 rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95"
                    >
                      {loading ? "Syncing..." : "Update Everywhere"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;