import React, { useState } from 'react';
import { 
  User, ShieldCheck, Lock, Mail, ArrowRight, Sparkles, 
  Eye, EyeOff, CheckCircle2, GraduationCap, Building
} from 'lucide-react';

export default function LoginPage({ initialAuthMode = 'login', onLoginSuccess, onCancel }) {
  const [authMode, setAuthMode] = useState(initialAuthMode); // 'login' | 'signup'
  const [role, setRole] = useState('student'); // 'student' | 'admin' | 'superadmin'
  const [fullName, setFullName] = useState('Rahul Sharma');
  const [rollNo, setRollNo] = useState('2024CS104');
  const [email, setEmail] = useState('rahul.sharma@campus.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'student') {
      setEmail('rahul.sharma@campus.edu');
      setFullName('Rahul Sharma');
    } else if (newRole === 'admin') {
      setEmail('warden.hostel@campus.edu');
      setFullName('Dr. V. K. Malhotra');
    } else {
      setEmail('admin.control@campus.edu');
      setFullName('System Admin');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        role,
        email,
        name: fullName || (role === 'student' ? 'Rahul Sharma' : role === 'admin' ? 'Dr. V. K. Malhotra (Warden)' : 'Campus IT Admin'),
        rollNo: role === 'student' ? rollNo : undefined,
        department: role === 'admin' ? 'Hostel Administration' : undefined
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B111E] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 relative overflow-hidden selection:bg-blue-500 selection:text-white transition-colors">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card Container */}
      <div className="w-full max-w-md bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6 backdrop-blur-md transition-colors">
        
        {/* Brand Logo & Title Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 10a6 6 0 0 0-12 0c0 7 3 9 6 11 3-2 6-4 6-11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </div>

          {/* Sign In vs Sign Up Toggle */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign Up / Register
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight pt-1">
            {authMode === 'login' ? 'Sign in to Campus Connect' : 'Create Campus Account'}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            {authMode === 'login'
              ? 'Unified student query routing & college administration portal'
              : 'Register your college student or staff identity for smart routing'}
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => handleRoleChange('student')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'student'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'admin'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Staff / Warden</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('superadmin')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'superadmin'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              College Email / ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@campus.edu"
                className="w-full bg-slate-50 dark:bg-[#182338] border border-slate-300 dark:border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 dark:bg-[#182338] border border-slate-300 dark:border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <>
                <span>{authMode === 'login' ? 'Sign In to Portal' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick One-Click Hackathon Demo Login Box */}
        <div className="bg-slate-100 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800/90 rounded-2xl p-4 space-y-2.5 text-center">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Hackathon Quick Demo Credentials</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                onLoginSuccess({
                  role: 'student',
                  email: 'rahul.sharma@campus.edu',
                  name: 'Rahul Sharma',
                  rollNo: '2024CS104'
                });
              }}
              className="px-3 py-2 rounded-xl bg-white dark:bg-[#141F33] hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              🎓 Student Demo
            </button>

            <button
              type="button"
              onClick={() => {
                onLoginSuccess({
                  role: 'admin',
                  email: 'warden.hostel@campus.edu',
                  name: 'Dr. V. K. Malhotra (Warden)',
                  department: 'Hostel Administration'
                });
              }}
              className="px-3 py-2 rounded-xl bg-white dark:bg-[#141F33] hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              🏢 Staff / Warden Demo
            </button>
          </div>
        </div>

        {/* Cancel / Back Link */}
        {onCancel && (
          <div className="text-center pt-2">
            <button
              onClick={onCancel}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium cursor-pointer"
            >
              ← Return to Campus Connect Overview
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
