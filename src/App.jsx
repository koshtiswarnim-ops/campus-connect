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
import BusTracker from './components/BusTracker';
import PrivacyPolicy from './components/PrivacyPolicy';
import { INITIAL_QUERIES } from './data/mockData';
import { authService } from './services/authService';
import { isRealSupabaseConfigured } from './services/supabaseClient';
import { ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.includes('privacy') || hash === '#privacy') {
      return 'privacy';
    }
    return 'landing';
  }); // 'landing' | 'chat' | 'student' | 'tracking' | 'admin' | 'bus' | 'login' | 'profile' | 'privacy'

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

  // Listen to browser navigation & popstate / hashchange events for /privacy
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('privacy') || hash === '#privacy') {
        setActiveView('privacy');
      } else if (path === '/' || path === '') {
        setActiveView(prev => (prev === 'privacy' ? 'landing' : prev));
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);


  // Set document title dynamically
  useEffect(() => {
    if (activeView === 'privacy') {
      document.title = "Campus Connect | Privacy Policy";
    } else {
      document.title = "Campus Connect — Smart Campus Communication & Service Platform";
    }
  }, [activeView]);

  // View Navigation Handler with RBAC Authorization Guard
  const handleViewChange = (targetView) => {
    if (targetView === 'privacy') {
      if (window.location.pathname !== '/privacy') {
        window.history.pushState({}, '', '/privacy');
      }
    } else {
      if (window.location.pathname === '/privacy') {
        window.history.pushState({}, '', '/');
      }
    }

    if (targetView === 'admin' || targetView.startsWith('admin-')) {
      const isAllowed = authService.isAuthorizedForView(currentUser, 'admin');
      if (!isAllowed) {
        setUnauthorizedNotice({
          title: "Staff & Admin Desk — Restricted Access",
          message: `Your current logged-in account role (${currentUser?.role || 'Guest'}) does not have Staff/Warden privileges. Please sign in with a Staff or Admin account to access the Administration Control Desk.`,
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
    <div className="min-h-screen bg-white text-gray-900 font-['Plus_Jakarta_Sans',sans-serif] pb-16 md:pb-0 transition-colors duration-200">
      
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
            onNavigateToModule={(mod) => handleViewChange(mod)}
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

        {(activeView === 'admin' || activeView.startsWith('admin-')) && (
          <AdminDashboard
            queries={queries}
            onUpdateTicketStatus={handleUpdateTicketStatus}
            onOpenBusTracker={() => handleViewChange('bus')}
            onSelectTicket={(ticket) => {
              setSelectedTicket(ticket);
              handleViewChange('tracking');
            }}
            currentUser={currentUser}
          />
        )}

        {activeView === 'bus' && (
          <BusTracker
            currentUser={currentUser}
            onBack={() => handleViewChange('landing')}
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

        {activeView === 'privacy' && (
          <PrivacyPolicy
            onBack={() => handleViewChange('landing')}
            onNavigateToModule={(mod) => handleViewChange(mod)}
          />
        )}
      </main>

      {/* Footer Navigation Bar */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-black text-white font-extrabold flex items-center justify-center text-[10px]">
              CC
            </div>
            <span className="font-bold text-black text-sm">Campus Connect</span>
            <span className="text-gray-400">| Smart Campus Communication Platform</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
            <button
              onClick={() => handleViewChange('landing')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button
              onClick={() => handleViewChange('student')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Student Portal
            </button>
            <button
              onClick={() => handleViewChange('bus')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Bus GPS
            </button>
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                handleViewChange('privacy');
              }}
              className="text-black underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Privacy Policy</span>
            </a>
          </div>

          <div className="text-gray-500 text-[11px]">
            © 2026 Campus Connect Inc. All rights reserved.
          </div>
        </div>
      </footer>

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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scaleIn text-gray-900">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-black tracking-tight">
                {unauthorizedNotice.title}
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                {unauthorizedNotice.message}
              </p>
            </div>

            <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs space-y-1 text-gray-700">
              <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-black" />
                <span>Authorization Role Matrix:</span>
              </div>
              <div className="text-[11px] text-gray-600">
                • Current Account: <span className="font-bold text-black uppercase">{currentUser?.role || 'Guest'}</span><br />
                • Required Role: <span className="font-bold text-black">Staff / Warden / SuperAdmin</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setUnauthorizedNotice(null);
                  handleOpenLoginView('login');
                }}
                className="w-full py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-xs shadow-md transition-colors cursor-pointer"
              >
                Sign In as Staff / Warden
              </button>
              <button
                onClick={() => setUnauthorizedNotice(null)}
                className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs transition-colors cursor-pointer border border-gray-200"
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
