import React from 'react';
import { 
  Sparkles, User, ShieldCheck, ArrowRight, LogIn, LogOut, 
  Menu, X, Bus 
} from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  onOpenNewQuery,
  currentUser,
  onOpenLogin,
  onLogout 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10a6 6 0 0 0-12 0c0 7 3 9 6 11 3-2 6-4 6-11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-black flex items-center gap-1.5">
              Campus Connect
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'landing'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-600 hover:text-black hover:bg-slate-200/70'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setActiveView('chat')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'chat'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-600 hover:text-black hover:bg-slate-200/70'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${activeView === 'chat' ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>AI Chat Assistant</span>
            </button>

            <button
              onClick={() => setActiveView('student')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'student' || activeView === 'tracking'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-600 hover:text-black hover:bg-slate-200/70'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </button>

            <button
              onClick={() => setActiveView('admin')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-600 hover:text-black hover:bg-slate-200/70'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Staff Desks</span>
            </button>

            <button
              onClick={() => setActiveView('bus')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'bus'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-600 hover:text-black hover:bg-slate-200/70'
              }`}
            >
              <Bus className={`w-3.5 h-3.5 ${activeView === 'bus' ? 'text-amber-400' : 'text-amber-600'}`} />
              <span>Live Bus GPS</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3">
            {/* Logged In User Pill OR Sign In & Sign Up Buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-100 cursor-pointer shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <span className="hidden sm:inline truncate max-w-[120px]">{currentUser.name}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 space-y-1">
                    <div className="px-3 py-2 border-b border-slate-100 text-xs">
                      <div className="font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                    </div>
                    <button
                      onClick={() => { setActiveView('profile'); setUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-slate-600" />
                      <span>My Account Profile</span>
                    </button>
                    <button
                      onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenLogin('login')}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-700" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => onOpenLogin('signup')}
                  className="px-3.5 py-1.5 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Main CTA */}
            <button
              onClick={() => {
                if (activeView === 'landing') {
                  setActiveView('student');
                } else {
                  onOpenNewQuery();
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-slate-800 text-white font-medium text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {activeView === 'landing' ? 'Get started' : 'New Query'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-black hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-slate-200 bg-white space-y-1">
          <button
            onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'landing' ? 'bg-black text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => { setActiveView('chat'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'chat' ? 'bg-black text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            AI Chat Assistant
          </button>

          <button
            onClick={() => { setActiveView('student'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'student' ? 'bg-black text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Student Portal
          </button>

          <button
            onClick={() => { setActiveView('admin'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'admin' ? 'bg-black text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Staff Desks
          </button>

          <button
            onClick={() => { setActiveView('bus'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'bus' ? 'bg-black text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Live Bus GPS Tracker
          </button>
        </div>
      )}
    </header>
  );
}
