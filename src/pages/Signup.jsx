import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    navigate('/dashboard');
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const passwordStrength = formData.password.length === 0 ? 0 
    : formData.password.length < 6 ? 1 
    : formData.password.length < 10 ? 2 : 3;

  const strengthLabels = ['', 'Weak', 'Good', 'Strong'];
  const strengthColors = ['', 'bg-red-400', 'bg-yellow-400', 'bg-emerald-400'];

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white border border-maroon/5 p-10 rounded-[2.5rem] shadow-xl">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-maroon rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-maroon/20">
              <User className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-serif text-maroon mb-2">Create Account</h1>
            <p className="text-maroon/50 text-sm">Join the digital preservation movement</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-medium px-4 py-3 rounded-2xl mb-6 text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest px-2">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon/20 group-focus-within:text-maroon transition-colors" />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-cream-dark border border-maroon/5 rounded-2xl py-4 pl-12 pr-4 text-maroon placeholder:text-maroon/20 focus:outline-none focus:border-maroon/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest px-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon/20 group-focus-within:text-maroon transition-colors" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-cream-dark border border-maroon/5 rounded-2xl py-4 pl-12 pr-4 text-maroon placeholder:text-maroon/20 focus:outline-none focus:border-maroon/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest px-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon/20 group-focus-within:text-maroon transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Min 6 characters"
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
              {/* Password strength indicator */}
              {formData.password.length > 0 && (
                <div className="flex items-center gap-2 px-2 mt-1">
                  <div className="flex gap-1 flex-grow">
                    {[1,2,3].map(level => (
                      <div key={level} className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= level ? strengthColors[passwordStrength] : 'bg-maroon/10'}`} />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold ${passwordStrength === 1 ? 'text-red-400' : passwordStrength === 2 ? 'text-yellow-500' : 'text-emerald-500'}`}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full bg-maroon hover:bg-maroon-dark text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-maroon/20 flex items-center justify-center gap-3"
            >
              Create Account <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-maroon/5">
            <p className="text-center text-sm text-maroon/50">
              Already have an account? <button onClick={() => navigate('/login')} className="text-maroon font-bold hover:text-maroon-dark">Log in</button>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
