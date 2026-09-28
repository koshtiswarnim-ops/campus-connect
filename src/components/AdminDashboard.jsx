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
      color: 'bg-blue-500', 
      metrics: { primary: '94% Occupancy', secondary: '4 Maintenance Alerts', badge: 'Warden Portal' }
    },
    { 
      id: 'Accounts & Finance', 
      label: 'Fee Counter & Finance Desk', 
      icon: Wallet, 
      color: 'bg-emerald-500', 
      metrics: { primary: '$1.4M Collected', secondary: '14 Pending Refunds', badge: 'Finance Portal' }
    },
    { 
      id: 'Academic Office', 
      label: 'Academic & Exam Branch Desk', 
      icon: GraduationCap, 
      color: 'bg-purple-500', 
      metrics: { primary: '4,200 Admit Cards', secondary: '32 Re-evaluations', badge: 'Exam Branch' }
    },
    { 
      id: 'Health Center', 
      label: 'Campus Health & Medical Desk', 
      icon: Stethoscope, 
      color: 'bg-rose-500', 
      metrics: { primary: '18 Appointments', secondary: 'Ambulance Ready', badge: 'Medical Center' }
    },
    { 
      id: 'IT Support & ERP', 
      label: 'Central IT & ERP Desk', 
      icon: Laptop, 
      color: 'bg-indigo-500', 
      metrics: { primary: '99.98% Uptime', secondary: '42 Password Resets', badge: 'IT Control' }
    },
    { 
      id: 'Bus Transport', 
      label: 'Bus Fleet & Transport Admin', 
      icon: Bus, 
      color: 'bg-amber-500', 
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
          className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
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
                    ? 'bg-black text-white border-black shadow-lg scale-102'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black'
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
      <div className="bg-gray-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-gray-400 block mb-1">
              Active Channel
            </span>
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <span>{currentDeptMeta.id}</span>
            </div>
            <span className="text-xs text-gray-400 mt-1 block">
              SLA Priority Queue System
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-gray-400 block mb-1">
              Department Key Metric
            </span>
            <div className="text-2xl font-extrabold text-amber-400">
              {currentDeptMeta.metrics.primary}
            </div>
            <span className="text-xs text-gray-400 mt-1 block">
              {currentDeptMeta.metrics.secondary}
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-gray-400 block mb-1">
              Pending Tickets Queue
            </span>
            <div className="text-2xl font-extrabold text-blue-400">
              {pendingCount} Pending
            </div>
            <span className="text-xs text-gray-400 mt-1 block">
              Assigned to Warden & Staff
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-gray-400 block mb-1">
              Resolved SLA Rate
            </span>
            <div className="text-2xl font-extrabold text-emerald-400">
              {totalDeptCount > 0 ? Math.round((resolvedCount / totalDeptCount) * 100) : 100}%
            </div>
            <span className="text-xs text-gray-400 mt-1 block">
              {resolvedCount} Total Resolved
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 border border-gray-200 p-4 rounded-2xl">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Filter Status:</span>
          {['All', 'Submitted', 'Assigned', 'In Progress', 'Resolved'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:text-black'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search query or student..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black font-medium"
          />
        </div>
      </div>

      {/* Tickets Queue Table */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Ticket ID & Student</th>
                <th className="px-6 py-4">Query Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Priority SLA</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Warden Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {departmentQueries.length > 0 ? (
                departmentQueries.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{t.id}</div>
                      <div className="text-[11px] text-gray-500">{t.studentName}</div>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <div 
                        onClick={() => onSelectTicket(t)}
                        className="font-bold text-gray-900 hover:text-blue-600 line-clamp-1 cursor-pointer"
                      >
                        "{t.studentSays}"
                      </div>
                      <div className="text-[10px] text-gray-500">
                        Assigned: {t.assignedTo}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-700">
                      {t.category}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        t.priority === 'Urgent' ? 'bg-red-100 text-red-700 border border-red-200' :
                        t.priority === 'High' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {t.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                        t.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
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
                    No active tickets found for <strong className="text-gray-900">{activeStaffDept}</strong> channel matching your filters.
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
