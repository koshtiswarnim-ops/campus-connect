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
import HackathonDemoBar from './components/HackathonDemoBar';
import { INITIAL_QUERIES } from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'chat' | 'student' | 'tracking' | 'admin' | 'login'
  
  // Persistent Queries State with localStorage fallback
  const [queries, setQueries] = useState(() => {
    const saved = localStorage.getItem('campus_connect_queries');
    return saved ? JSON.parse(saved) : INITIAL_QUERIES;
  });

  const [selectedTicket, setSelectedTicket] = useState(queries[0]);
  
  // User Authentication State (default Student: Rahul Sharma)
  const [currentUser, setCurrentUser] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@campus.edu',
    role: 'student',
    rollNo: '2024CS104'
  });

  const [authMode, setAuthMode] = useState('login');
  
  // Smart Modal state
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
    if (userData.role === 'admin' || userData.role === 'superadmin') {
      setActiveView('admin');
    } else {
      setActiveView('student');
    }
  };

  const handleLogout = () => {
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
          { status: newStatus, time: timeNow, note: `Status updated to ${newStatus} by Administration (${currentUser?.name || 'Staff'})` }
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

  // 1-Click Live Hackathon Demo Workflow Runner
  const handleRunAutoDemo = () => {
    const demoTicket = {
      id: `CC-2026-10482`,
      title: "Hostel Administration · Hostel maintenance",
      studentSays: "There is a water problem in my hostel room 304, Block B.",
      category: "Hostel maintenance",
      department: "Hostel Administration",
      assignedTo: "Warden / Hostel Office (Mr. Ramesh Kumar)",
      priority: "Normal",
      status: "Submitted",
      isAnonymous: false,
      studentName: "Rahul Sharma (Roll: 2024CS104)",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        { status: "Submitted", time: "Just Now", note: "Request raised by Rahul Sharma. Intent: Hostel Water Leakage." },
        { status: "Assigned", time: "Just Now", note: "Smart-routed to Hostel Maintenance & Warden Office" }
      ],
      replies: [
        { sender: "System AI", text: "Query auto-categorized under Hostel Maintenance -> Water Issue. Assigned to Warden Office.", time: "Just Now" }
      ]
    };

    setQueries(prev => [demoTicket, ...prev.filter(q => q.id !== 'CC-2026-10482')]);
    setSelectedTicket(demoTicket);
    setActiveView('tracking');
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
        setActiveView={setActiveView}
        onOpenNewQuery={() => handleOpenQueryModal("I have a problem with my hostel room fan.")}
        currentUser={currentUser}
        onOpenLogin={handleOpenLoginView}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main>
        {activeView === 'landing' && (
          <LandingPage
            onGetStarted={() => setActiveView('chat')}
            onTryQuery={(preset) => handleOpenQueryModal(preset)}
            onOpenLogin={() => handleOpenLoginView('login')}
            onSelectTicket={(ticket) => {
              setSelectedTicket(ticket);
              setActiveView('tracking');
            }}
          />
        )}

        {activeView === 'chat' && (
          <StudentChat
            queries={queries}
            onCreateTicket={handleCreateTicket}
            onSelectTicket={(ticket) => {
              setSelectedTicket(ticket);
              setActiveView('tracking');
            }}
            currentUser={currentUser}
          />
        )}

        {activeView === 'student' && (
          <StudentDashboard
            queries={queries}
            onOpenNewQuery={() => handleOpenQueryModal("I have a problem with my hostel room fan.")}
            onOpenChat={() => setActiveView('chat')}
            onSelectTicket={(ticket) => {
              setSelectedTicket(ticket);
              setActiveView('tracking');
            }}
          />
        )}

        {activeView === 'tracking' && (
          <QueryTracker
            ticket={selectedTicket || queries[0]}
            onBack={() => setActiveView('student')}
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
              setActiveView('tracking');
            }}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Smart Query Creation Modal */}
      <SmartQueryModal
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
        onSubmitQuery={(ticket) => {
          handleCreateTicket(ticket);
          setActiveView('tracking');
        }}
        defaultText={modalDefaultText}
      />

    </div>
  );
}
