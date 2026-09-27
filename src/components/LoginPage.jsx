import React, { useState } from 'react';
import { 
  User, ShieldCheck, Lock, Mail, ArrowRight, 
  Eye, EyeOff, GraduationCap, Building, AlertCircle
} from 'lucide-react';
import { authService } from '../services/authService';
import OAuthAccountModal from './OAuthAccountModal';

export default function LoginPage({ initialAuthMode = 'login', onLoginSuccess, onCancel }) {
  const [authMode, setAuthMode] = useState(initialAuthMode); // 'login' | 'signup'
  const [role, setRole] = useState('student'); // 'student' | 'admin' | 'superadmin'
  const [fullName, setFullName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // OAuth Account Selection Modal State
  const [activeOAuthProvider, setActiveOAuthProvider] = useState(null);
  const [isOAuthModalOpen, setIsOAuthModalOpen] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setErrorMessage('');
    if (newRole === 'student') {
      setEmail('rahul.sharma@campus.edu');
      setFullName('Rahul Sharma');
      setRollNo('2024CS104');
      setPassword('password123');
    } else if (newRole === 'admin') {
      setEmail('warden.hostel@campus.edu');
      setFullName('Dr. V. K. Malhotra');
      setDepartment('Hostel Administration');
      setPassword('password123');
    } else {
      setEmail('admin.control@campus.edu');
      setFullName('System Admin');
      setDepartment('Central IT & Administration');
      setPassword('password123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      let authenticatedUser;
      if (authMode === 'login') {
        authenticatedUser = await authService.signIn({ email, password });
      } else {
        authenticatedUser = await authService.signUp({
          email,
          password,
          fullName: fullName || email.split('@')[0],
          role,
          rollNo: role === 'student' ? (rollNo || '2026CS101') : undefined,
          department: role === 'admin' ? (department || 'Hostel Administration') : undefined
        });
      }

      setIsLoading(false);
      onLoginSuccess(authenticatedUser);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleOpenOAuthModal = (provider) => {
    setActiveOAuthProvider(provider);
    setIsOAuthModalOpen(true);
  };

  const handleOAuthAccountChosen = (chosenAccount) => {
    setIsOAuthModalOpen(false);
    setIsLoading(true);

    const authenticatedUser = {
      id: `usr_oauth_${Date.now()}`,
      name: chosenAccount.name,
      email: chosenAccount.email,
      role: role,
      rollNo: role === 'student' ? '2024CS104' : undefined,
      department: role === 'admin' ? 'Hostel Administration' : undefined,
      provider: chosenAccount.provider
    };

    localStorage.setItem('campus_connect_current_session_user', JSON.stringify(authenticatedUser));

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(authenticatedUser);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B111E] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 relative overflow-hidden selection:bg-blue-500 selection:text-white transition-colors">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card Container */}
      <div className="w-full max-w-md bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-5 backdrop-blur-md transition-colors">
        
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
              onClick={() => { setAuthMode('login'); setErrorMessage(''); }}
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
              onClick={() => { setAuthMode('signup'); setErrorMessage(''); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign Up / Register
            </button>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight pt-1">
            {authMode === 'login' ? 'Sign in to Campus Connect' : 'Create Campus Account'}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            {authMode === 'login'
              ? 'Unified student query routing & college administration portal'
              : 'Register your college student or staff identity for real query routing'}
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

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

        {/* Login / Register Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">

          {/* Additional Sign Up Fields */}
          {authMode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-50 dark:bg-[#182338] border border-slate-300 dark:border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              </div>

              {role === 'student' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Student Roll Number
                  </label>
                  <input
                    type="text"
                    required
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g. 2024CS104"
                    className="w-full bg-slate-50 dark:bg-[#182338] border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              )}

              {role === 'admin' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Assigned Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#182338] border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="Hostel Administration">Hostel Administration & Warden</option>
                    <option value="Academic Office">Academic & Exam Branch</option>
                    <option value="Accounts & Finance">Accounts & Fee Section</option>
                    <option value="IT Support & ERP">IT Support & ERP Cell</option>
                    <option value="Library Services">Library Services</option>
                  </select>
                </div>
              )}
            </>
          )}
          
          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
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
                placeholder="user@campus.edu"
                className="w-full bg-slate-50 dark:bg-[#182338] border border-slate-300 dark:border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Password
              </label>
              {authMode === 'login' && (
                <span className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium">
                  Forgot password?
                </span>
              )}
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

        {/* Social Single Sign-On (SSO) Options */}
        <div className="space-y-3 pt-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-bold">
              <span className="bg-white dark:bg-[#121B2D] px-3 text-slate-500 dark:text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {/* Google Sign In */}
            <button
              type="button"
              onClick={() => handleOpenOAuthModal('google')}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white dark:bg-[#182338] hover:bg-slate-100 dark:hover:bg-[#1E2C46] border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all shadow-xs active:scale-98 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>

            {/* Apple Sign In */}
            <button
              type="button"
              onClick={() => handleOpenOAuthModal('apple')}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white dark:bg-[#182338] hover:bg-slate-100 dark:hover:bg-[#1E2C46] border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all shadow-xs active:scale-98 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-slate-900 dark:text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.82c.67-.82 1.13-1.97.99-3.12-1 .04-2.19.67-2.88 1.47-.62.72-1.16 1.89-.99 3.01 1.11.09 2.22-.54 2.88-1.36z"/>
              </svg>
              <span>Apple</span>
            </button>

            {/* Microsoft Sign In */}
            <button
              type="button"
              onClick={() => handleOpenOAuthModal('azure')}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white dark:bg-[#182338] hover:bg-slate-100 dark:hover:bg-[#1E2C46] border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all shadow-xs active:scale-98 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H1z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H1z"/>
              </svg>
              <span>Microsoft</span>
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

      {/* Interactive Account Selection Chooser Modal */}
      <OAuthAccountModal
        provider={activeOAuthProvider}
        isOpen={isOAuthModalOpen}
        onClose={() => setIsOAuthModalOpen(false)}
        onSelectAccount={handleOAuthAccountChosen}
      />

    </div>
  );
}
