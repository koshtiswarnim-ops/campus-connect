import React from 'react';
import { Play, User, ShieldCheck, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HackathonDemoBar({ 
  activeView, 
  setActiveView, 
  currentUser, 
  setCurrentUser,
  onRunAutoDemo 
}) {
  return (
    <div className="bg-slate-900 dark:bg-[#090E1A] text-white border-b border-slate-800 dark:border-blue-900/40 text-xs py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left Badge */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-slate-100 flex items-center gap-1">
            ⚡ HACKATHON DEMO CONTROL BAR:
          </span>
          <span className="text-slate-400 hidden md:inline">
            Test shared state workflow between Student & Staff
          </span>
        </div>

        {/* Center / Right Quick Trigger Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Demo Workflow Runner */}
          <button
            onClick={onRunAutoDemo}
            className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all shadow flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>1-Click Live Demo: Hostel Water Issue</span>
          </button>

          {/* Quick Role Switchers */}
          <div className="flex items-center bg-slate-800 dark:bg-[#121B2D] border border-slate-700 dark:border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => {
                setCurrentUser({
                  name: 'Rahul Sharma',
                  email: 'rahul.sharma@campus.edu',
                  role: 'student',
                  rollNo: '2024CS104'
                });
                setActiveView('student');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                currentUser?.role === 'student' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎓 Student
            </button>

            <button
              onClick={() => {
                setCurrentUser({
                  name: 'Dr. V. K. Malhotra (Warden)',
                  email: 'hostel.admin@campus.edu',
                  role: 'admin',
                  department: 'Hostel Administration'
                });
                setActiveView('admin');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                currentUser?.role === 'admin' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏢 Staff / Warden
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
