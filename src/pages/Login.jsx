import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Landmark, Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white/5 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-xl">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-orange-600/20">
              <Landmark className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
            <p className="text-white/50">Continue your journey through Sikkim's heritage</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-orange-500 hover:text-orange-400">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-orange-600/10 flex items-center justify-center gap-3"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/5 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all">
              <Github className="w-5 h-5" /> Continue with GitHub
            </button>
            <p className="text-center text-sm text-white/40">
              Don't have an account? <button onClick={() => navigate('/signup')} className="text-orange-500 font-bold hover:text-orange-400">Sign up</button>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
