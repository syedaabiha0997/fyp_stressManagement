import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { signUpWithEmail } from "../services/authService";
import { User, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      return setError("All authorization fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Security protocols failed: Passwords do not match");
    }

    try {
      setLoading(true);
      await signUpWithEmail(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Credential synchronization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 p-10 border border-slate-100 relative overflow-hidden">
        
        {/* Top Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#111827] p-4 rounded-[2rem] mb-6 shadow-xl">
             <img src={logo} alt="logo" className="h-16 w-auto" />
          </div>
          <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] bg-emerald-50 px-4 py-1 rounded-full mb-3">
            System Enrollment
          </span>
          <h2 className="text-3xl font-black text-[#111827] tracking-tight">
            Create Profile
          </h2>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl mb-6 text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input
              type="text"
              placeholder="Legal Name"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white px-12 py-4 rounded-2xl text-sm font-bold text-[#111827] placeholder-slate-400 outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white px-12 py-4 rounded-2xl text-sm font-bold text-[#111827] placeholder-slate-400 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input
              type="password"
              placeholder="Access Password"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white px-12 py-4 rounded-2xl text-sm font-bold text-[#111827] placeholder-slate-400 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input
              type="password"
              placeholder="Verify Password"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white px-12 py-4 rounded-2xl text-sm font-bold text-[#111827] placeholder-slate-400 outline-none transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111827] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 mt-6"
          >
            {loading ? "Synchronizing..." : "Initialize Profile"}
            {!loading && <ArrowRight size={16} className="text-emerald-400" />}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Existing Operator?{" "}
            <Link to="/" className="text-emerald-600 hover:text-emerald-700 ml-2">
              Access Terminal
            </Link>
          </p>
        </div>

        {/* Decorative corner element */}
        <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-emerald-50 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default Signup;