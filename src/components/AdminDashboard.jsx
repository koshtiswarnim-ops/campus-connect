import React, { useState } from 'react';
import { 
  Building, Wallet, GraduationCap, Stethoscope, Laptop, Bus, 
  ShieldCheck, CheckCircle2, Clock, AlertTriangle, Filter, 
  Search, MessageSquare, ChevronRight, User, RefreshCw, FileText, Lock, EyeOff
} from 'lucide-react';

export default function AdminDashboard({ 
  queries = [], 
  onUpdateTicketStatus, 
  onSelectTicket,
  currentUser,
  onOpenBusTracker
}) {
  // Staff Role / Department Active Filter tab
  const [activeStaffDept, setActiveStaffDept] = useState(
    currentUser?.department || 'Hostel Administration'
  );
  
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAnonymousOnly, setShowAnonymousOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Department metadata definition
  const staffDepartments = [
    { 
      id: 'Hostel Administration', 
      label: 'Hostel Warden & Manager Desk', 
      icon: Building, 
      color: 'bg-black text-white', 
      metrics: { primary: '94% Occupancy', secondary: '4 Maintenance Alerts', badge: 'Warden Portal' }
    },
    { 
      id: 'Accounts & Finance', 
      label: 'Fee Counter & Finance Desk', 
      icon: Wallet, 
      color: 'bg-black text-white', 
      metrics: { primary: '$1.4M Collected', secondary: '14 Pending Refunds', badge: 'Finance Portal' }
    },
    { 
      id: 'Academic Office', 
      label: 'Academic & Exam Branch Desk', 
      icon: GraduationCap, 
      color: 'bg-black text-white', 
      metrics: { primary: '4,200 Admit Cards', secondary: '32 Re-evaluations', badge: 'Exam Branch' }
    },
    { 
      id: 'Health Center', 
      label: 'Campus Health & Medical Desk', 
      icon: Stethoscope, 
      color: 'bg-black text-white', 
      metrics: { primary: '18 Appointments', secondary: 'Ambulance Ready', badge: 'Medical Center' }
    },
    { 
      id: 'IT Support & ERP', 
      label: 'Central IT & ERP Desk', 
      icon: Laptop, 
      color: 'bg-black text-white', 
      metrics: { primary: '99.98% Uptime', secondary: '42 Password Resets', badge: 'IT Control' }
    },
    { 
      id: 'Bus Transport', 
      label: 'Bus Fleet & Transport Admin', 
      icon: Bus, 
      color: 'bg-black text-white', 
      metrics: { primary: '100 Buses Active', secondary: 'Live GPS Live', badge: 'GPS Telemetry' }
    }
  ];

  const currentDeptMeta = staffDepartments.find(d => d.id === activeStaffDept) || staffDepartments[0];

  // Filter queries based on active staff department tab & status/search/anonymous
  const departmentQueries = queries.filter(q => {
    const matchesDept = q.department?.toLowerCase().includes(activeStaffDept.toLowerCase()) || 
                        activeStaffDept === 'All';
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    const matchesAnon = !showAnonymousOnly || q.isAnonymous;
    const matchesSearch = !searchTerm || 
      q.studentSays?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.studentName?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDept && matchesStatus && matchesAnon && matchesSearch;
  });

  const totalDeptCount = departmentQueries.length;
  const pendingCount = departmentQueries.filter(q => q.status !== 'Resolved').length;
  const resolvedCount = departmentQueries.filter(q => q.status === 'Resolved').length;
  const anonymousCount = queries.filter(q => q.isAnonymous).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-white text-gray-900 min-h-screen">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black">
            <ShieldCheck className="w-4 h-4 text-black" />
            <span>Multi-Department Staff Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mt-1">
            {currentDeptMeta.label}
          </h1>
        </div>

        {/* Quick Switch to Bus GPS Tracker */}
        <button
          onClick={onOpenBusTracker}
          className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Bus className="w-4 h-4 text-amber-400" />
          <span>Launch Bus GPS Live Map</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STAFF DEPARTMENT SWITCHER TABS                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-max">
          {staffDepartments.map(dept => {
            const Icon = dept.icon;
            const isActive = activeStaffDept === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setActiveStaffDept(dept.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${isActive ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{dept.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Specialized Department Metrics Banner */}
      <div className="bg-white border border-gray-200 text-gray-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-gray-500 block mb-1">
              Active Channel
            </span>
            <div className="text-xl font-bold text-black flex items-center gap-2">
              <span>{currentDeptMeta.id}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1 block">
              SLA Priority Queue System
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-gray-500 block mb-1">
              Department Key Metric
            </span>
            <div className="text-2xl font-extrabold text-black">
              {currentDeptMeta.metrics.primary}
            </div>
            <span className="text-xs text-gray-500 mt-1 block">
              {currentDeptMeta.metrics.secondary}
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-gray-500 block mb-1">
              Pending Tickets Queue
            </span>
            <div className="text-2xl font-extrabold text-amber-600">
              {pendingCount} Pending
            </div>
            <span className="text-xs text-gray-500 mt-1 block">
              Assigned to Warden & Staff
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-gray-500 block mb-1">
              Anonymous Submissions
            </span>
            <div className="text-2xl font-extrabold text-black flex items-center gap-1">
              <Lock className="w-5 h-5 text-amber-600" />
              <span>{anonymousCount} Protected</span>
            </div>
            <span className="text-xs text-gray-500 mt-1 block">
              Identity encrypted for privacy
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white border border-gray-200 p-4 rounded-2xl shadow-xs">
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Filter Status:</span>
          {['All', 'Submitted', 'Assigned', 'In Progress', 'Resolved'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}

          {/* Anonymous Only Staff Filter */}
          <button
            onClick={() => setShowAnonymousOnly(!showAnonymousOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              showAnonymousOnly
                ? 'bg-slate-900 text-white border-black shadow-sm'
                : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Anonymous Only</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search query or student..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black font-medium placeholder-gray-400"
          />
        </div>
      </div>

      {/* Tickets Queue Table */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Ticket ID & Student</th>
                <th className="px-6 py-4">Query Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Priority SLA</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Warden Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 font-medium text-gray-900">
              {departmentQueries.length > 0 ? (
                departmentQueries.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-black flex items-center gap-1.5">
                        <span>{t.id}</span>
                        {t.isAnonymous && (
                          <span className="bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-400" /> Anonymous
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                        {t.isAnonymous ? '🔒 Student Identity Restricted' : t.studentName}
                      </div>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <div 
                        onClick={() => onSelectTicket(t)}
                        className="font-bold text-black hover:underline line-clamp-1 cursor-pointer"
                      >
                        "{t.studentSays}"
                      </div>
                      <div className="text-[10px] text-gray-500">
                        Assigned: {t.assignedTo}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                      {t.category}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        t.priority === 'Urgent' ? 'bg-red-100 text-red-800 border border-red-200' :
                        t.priority === 'High' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        {t.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        t.status === 'In Progress' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {t.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-1">
                      <button
                        onClick={() => onUpdateTicketStatus(t.id, 'In Progress')}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold border border-amber-200 cursor-pointer"
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => onUpdateTicketStatus(t.id, 'Resolved')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 cursor-pointer"
                      >
                        Resolve
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">
                    No active tickets found for <strong className="text-black">{activeStaffDept}</strong> channel matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
