import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import StudentChat from './components/StudentChat';
import QueryTracker from './components/QueryTracker';
import AdminDashboard from './components/AdminDashboard';
import SmartQueryModal from './components/SmartQueryModal';
import LoginPage from './components/LoginPage';
import BottomNav from './components/BottomNav';
import UserProfile from './components/UserProfile';
import { INITIAL_QUERIES } from './data/mockData';
import { authService } from './services/authService';
import { isRealSupabaseConfigured } from './services/supabaseClient';
import { ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'chat' | 'student' | 'tracking' | 'admin' | 'login'
  
  // Persistent Queries State with localStorage fallback
  const [queries, setQueries] = useState(() => {
    const saved = localStorage.getItem('campus_connect_queries');
    return saved ? JSON.parse(saved) : INITIAL_QUERIES;
  });

  const [selectedTicket, setSelectedTicket] = useState(queries[0]);
  
  // User Authentication State loaded via authService
  const [currentUser, setCurrentUser] = useState(() => authService.getActiveUser());
  const [authMode, setAuthMode] = useState('login');
  
  // Access Denied Modal state for RBAC guard
  const [unauthorizedNotice, setUnauthorizedNotice] = useState(null);

  // Smart Query Creation Modal state
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [modalDefaultText, setModalDefaultText] = useState("");

  // Sync queries to localStorage for persistence
  useEffect(() => {
    localStorage.setItem('campus_connect_queries', JSON.stringify(queries));
  }, [queries]);

  // Force dark class on html root element permanently
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // View Navigation Handler with RBAC Authorization Guard
  const handleViewChange = (targetView) => {
    if (targetView === 'admin') {
      const isAllowed = authService.isAuthorizedForView(currentUser, 'admin');
      if (!isAllowed) {
        setUnauthorizedNotice({
          title: "Staff & Admin Desk — Restricted Access",
          message: `Your current logged-in role (${currentUser?.role || 'Guest'}) does not have Warden/Staff privileges. Please sign in with a Staff or Admin account to access the Administration Desk.`,
          requiredRole: 'admin'
        });
        return;
      }
    }

    setActiveView(targetView);
  };

  const handleOpenQueryModal = (presetText = "") => {
    setModalDefaultText(presetText);
    setIsQueryModalOpen(true);
  };

  const handleCreateTicket = (newTicket) => {
    setQueries(prev => [newTicket, ...prev]);
    setSelectedTicket(newTicket);
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setUnauthorizedNotice(null);
    if (userData.role === 'admin' || userData.role === 'superadmin') {
      setActiveView('admin');
    } else {
      setActiveView('student');
    }
  };

  const handleLogout = async () => {
    await authService.signOut();
    setCurrentUser(null);
    setActiveView('landing');
  };

  const handleOpenLoginView = (mode = 'login') => {
    setAuthMode(mode);
    setActiveView('login');
  };

  const handleUpdateTicketStatus = (ticketId, newStatus) => {
    setQueries(prev => prev.map(q => {
      if (q.id === ticketId) {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedTimeline = [
          ...q.timeline,
          { status: newStatus, time: timeNow, note: `Status updated to ${newStatus} by ${currentUser?.name || 'Staff'}` }
        ];
        return {
          ...q,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          timeline: updatedTimeline
        };
      }
      return q;
    }));

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(prev => ({
        ...prev,
        status: newStatus,
        timeline: [
          ...prev.timeline,
          { status: newStatus, time: "Just Now", note: `Status updated to ${newStatus} by Staff` }
        ]
      }));
    }
  };

  const handleAddReply = (ticketId, replyObj) => {
    setQueries(prev => prev.map(q => {
      if (q.id === ticketId) {
        return {
          ...q,
          replies: [...(q.replies || []), replyObj]
        };
      }
      return q;
    }));

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(prev => ({
        ...prev,
        replies: [...(prev.replies || []), replyObj]
      }));
    }
  };

  if (activeView === 'login') {
    return (
      <LoginPage
        initialAuthMode={authMode}
        onLoginSuccess={handleLoginSuccess}
        onCancel={() => setActiveView('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0B111E] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] pb-16 md:pb-0 transition-colors duration-200">
      
      {/* Navbar Header */}
      <Navbar
        activeView={activeView}
        setActiveView={handleViewChange}
        onOpenNewQuery={() => handleOpenQueryModal("I have a problem with my hostel room fan.")}
        currentUser={currentUser}
        onOpenLogin={handleOpenLoginView}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main>
        {activeView === 'landing' && (
          <LandingPage
            onGetStarted={() => handleViewChange('chat')}
            onTryQuery={(preset) => handleOpenQueryModal(preset)}
            onOpenLogin={() => handleOpenLoginView('login')}
            onSelectTicket={(ticket) => {
              setSelectedTicket(ticket);
              handleViewChange('tracking');
            }}
          />
        )}

        {activeView === 'chat' && (
          <StudentChat
            queries={queries}
            onCreateTicket={handleCreateTicket}
            onSelectTicket={(ticket) => {
              setSelectedTicket(ticket);
              handleViewChange('tracking');
            }}
            currentUser={currentUser}
          />
        )}

        {activeView === 'student' && (
          <StudentDashboard
            queries={queries}
            onOpenNewQuery={() => handleOpenQueryModal("I have a problem with my hostel room fan.")}
            onOpenChat={() => handleViewChange('chat')}
            onSelectTicket={(ticket) => {
              setSelectedTicket(ticket);
              handleViewChange('tracking');
            }}
          />
        )}

        {activeView === 'tracking' && (
          <QueryTracker
            ticket={selectedTicket || queries[0]}
            onBack={() => handleViewChange('student')}
            onUpdateTicketStatus={handleUpdateTicketStatus}
            onAddReply={handleAddReply}
          />
        )}

        {activeView === 'admin' && (
          <AdminDashboard
            queries={queries}
            onUpdateTicketStatus={handleUpdateTicketStatus}
            onSelectTicket={(ticket) => {
              setSelectedTicket(ticket);
              handleViewChange('tracking');
            }}
          />
        )}

        {activeView === 'profile' && (
          <UserProfile
            currentUser={currentUser}
            queries={queries}
            onUpdateUser={(updatedUser) => {
              setCurrentUser(updatedUser);
              localStorage.setItem('campus_connect_current_session_user', JSON.stringify(updatedUser));
            }}
            onLogout={handleLogout}
            onBack={() => handleViewChange('student')}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeView={activeView}
        setActiveView={handleViewChange}
      />

      {/* Smart Query Creation Modal */}
      <SmartQueryModal
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
        onSubmitQuery={(ticket) => {
          handleCreateTicket(ticket);
          handleViewChange('tracking');
        }}
        defaultText={modalDefaultText}
      />

      {/* Role-Based Authorization Guard Modal */}
      {unauthorizedNotice && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2D] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scaleIn">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {unauthorizedNotice.title}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {unauthorizedNotice.message}
              </p>
            </div>

            <div className="p-3 bg-[#0E1626] border border-slate-800 rounded-xl text-xs space-y-1 text-slate-300">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Authorization Role Matrix:</span>
              </div>
              <div className="text-[11px] text-slate-400">
                • Current Account: <span className="font-bold text-amber-400 uppercase">{currentUser?.role || 'Guest'}</span><br />
                • Required Role: <span className="font-bold text-blue-400">Staff / Warden / SuperAdmin</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setUnauthorizedNotice(null);
                  handleOpenLoginView('login');
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-colors"
              >
                Sign In as Staff / Warden
              </button>
              <button
                onClick={() => setUnauthorizedNotice(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
              >
                Continue as Student
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
