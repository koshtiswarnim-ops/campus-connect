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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-gray-900 min-h-screen">
      
      {/* Welcome & Stats Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-800 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Student Service Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black">
            How can we help you today?
          </h1>
          <p className="text-gray-600 text-sm max-w-xl">
            Describe your problem in plain language — Campus Connect understands intent, routes to the right department, and tracks your resolution.
          </p>
        </div>

        {/* Action Button & Quick Stats */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-center min-w-[90px]">
            <div className="text-2xl font-extrabold text-blue-600">{activeCount}</div>
            <div className="text-[10px] text-gray-500 font-semibold uppercase">Active Issues</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-center min-w-[90px]">
            <div className="text-2xl font-extrabold text-emerald-600">{resolvedCount}</div>
            <div className="text-[10px] text-gray-500 font-semibold uppercase">Resolved</div>
          </div>

          <button
            onClick={onOpenChat}
            className="px-5 py-3.5 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Open AI Chat Assistant</span>
          </button>
        </div>
      </div>

      {/* Query Search Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400 ml-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your queries by keyword, ID (e.g. CC-2026-10482), or department..."
          className="flex-1 bg-transparent text-gray-900 text-base focus:outline-none placeholder-gray-400 font-medium"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-xs text-gray-500 hover:text-black px-2">
            Clear
          </button>
        )}
      </div>

      {/* Quick Issue Categories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">Quick Issue Categories</h2>
          <span className="text-xs text-gray-500 font-medium">Click a category to filter requests</span>
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
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-white border-gray-200 hover:border-gray-400 hover:shadow-xs'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-gray-800 text-amber-400' : 'bg-gray-100 text-gray-800'
                }`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <div className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-gray-900'}`}>{service.name}</div>
                <div className={`text-xs mt-1 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>{service.count} resolved</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Queries List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">Your Submitted Queries</h2>
          <span className="text-xs text-gray-500 font-medium">Showing {filteredQueries.length} requests</span>
        </div>

        {filteredQueries.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-black">No queries found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your search filter or raise a new query using AI Chat.
            </p>
            <button
              onClick={onOpenChat}
              className="px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold shadow hover:bg-gray-800"
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
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-black shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-black bg-gray-100 px-2.5 py-0.5 rounded border border-gray-200">
                      {ticket.id}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{ticket.department}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{ticket.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 group-hover:text-black transition-colors">
                    "{ticket.studentSays}"
                  </h3>

                  <div className="text-xs text-gray-500 flex items-center gap-2 font-medium">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Assigned to: {ticket.assignedTo}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  {/* Status Badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    ticket.status === 'In Progress' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    ticket.status === 'Assigned' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {ticket.status}
                  </span>

                  <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-black text-gray-500 group-hover:text-white flex items-center justify-center transition-colors">
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
