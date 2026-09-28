import React from 'react';
import { 
  Sparkles, User, ShieldCheck, ArrowRight, LogIn, LogOut, 
  Menu, X, Bus, Star 
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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Star className="w-4 h-4 fill-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-gray-900 flex items-center gap-1.5">
              Stellar.ai <span className="text-xs font-normal text-gray-500">Campus Connect</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100 p-1.5 rounded-xl border border-gray-200">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === 'landing'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black hover:bg-gray-200/60'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setActiveView('chat')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'chat'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black hover:bg-gray-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>AI Chat Assistant</span>
            </button>

            <button
              onClick={() => setActiveView('student')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'student' || activeView === 'tracking'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black hover:bg-gray-200/60'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </button>

            <button
              onClick={() => setActiveView('admin')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black hover:bg-gray-200/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Staff Desks</span>
            </button>

            <button
              onClick={() => setActiveView('bus')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'bus'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black hover:bg-gray-200/60'
              }`}
            >
              <Bus className="w-3.5 h-3.5 text-amber-500" />
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
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 border border-gray-200 text-xs font-bold text-gray-800 hover:border-gray-400 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <span className="hidden sm:inline truncate max-w-[120px]">{currentUser.name}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-50 space-y-1">
                    <div className="px-3 py-2 border-b border-gray-100 text-xs">
                      <div className="font-bold text-gray-900">{currentUser.name}</div>
                      <div className="text-[11px] text-gray-500 truncate">{currentUser.email}</div>
                    </div>
                    <button
                      onClick={() => { setActiveView('profile'); setUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-blue-500" />
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
                  className="px-3.5 py-1.5 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-black" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => onOpenLogin('signup')}
                  className="px-3.5 py-1.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
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
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black hover:bg-gray-800 text-white font-medium text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {activeView === 'landing' ? 'Get started free' : 'New Query'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-black"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-gray-200 bg-white space-y-1">
          <button
            onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'landing' ? 'bg-black text-white' : 'text-gray-700'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => { setActiveView('chat'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'chat' ? 'bg-black text-white' : 'text-gray-700'
            }`}
          >
            AI Chat Assistant
          </button>

          <button
            onClick={() => { setActiveView('student'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'student' ? 'bg-black text-white' : 'text-gray-700'
            }`}
          >
            Student Portal
          </button>

          <button
            onClick={() => { setActiveView('admin'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'admin' ? 'bg-black text-white' : 'text-gray-700'
            }`}
          >
            Staff Desks
          </button>

          <button
            onClick={() => { setActiveView('bus'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'bus' ? 'bg-black text-white' : 'text-gray-700'
            }`}
          >
            Live Bus GPS Tracker
          </button>
        </div>
      )}
    </header>
  );
}
