import React, { useState } from 'react';
import { 
  Building, Wallet, GraduationCap, Stethoscope, Laptop, Bus, 
  ShieldCheck, CheckCircle2, Clock, AlertTriangle, Filter, 
  Search, MessageSquare, ChevronRight, User, RefreshCw, FileText
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
  const [searchTerm, setSearchTerm] = useState('');

  // Department metadata definition
  const staffDepartments = [
    { 
      id: 'Hostel Administration', 
      label: 'Hostel Warden & Manager Desk', 
      icon: Building, 
      color: 'bg-blue-600', 
      metrics: { primary: '94% Occupancy', secondary: '4 Maintenance Alerts', badge: 'Warden Portal' }
    },
    { 
      id: 'Accounts & Finance', 
      label: 'Fee Counter & Finance Desk', 
      icon: Wallet, 
      color: 'bg-emerald-600', 
      metrics: { primary: '$1.4M Collected', secondary: '14 Pending Refunds', badge: 'Finance Portal' }
    },
    { 
      id: 'Academic Office', 
      label: 'Academic & Exam Branch Desk', 
      icon: GraduationCap, 
      color: 'bg-purple-600', 
      metrics: { primary: '4,200 Admit Cards', secondary: '32 Re-evaluations', badge: 'Exam Branch' }
    },
    { 
      id: 'Health Center', 
      label: 'Campus Health & Medical Desk', 
      icon: Stethoscope, 
      color: 'bg-rose-600', 
      metrics: { primary: '18 Appointments', secondary: 'Ambulance Ready', badge: 'Medical Center' }
    },
    { 
      id: 'IT Support & ERP', 
      label: 'Central IT & ERP Desk', 
      icon: Laptop, 
      color: 'bg-indigo-600', 
      metrics: { primary: '99.98% Uptime', secondary: '42 Password Resets', badge: 'IT Control' }
    },
    { 
      id: 'Bus Transport', 
      label: 'Bus Fleet & Transport Admin', 
      icon: Bus, 
      color: 'bg-amber-600', 
      metrics: { primary: '3 Buses Active', secondary: 'Live GPS Live', badge: 'GPS Telemetry' }
    }
  ];

  const currentDeptMeta = staffDepartments.find(d => d.id === activeStaffDept) || staffDepartments[0];

  // Filter queries based on active staff department tab & status/search
  const departmentQueries = queries.filter(q => {
    const matchesDept = q.department?.toLowerCase().includes(activeStaffDept.toLowerCase()) || 
                        activeStaffDept === 'All';
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    const matchesSearch = !searchTerm || 
      q.studentSays?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.studentName?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDept && matchesStatus && matchesSearch;
  });

  const totalDeptCount = departmentQueries.length;
  const pendingCount = departmentQueries.filter(q => q.status !== 'Resolved').length;
  const resolvedCount = departmentQueries.filter(q => q.status === 'Resolved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-[#0B111E] text-slate-100 min-h-screen">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Multi-Department Staff Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            {currentDeptMeta.label}
          </h1>
        </div>

        {/* Quick Switch to Bus GPS Tracker */}
        <button
          onClick={onOpenBusTracker}
          className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Bus className="w-4 h-4 text-amber-400" />
          <span>Launch Bus GPS Live Map</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STAFF DEPARTMENT SWITCHER TABS                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
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
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg scale-102'
                    : 'bg-[#121B2D] text-slate-400 border-slate-800 hover:bg-[#1A263E] hover:text-white'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-white ${dept.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{dept.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Specialized Department Metrics Banner */}
      <div className="bg-[#121B2D] border border-slate-800 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-1">
              Active Channel
            </span>
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <span>{currentDeptMeta.id}</span>
            </div>
            <span className="text-xs text-slate-400 mt-1 block">
              SLA Priority Queue System
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-1">
              Department Key Metric
            </span>
            <div className="text-2xl font-extrabold text-amber-400">
              {currentDeptMeta.metrics.primary}
            </div>
            <span className="text-xs text-slate-400 mt-1 block">
              {currentDeptMeta.metrics.secondary}
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-1">
              Pending Tickets Queue
            </span>
            <div className="text-2xl font-extrabold text-blue-400">
              {pendingCount} Pending
            </div>
            <span className="text-xs text-slate-400 mt-1 block">
              Assigned to Warden & Staff
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-1">
              Resolved SLA Rate
            </span>
            <div className="text-2xl font-extrabold text-emerald-400">
              {totalDeptCount > 0 ? Math.round((resolvedCount / totalDeptCount) * 100) : 100}%
            </div>
            <span className="text-xs text-slate-400 mt-1 block">
              {resolvedCount} Total Resolved
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121B2D] border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Filter Status:</span>
          {['All', 'Submitted', 'Assigned', 'In Progress', 'Resolved'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-[#0E1626] text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search query or student..."
            className="w-full bg-[#182338] border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium placeholder-slate-400"
          />
        </div>
      </div>

      {/* Tickets Queue Table */}
      <div className="bg-[#121B2D] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0E1626] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Ticket ID & Student</th>
                <th className="px-6 py-4">Query Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Priority SLA</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Warden Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80 font-medium text-slate-200">
              {departmentQueries.length > 0 ? (
                departmentQueries.map(t => (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-white">{t.id}</div>
                      <div className="text-[11px] text-slate-400">{t.studentName}</div>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <div 
                        onClick={() => onSelectTicket(t)}
                        className="font-bold text-white hover:text-blue-400 line-clamp-1 cursor-pointer"
                      >
                        "{t.studentSays}"
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Assigned: {t.assignedTo}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-300">
                      {t.category}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        t.priority === 'Urgent' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        t.priority === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {t.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        t.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        t.status === 'In Progress' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {t.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-1">
                      <button
                        onClick={() => onUpdateTicketStatus(t.id, 'In Progress')}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 cursor-pointer"
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => onUpdateTicketStatus(t.id, 'Resolved')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 cursor-pointer"
                      >
                        Resolve
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                    No active tickets found for <strong className="text-white">{activeStaffDept}</strong> channel matching your filters.
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
