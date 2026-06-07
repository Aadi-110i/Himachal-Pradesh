import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Github, Chrome, ChevronLeft, Sparkles, ShieldCheck } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-maroon/20 blur-[120px]" />
         <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-orange-200/30 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(107,76,76,0.15)] flex flex-col md:flex-row overflow-hidden relative z-10"
      >
        {/* Left Side: Visual/Brand */}
        <div className="w-full md:w-5/12 bg-maroon p-12 text-white flex flex-col justify-between relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute bottom-10 left-[-20%] w-64 h-64 border-[30px] border-white rounded-full" />
              <div className="absolute top-[-10%] right-[-20%] w-80 h-80 border-[1px] border-white/20 rounded-full" />
           </div>

           <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
           >
             <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Back to Sanctum</span>
           </button>

           <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                 <ShieldCheck className="w-6 h-6 text-orange-200" />
              </div>
              <h2 className="text-4xl font-serif mb-4 leading-tight">Join the <br /> <span className="italic opacity-60">Guardians.</span></h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Create an account to contribute to the preservation of Devbhumi's sacred heritage and unlock exclusive content.
              </p>
           </div>

           <div className="flex items-center gap-4 text-white/30">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Himachal Heritage © 2026</span>
           </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-grow p-12 md:p-20 bg-white">
           <div className="max-w-sm mx-auto">
              <div className="mb-10 text-center md:text-left">
                 <h3 className="text-2xl font-serif text-maroon mb-2">Create your account</h3>
                 <p className="text-sm text-gray-400">Already a guardian? <button onClick={() => navigate('/login')} className="text-maroon font-bold hover:underline">Log in instead</button></p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative group">
                       <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-maroon transition-colors" />
                       <input 
                        type="text" 
                        placeholder="Tenzin Gyatso"
                        className="w-full bg-cream rounded-2xl py-3.5 pl-12 pr-6 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none"
                       />
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative group">
                       <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-maroon transition-colors" />
                       <input 
                        type="email" 
                        placeholder="monk@devbhumi.com"
                        className="w-full bg-cream rounded-2xl py-3.5 pl-12 pr-6 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none"
                       />
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                    <div className="relative group">
                       <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-maroon transition-colors" />
                       <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-cream rounded-2xl py-3.5 pl-12 pr-6 text-sm border-2 border-transparent focus:bg-white focus:border-maroon/10 focus:ring-0 transition-all outline-none"
                       />
                    </div>
                 </div>

                 <div className="flex items-start gap-3 px-1 pt-1 pb-4">
                    <input type="checkbox" className="mt-1 rounded border-gray-200 text-maroon focus:ring-maroon/20 cursor-pointer" />
                    <p className="text-[9px] text-gray-400 leading-relaxed uppercase tracking-tight">
                       I agree to the <span className="text-maroon font-bold">Terms</span> and <span className="text-maroon font-bold">Privacy Policy</span>.
                    </p>
                 </div>

                 <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-maroon text-white py-4.5 rounded-full font-bold text-sm shadow-xl shadow-maroon/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
                 >
                   Become a Guardian
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                 <div className="flex-grow h-px bg-gray-100" />
                 <span className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">Quick Signup</span>
                 <div className="flex-grow h-px bg-gray-100" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <button className="flex items-center justify-center gap-3 py-3.5 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 hover:border-gray-100 transition-all group">
                    <Chrome className="w-4 h-4 text-gray-400 group-hover:text-maroon transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-maroon">Google</span>
                 </button>
                 <button className="flex items-center justify-center gap-3 py-3.5 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 hover:border-gray-100 transition-all group">
                    <Github className="w-4 h-4 text-gray-400 group-hover:text-maroon transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-maroon">Github</span>
                 </button>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
