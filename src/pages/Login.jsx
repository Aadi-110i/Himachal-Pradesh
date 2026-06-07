import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Landmark, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Simulate login — accept any credentials
    navigate('/dashboard');
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white border border-maroon/5 p-10 rounded-[2.5rem] shadow-xl">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-maroon rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-maroon/20">
              <Landmark className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-serif text-maroon mb-2">Welcome Back</h1>
            <p className="text-maroon/50 text-sm">Continue your journey through Sikkim's heritage</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-medium px-4 py-3 rounded-2xl mb-6 text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest px-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon/20 group-focus-within:text-maroon transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="name@example.com"
                  className="w-full bg-cream-dark border border-maroon/5 rounded-2xl py-4 pl-12 pr-4 text-maroon placeholder:text-maroon/20 focus:outline-none focus:border-maroon/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] font-bold text-maroon hover:text-maroon-dark transition-colors">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon/20 group-focus-within:text-maroon transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="w-full bg-cream-dark border border-maroon/5 rounded-2xl py-4 pl-12 pr-12 text-maroon placeholder:text-maroon/20 focus:outline-none focus:border-maroon/20 transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-maroon/30 hover:text-maroon transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-maroon hover:bg-maroon-dark text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-maroon/20 flex items-center justify-center gap-3"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-maroon/5">
            <p className="text-center text-sm text-maroon/50">
              Don't have an account? <button onClick={() => navigate('/signup')} className="text-maroon font-bold hover:text-maroon-dark">Sign up</button>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
