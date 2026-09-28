import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle, Clock, Building, User, Send, 
  Sparkles, ShieldCheck, AlertCircle, FileText, ChevronRight, Lock, EyeOff
} from 'lucide-react';

export default function QueryTracker({ ticket, onBack, onUpdateTicketStatus, onAddReply }) {
  const [replyText, setReplyText] = useState('');

  if (!ticket) {
    return (
      <div className="p-8 text-center text-gray-500">
        No ticket selected.
        <button onClick={onBack} className="block mx-auto mt-4 px-4 py-2 bg-black text-white rounded-lg">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddReply(ticket.id, {
      sender: ticket.isAnonymous ? "Anonymous Student" : "Rahul Sharma (Student)",
      text: replyText,
      time: "Just Now"
    });
    setReplyText('');
  };

  const steps = ["Submitted", "Assigned", "In Progress", "Resolved"];
  const currentStepIndex = steps.indexOf(ticket.status);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 bg-white text-gray-900 min-h-screen">
      
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Queries</span>
        </button>
        <div className="flex items-center gap-2">
          {ticket.isAnonymous && (
            <span className="text-xs px-3 py-1 bg-slate-900 text-white border border-black rounded-full font-bold flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-400" /> Anonymous Request
            </span>
          )}
          <span className="text-xs font-mono px-3 py-1 bg-gray-100 text-black border border-gray-200 rounded-full font-bold">
            ID: {ticket.id}
          </span>
        </div>
      </div>

      {/* Anonymous Identity Notice Banner */}
      {ticket.isAnonymous && (
        <div className="p-4 rounded-2xl bg-slate-900 text-white border border-black flex items-center gap-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-gray-800 text-amber-400 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🔒 Anonymous Request & Identity Protection Active</span>
            </h4>
            <p className="text-xs text-gray-300 mt-0.5">
              Your personal identity (Name, Student Roll No, Email) is encrypted and hidden from wardens and staff views. Staff can only see the issue details to resolve it.
            </p>
          </div>
        </div>
      )}

      {/* Main Ticket Banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-black font-bold mb-1">
              <span>{ticket.department}</span>
              <span>•</span>
              <span>{ticket.category}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-black">
              "{ticket.studentSays}"
            </h1>
          </div>

          {/* Quick Actions / Status Pill */}
          <div className="flex items-center gap-3">
            <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${
              ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
              ticket.status === 'In Progress' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
              ticket.status === 'Assigned' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
              'bg-gray-100 text-gray-800 border border-gray-200'
            }`}>
              Status: {ticket.status}
            </span>
          </div>
        </div>

        {/* 4-Stage Visual Status Timeline Component */}
        <div className="pt-8 pb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
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
                      ? 'bg-gray-100 border-black shadow-sm' 
                      : isCompleted 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-gray-50/50 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className={`text-sm font-semibold ${isCompleted ? 'text-black' : 'text-gray-500'}`}>
                      {step}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-500 mt-1 font-medium">
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
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-black flex items-center gap-2">
              <Clock className="w-4 h-4 text-black" />
              Activity Log & History
            </h3>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {ticket.timeline.map((item, index) => (
                <div key={index} className="flex gap-4 relative pl-8">
                  <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-black border-2 border-white" />
                  <div className="flex-1 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-black">{item.status}</span>
                      <span className="text-gray-500">{item.time}</span>
                    </div>
                    <p className="text-sm text-gray-800 font-medium">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation & Replies */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-black">
              Official Messages & Discussion
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {ticket.replies && ticket.replies.map((reply, i) => (
                <div 
                  key={i} 
                  className={`p-3.5 rounded-xl border ${
                    reply.sender.includes("Student") || reply.sender.includes("Anonymous")
                      ? 'bg-black text-white border-black ml-6 text-right'
                      : 'bg-gray-50 border-gray-200 text-gray-900 mr-6'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs opacity-75 mb-1 font-semibold">
                    <span>{reply.sender}</span>
                    <span>{reply.time}</span>
                  </div>
                  <p className="text-sm font-medium">{reply.text}</p>
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
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black placeholder-gray-400 font-medium"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-medium shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Interactive Feedback & Rating System (Shown when Resolved) */}
          {ticket.status === 'Resolved' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-3 shadow-xs animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-emerald-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Rate Resolution & Service Feedback</span>
                </h4>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  Query Completed
                </span>
              </div>
              <p className="text-xs text-emerald-900">
                How satisfied are you with the routing speed and resolution provided by {ticket.department}?
              </p>
              
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      alert(`Thank you for rating ${star} Stars! Your feedback has been submitted to ${ticket.department} Admin.`);
                    }}
                    className="p-2 rounded-xl bg-white border border-emerald-200 hover:border-amber-400 hover:bg-amber-50 text-amber-500 transition-all text-sm font-bold flex items-center gap-1 cursor-pointer"
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Routing Metadata */}
        <div className="md:col-span-4 space-y-6">
          
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-3">
              Routing Information
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-gray-500 block">Student Identity</span>
                <span className="font-semibold text-black">
                  {ticket.isAnonymous ? '🔒 Anonymous Student (Protected)' : (ticket.studentName || 'Rahul Sharma')}
                </span>
              </div>

              <div>
                <span className="text-xs text-gray-500 block">Category</span>
                <span className="font-semibold text-black">{ticket.category}</span>
              </div>

              <div>
                <span className="text-xs text-gray-500 block">Department</span>
                <span className="font-semibold text-black">{ticket.department}</span>
              </div>

              <div>
                <span className="text-xs text-gray-500 block">Assigned Authority</span>
                <span className="font-semibold text-gray-800">{ticket.assignedTo}</span>
              </div>

              <div>
                <span className="text-xs text-gray-500 block">Priority Level</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold mt-0.5 ${
                  ticket.priority === 'Urgent' ? 'bg-red-100 text-red-800 border border-red-200' :
                  ticket.priority === 'High' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {ticket.priority}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Staff Actions Demo Panel */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Demo Control (Simulate Staff Action)
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateTicketStatus(ticket.id, 'In Progress')}
                className="px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold hover:bg-amber-100 cursor-pointer"
              >
                Mark In Progress
              </button>
              <button
                onClick={() => onUpdateTicketStatus(ticket.id, 'Resolved')}
                className="px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold hover:bg-emerald-100 cursor-pointer"
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
