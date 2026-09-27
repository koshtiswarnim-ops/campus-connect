import React, { useState } from 'react';
import { 
  Building, Filter, CheckCircle, Clock, AlertTriangle, 
  UserCheck, Shield, ChevronRight, BarChart3, PieChart, RefreshCw
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';

export default function AdminDashboard({ queries, onUpdateTicketStatus, onSelectTicket }) {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  const filtered = queries.filter(q => {
    const matchDept = selectedDept === 'All' || q.department.toLowerCase().includes(selectedDept.toLowerCase());
    const matchStatus = selectedStatus === 'All' || q.status === selectedStatus;
    const matchPriority = selectedPriority === 'All' || q.priority === selectedPriority;
    return matchDept && matchStatus && matchPriority;
  });

  const totalCount = queries.length;
  const pendingCount = queries.filter(q => q.status === 'Submitted').length;
  const inProgressCount = queries.filter(q => q.status === 'In Progress').length;
  const resolvedCount = queries.filter(q => q.status === 'Resolved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Staff & Department Service Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Campus Operations Control Center
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Real-time incoming campus tickets, automated routing verification, & SLA status tracking.
          </p>
        </div>

        {/* Quick Demo Department Switcher */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white font-medium focus:outline-none shadow-xs"
          >
            <option value="All">All Campus Departments</option>
            {DEPARTMENTS.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Total Tickets</span>
            <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{totalCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Across all departments</div>
        </div>

        <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Pending Routing</span>
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">{pendingCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Requires staff action</div>
        </div>

        <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">In Progress</span>
            <RefreshCw className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{inProgressCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Under active repair/review</div>
        </div>

        <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Resolved Today</span>
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{resolvedCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Closed with student signoff</div>
        </div>

      </div>

      {/* Analytics & Queue Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Main Ticket Queue Table (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm transition-colors">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Incoming Query Queue ({filtered.length})
            </h2>

            <div className="flex items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-50 dark:bg-[#182338] border border-slate-200 dark:border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-semibold"
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="bg-slate-50 dark:bg-[#182338] border border-slate-200 dark:border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-semibold"
              >
                <option value="All">All Priorities</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Ticket List Table */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                No tickets match the selected filters.
              </div>
            ) : (
              filtered.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-slate-50 dark:bg-[#182338] border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-500/50 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{ticket.id}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-800 dark:text-slate-300 font-semibold">{ticket.department}</span>
                      <span className="text-slate-400">•</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ticket.priority === 'Urgent' ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400' :
                        ticket.priority === 'High' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400' :
                        'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      "{ticket.studentSays}"
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Assigned: <span className="text-slate-800 dark:text-slate-200 font-semibold">{ticket.assignedTo}</span>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectTicket(ticket)}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
                    >
                      View Logs
                    </button>

                    {ticket.status !== 'Resolved' ? (
                      <button
                        onClick={() => onUpdateTicketStatus(ticket.id, ticket.status === 'Submitted' ? 'In Progress' : 'Resolved')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-xs cursor-pointer ${
                          ticket.status === 'Submitted' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
                        }`}
                      >
                        {ticket.status === 'Submitted' ? 'Start Action' : 'Mark Resolved'}
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 text-xs font-bold">
                        Resolved
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* Right: Department Health & Analytics Breakdown (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm transition-colors">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Department Workload Breakdown
            </h3>

            <div className="space-y-3">
              {DEPARTMENTS.map((dept) => (
                <div key={dept.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-800 dark:text-slate-300 font-semibold truncate max-w-[180px]">{dept.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">{dept.activeTickets} tickets</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${Math.min(dept.activeTickets * 8, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium transition-colors">
            <div className="font-bold text-slate-900 dark:text-white text-sm">Automated SLA Guarantee</div>
            <p>
              Campus Connect auto-escalates unresolved Urgent hostel or IT tickets to Chief Warden / IT Director if SLA exceeds 24 hours.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
