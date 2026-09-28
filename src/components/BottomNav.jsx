import { Home, MessageSquare, FileText, ShieldCheck, User, Bus } from 'lucide-react';

export default function BottomNav({ activeView, setActiveView }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 border-t border-gray-200 backdrop-blur-md py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        
        <button
          onClick={() => setActiveView('landing')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === 'landing' ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => setActiveView('chat')}
          className={`flex flex-col items-center gap-1 transition-colors relative ${
            activeView === 'chat' ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">AI Chat</span>
        </button>

        <button
          onClick={() => setActiveView('student')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === 'student' || activeView === 'tracking' ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px]">Requests</span>
        </button>

        <button
          onClick={() => setActiveView('admin')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === 'admin' ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px]">Staff Desk</span>
        </button>

        <button
          onClick={() => setActiveView('bus')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === 'bus' ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
          }`}
        >
          <Bus className="w-5 h-5 text-amber-500" />
          <span className="text-[10px]">Bus GPS</span>
        </button>

        <button
          onClick={() => setActiveView('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === 'profile' ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>

      </div>
    </div>
  );
}
