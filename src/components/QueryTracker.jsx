import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle, Clock, Building, User, Send, 
  Sparkles, ShieldCheck, AlertCircle, FileText, ChevronRight 
} from 'lucide-react';

export default function QueryTracker({ ticket, onBack, onUpdateTicketStatus, onAddReply }) {
  const [replyText, setReplyText] = useState('');

  if (!ticket) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        No ticket selected.
        <button onClick={onBack} className="block mx-auto mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddReply(ticket.id, {
      sender: "Rahul Sharma (Student)",
      text: replyText,
      time: "Just Now"
    });
    setReplyText('');
  };

  const steps = ["Submitted", "Assigned", "In Progress", "Resolved"];
  const currentStepIndex = steps.indexOf(ticket.status);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Queries</span>
        </button>
        <span className="text-xs font-mono px-3 py-1 bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-full font-bold">
          ID: {ticket.id}
        </span>
      </div>

      {/* Main Ticket Banner */}
      <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-bold mb-1">
              <span>{ticket.department}</span>
              <span>•</span>
              <span>{ticket.category}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              "{ticket.studentSays}"
            </h1>
          </div>

          {/* Quick Actions / Status Pill */}
          <div className="flex items-center gap-3">
            <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${
              ticket.status === 'Resolved' ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800' :
              ticket.status === 'In Progress' ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800' :
              ticket.status === 'Assigned' ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-800' :
              'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
            }`}>
              Status: {ticket.status}
            </span>
          </div>
        </div>

        {/* 4-Stage Visual Status Timeline Component */}
        <div className="pt-8 pb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
            Resolution Progress Timeline
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
            {steps.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div 
                  key={step}
                  className={`relative p-4 rounded-xl border transition-all ${
                    isCurrent 
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 shadow-md' 
                      : isCompleted 
                      ? 'bg-slate-50 dark:bg-[#162238] border-slate-200 dark:border-slate-700' 
                      : 'bg-slate-100/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/80 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className={`text-sm font-semibold ${isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                      {step}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    {step === 'Submitted' && 'Query raised & logged'}
                    {step === 'Assigned' && `Routed to ${ticket.assignedTo}`}
                    {step === 'In Progress' && 'Staff assigned & acting'}
                    {step === 'Resolved' && 'Resolution confirmed'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid Details & Discussion */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Log & Conversation */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Detailed Timeline Notes */}
          <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm transition-colors">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Activity Log & History
            </h3>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {ticket.timeline.map((item, index) => (
                <div key={index} className="flex gap-4 relative pl-8">
                  <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white dark:border-[#121B2D]" />
                  <div className="flex-1 bg-slate-50 dark:bg-[#182338] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-blue-600 dark:text-blue-400">{item.status}</span>
                      <span className="text-slate-500">{item.time}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation & Replies */}
          <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm transition-colors">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Official Messages & Discussion
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {ticket.replies && ticket.replies.map((reply, i) => (
                <div 
                  key={i} 
                  className={`p-3.5 rounded-xl border ${
                    reply.sender.includes("Student")
                      ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60 ml-6 text-right'
                      : 'bg-slate-50 dark:bg-[#182338] border-slate-200 dark:border-slate-800 mr-6'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold">
                    <span className="text-slate-900 dark:text-slate-300">{reply.sender}</span>
                    <span>{reply.time}</span>
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">{reply.text}</p>
                </div>
              ))}
            </div>

            {/* Send Reply Input */}
            <form onSubmit={handleSendReply} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type a message or note..."
                className="flex-1 bg-slate-50 dark:bg-[#182338] border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 placeholder-slate-400 dark:placeholder-slate-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Routing Metadata */}
        <div className="md:col-span-4 space-y-6">
          
          <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm transition-colors">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
              Routing Information
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Category</span>
                <span className="font-semibold text-slate-900 dark:text-white">{ticket.category}</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block">Department</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{ticket.department}</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block">Assigned Authority</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{ticket.assignedTo}</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block">Priority Level</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold mt-0.5 ${
                  ticket.priority === 'Urgent' ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800' :
                  ticket.priority === 'High' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800' :
                  'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}>
                  {ticket.priority}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Staff Actions Demo Panel */}
          <div className="bg-slate-100 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 transition-colors">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Demo Control (Simulate Staff Action)
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateTicketStatus(ticket.id, 'In Progress')}
                className="px-3 py-2 rounded-lg bg-amber-500/10 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 text-xs font-bold hover:bg-amber-500/20"
              >
                Mark In Progress
              </button>
              <button
                onClick={() => onUpdateTicketStatus(ticket.id, 'Resolved')}
                className="px-3 py-2 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-500/20"
              >
                Mark Resolved
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
