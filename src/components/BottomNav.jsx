import React from 'react';
import { Home, MessageSquare, FileText, Bell, ShieldCheck } from 'lucide-react';

export default function BottomNav({ activeView, setActiveView }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0E1626]/95 border-t border-slate-800/80 backdrop-blur-md py-2 px-3">
      <div className="flex items-center justify-around">
        
        <button
          onClick={() => setActiveView('landing')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === 'landing' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => setActiveView('chat')}
          className={`flex flex-col items-center gap-1 transition-colors relative ${
            activeView === 'chat' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">AI Chat</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500 animate-ping" />
        </button>

        <button
          onClick={() => setActiveView('student')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === 'student' || activeView === 'tracking' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px]">My Requests</span>
        </button>

        <button
          onClick={() => setActiveView('admin')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === 'admin' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px]">Staff Desk</span>
        </button>

      </div>
    </div>
  );
}
