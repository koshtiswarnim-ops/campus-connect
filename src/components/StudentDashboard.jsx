import React, { useState } from 'react';
import { 
  Plus, Search, Building, Wifi, FileText, CreditCard, 
  GraduationCap, BookOpen, Bus, Briefcase, HeartHandshake,
  Clock, CheckCircle, AlertCircle, ArrowRight, Bell, Sparkles
} from 'lucide-react';
import { CAMPUS_SERVICES } from '../data/mockData';

const ICON_MAP = {
  Building, FileText, CreditCard, GraduationCap, Wifi, BookOpen, Bus, Briefcase, HeartHandshake
};

export default function StudentDashboard({ 
  queries, 
  onOpenNewQuery, 
  onSelectTicket, 
  onOpenChat 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredQueries = queries.filter(q => {
    const matchesSearch = q.studentSays.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || q.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const activeCount = queries.filter(q => q.status !== 'Resolved').length;
  const resolvedCount = queries.filter(q => q.status === 'Resolved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome & Stats Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-colors">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 text-xs text-blue-700 dark:text-blue-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Service Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            How can we help you today?
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
            Describe your problem in plain language — Campus Connect understands intent, routes to the right department, and tracks your resolution.
          </p>
        </div>

        {/* Action Button & Quick Stats */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="bg-slate-50 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-center min-w-[90px]">
            <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{activeCount}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">Active Issues</div>
          </div>
          <div className="bg-slate-50 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-center min-w-[90px]">
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{resolvedCount}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">Resolved</div>
          </div>

          <button
            onClick={onOpenChat}
            className="px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-100" />
            <span>Open AI Chat Assistant</span>
          </button>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Query Search Bar */}
      <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center gap-3 transition-colors">
        <Search className="w-5 h-5 text-slate-400 ml-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your queries by keyword, ID (e.g. CC-2026-10482), or department..."
          className="flex-1 bg-transparent text-slate-900 dark:text-white text-base focus:outline-none placeholder-slate-400 dark:placeholder-slate-500"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white px-2">
            Clear
          </button>
        )}
      </div>

      {/* Quick Issue Categories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quick Issue Categories</h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Click a category to filter requests</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CAMPUS_SERVICES.slice(0, 5).map((service) => {
            const IconComp = ICON_MAP[service.icon] || Building;
            const isSelected = selectedCategory === service.name;

            return (
              <div
                key={service.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? 'All' : service.name);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 shadow-md'
                    : 'bg-white dark:bg-[#121B2D] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{service.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{service.count} resolved</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Queries List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Submitted Queries</h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Showing {filteredQueries.length} requests</span>
        </div>

        {filteredQueries.length === 0 ? (
          <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">No queries found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Try adjusting your search filter or raise a new query using AI Chat.
            </p>
            <button
              onClick={onOpenChat}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow"
            >
              Open AI Chat Assistant
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQueries.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 hover:border-blue-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                      {ticket.id}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{ticket.department}</span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{ticket.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    "{ticket.studentSays}"
                  </h3>

                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>Assigned to: {ticket.assignedTo}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  {/* Status Badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    ticket.status === 'Resolved' ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800' :
                    ticket.status === 'In Progress' ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800' :
                    ticket.status === 'Assigned' ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-800' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                  }`}>
                    {ticket.status}
                  </span>

                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800/80 group-hover:bg-blue-600 text-slate-500 dark:text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
