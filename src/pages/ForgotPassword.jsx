import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/authService";
import logo from "../assets/logo.png";
import { Mail, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Identification required: Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      setMessage("Protocol Initiated: Check your inbox for the reset link.");
    } catch (err) {
      setError("System Error: Failed to send reset email. Verify credentials.");
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
            Security Recovery
          </span>
          <h2 className="text-3xl font-black text-[#111827] tracking-tight text-center">
            Reset Access
          </h2>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl mb-6 text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
            {error}
          </div>
        )}

        {message && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-4 rounded-2xl mb-6 text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
            <CheckCircle2 size={18} className="text-emerald-500" />
            {message}
          </div>
        )}

        <p className="text-center text-slate-500 text-sm font-medium mb-8 px-4">
          Enter your authorized email address below to receive a security synchronization link.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input
              type="email"
              placeholder="System Email Address"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white px-12 py-4 rounded-2xl text-sm font-bold text-[#111827] placeholder-slate-400 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111827] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95"
          >
            {loading ? "Processing..." : "Request Reset Link"}
            {!loading && <KeyRound size={16} className="text-emerald-400" />}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-emerald-600 transition-colors">
            <ArrowLeft size={14} />
            Return to Access Terminal
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-emerald-50 rounded-full opacity-50"></div>
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-slate-50 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;