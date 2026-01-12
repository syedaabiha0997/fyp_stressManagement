import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { signInWithEmail, signInWithGoogle } from "../services/authService";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Identification required: Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmail(email, password, rememberMe);
      navigate("/dashboard");
    } catch (err) {
      setError("Access Denied: Invalid credentials provided");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle(rememberMe);
      navigate("/dashboard");
    } catch (err) {
      setError("External Authentication Failed");
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
            Secure Gateway
          </span>
          <h2 className="text-3xl font-black text-[#111827] tracking-tight">
            System Access
          </h2>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl mb-6 text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
            {error}
          </div>
        )}

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all mb-6 text-sm font-bold text-slate-600 shadow-sm"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="h-5 w-5"
            alt="Google"
          />
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-slate-100"></div>
          <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest">OR</p>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input
              type="email"
              placeholder="System Email"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white px-12 py-4 rounded-2xl text-sm font-bold text-[#111827] placeholder-slate-400 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Passkey"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white px-12 py-4 rounded-2xl text-sm font-bold text-[#111827] placeholder-slate-400 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-emerald-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-between items-center px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">Remember Station</span>
            </label>

            <Link to="/forgot-password" size={18} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">
              Reset Key?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111827] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 mt-6"
          >
            {loading ? "Authorizing..." : "Enter Terminal"}
            {!loading && <ArrowRight size={16} className="text-emerald-400" />}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            New Operator?{" "}
            <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 ml-2">
              Request Access
            </Link>
          </p>
        </div>
        
        {/* Decorative background flare */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-50 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default Login;