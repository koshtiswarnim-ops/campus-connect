import { Home, MessageSquare, FileText, ShieldCheck, User, Bus } from 'lucide-react';

export default function BottomNav({ activeView, setActiveView }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0E1626]/95 border-t border-slate-800/80 backdrop-blur-md py-2 px-3 shadow-lg">
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
        </button>

        <button
          onClick={() => setActiveView('student')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === 'student' || activeView === 'tracking' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px]">Requests</span>
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

        <button
          onClick={() => setActiveView('bus')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === 'bus' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bus className="w-5 h-5 text-amber-400" />
          <span className="text-[10px]">Bus GPS</span>
        </button>

        <button
          onClick={() => setActiveView('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === 'profile' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>

      </div>
    </div>
  );
}
