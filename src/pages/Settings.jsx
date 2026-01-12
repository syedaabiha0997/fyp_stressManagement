import React, { useEffect, useState } from "react";
import { User, Mail, Calendar, LogIn, Shield, Check, X, Bell, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";

const Settings = () => {
  // 1. user object ko context se liya
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
      setProvider(user.providerData[0]?.providerId || "password");
      setCreatedAt(new Date(user.metadata.creationTime).toLocaleString());
      setLastLogin(new Date(user.metadata.lastSignInTime).toLocaleString());
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);
      // 2. Firebase update call
      await updateProfile(user, { displayName: name });

      setSuccess("Profile synchronized successfully");
      setIsEditing(false);

      // 3. Force refresh ya state update ki zaroorat hoti hai 
      // taake sidebar mein bhi change dikhe
      setTimeout(() => {
        setSuccess("");
        window.location.reload(); // Yeh ensure karega ke pure app mein name update ho jaye
      }, 2000);

    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const getProviderLabel = () => {
    switch (provider) {
      case "google.com": return "Google Authentication";
      default: return "Enterprise Password";
    }
  };

  if (!user) return <div className="p-10 text-center">Loading System...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
          <div>
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-50 px-3 py-1 rounded-full">System Configuration</span>
            <h1 className="text-3xl font-black text-[#111827] tracking-tight mt-2">Account Control</h1>
          </div>
          <div className="flex gap-2">
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-emerald-500">
              <ShieldCheck size={20} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Side: Identity Card (Display Name yahan dikhega) */}
          <div className="lg:col-span-4">
            <div className="bg-[#111827] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden sticky top-8">
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="h-28 w-28 rounded-[2rem] bg-emerald-500 border-4 border-[#1f2937] flex items-center justify-center text-3xl font-black text-white mb-6 shadow-2xl">
                  {name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                {/* 🟢 Yeh naam update hoga sidebar ke saath */}
                <h2 className="text-xl font-bold tracking-tight">{name || "Authorized User"}</h2>
                <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mt-1 opacity-80">{getProviderLabel()}</p>
              </div>
              <div className="absolute -bottom-10 -right-10 text-white/5 opacity-10">
                <User size={200} />
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-8 space-y-6">
            {success && (
              <div className="flex items-center gap-3 bg-emerald-500 text-white rounded-2xl p-4 shadow-lg shadow-emerald-100">
                <Check className="w-5 h-5" />
                <p className="font-bold text-xs uppercase tracking-widest">{success}</p>
              </div>
            )}

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] ml-1">Profile Name</label>
                  <input
                    className={`w-full px-4 py-4 rounded-2xl border-2 transition-all outline-none font-bold text-sm ${isEditing ? "border-emerald-500 bg-white shadow-inner" : "border-slate-50 bg-slate-50 text-slate-500"
                      }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] ml-1">Email Endpoint (Locked)</label>
                  <input className="w-full px-4 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 text-slate-400 font-bold text-sm" value={email} disabled />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-12">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="flex-1 bg-[#111827] text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-slate-800 transition-all">
                    Modify Records
                  </button>
                ) : (
                  <>
                    <button onClick={() => setIsEditing(false)} className="flex-1 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl">
                      Abort
                    </button>
                    <button onClick={handleSave} disabled={loading} className="flex-1 bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl shadow-lg shadow-emerald-100">
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