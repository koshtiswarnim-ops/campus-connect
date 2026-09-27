import React, { useState } from 'react';
import { MessageSquare, Sparkles, Building, CheckCircle, ArrowDown, RefreshCw, ExternalLink } from 'lucide-react';
import { classifyQuery } from '../utils/aiClassifier';

const DEMO_PRESETS = [
  "There is a water problem in my hostel.",
  "I have a problem with my hostel room fan.",
  "Cannot connect to Wi-Fi in Central Library.",
  "Grade sheet discrepancy for CS302 Semester 5."
];

export default function HeroDemoCard({ onTryQuery, onSelectTicket }) {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentPrompt = DEMO_PRESETS[selectedPromptIndex];
  const classified = classifyQuery(currentPrompt);

  const triggerAnimation = (newIndex) => {
    setSelectedPromptIndex(newIndex);
    setIsAnimating(true);
    setActiveStep(1);
    
    setTimeout(() => setActiveStep(2), 500);
    setTimeout(() => setActiveStep(3), 1000);
    setTimeout(() => {
      setActiveStep(4);
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <div className="w-full bg-white dark:bg-[#11192A] border border-slate-200 dark:border-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-xl dark:shadow-2xl relative overflow-hidden backdrop-blur-md transition-colors">
      {/* Decorative ambient glow behind card */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Preset Selector Header */}
      <div className="flex items-center justify-between mb-3 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">TRY DEMO PROMPTS:</span>
        <button
          onClick={() => triggerAnimation((selectedPromptIndex + 1) % DEMO_PRESETS.length)}
          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer font-medium"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
          <span>Next Sample</span>
        </button>
      </div>

      {/* Interactive Quick Presets Chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {DEMO_PRESETS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => triggerAnimation(idx)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              selectedPromptIndex === idx
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            Sample {idx + 1}
          </button>
        ))}
      </div>

      {/* Student Input Quote Box */}
      <div 
        onClick={() => onTryQuery(currentPrompt)}
        className="bg-slate-50 dark:bg-[#182338] border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-5 shadow-inner cursor-pointer hover:border-blue-500/50 transition-colors group"
      >
        <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-1">
          <span>STUDENT SAYS</span>
          <span className="text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-[10px] lowercase">click to test AI classifier →</span>
        </div>
        <div className="text-slate-900 dark:text-white font-semibold text-base sm:text-lg">
          "{currentPrompt}"
        </div>
      </div>

      {/* Interactive Step Timeline */}
      <div className="space-y-3 mb-6">
        
        {/* Step 1 */}
        <div 
          onClick={() => onTryQuery(currentPrompt)}
          className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
            activeStep >= 1 ? 'bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700' : 'opacity-40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Student describes the problem
            </span>
          </div>
          <ArrowDown className={`w-4 h-4 text-slate-400 dark:text-slate-600 ${activeStep === 1 ? 'animate-bounce text-blue-600 dark:text-blue-400' : ''}`} />
        </div>

        {/* Step 2 */}
        <div 
          onClick={() => onTryQuery(currentPrompt)}
          className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
            activeStep >= 2 ? 'bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700' : 'opacity-40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Campus Connect understands it
            </span>
          </div>
          <ArrowDown className={`w-4 h-4 text-slate-400 dark:text-slate-600 ${activeStep === 2 ? 'animate-bounce text-blue-600 dark:text-blue-400' : ''}`} />
        </div>

        {/* Step 3 */}
        <div 
          onClick={() => onTryQuery(currentPrompt)}
          className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
            activeStep >= 3 ? 'bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700' : 'opacity-40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-600/20 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Routed to the right department
            </span>
          </div>
          <ArrowDown className={`w-4 h-4 text-slate-400 dark:text-slate-600 ${activeStep === 3 ? 'animate-bounce text-blue-600 dark:text-blue-400' : ''}`} />
        </div>

        {/* Step 4 */}
        <div 
          onClick={() => onTryQuery(currentPrompt)}
          className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
            activeStep >= 4 ? 'bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700' : 'opacity-40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Tracked to resolution
            </span>
          </div>
        </div>

      </div>

      {/* Ticket Preview Result Card */}
      <div 
        onClick={() => {
          if (onSelectTicket) {
            onSelectTicket({
              id: "CC-2026-10482",
              title: `${classified.department} · ${classified.category}`,
              studentSays: currentPrompt,
              category: classified.category,
              department: classified.department,
              assignedTo: classified.assignedTo,
              priority: "Normal",
              status: "Resolved",
              timeline: [
                { status: "Submitted", time: "Sep 26, 02:32 PM", note: "Request raised by Rahul Sharma" },
                { status: "Assigned", time: "Sep 26, 02:35 PM", note: `Smart-routed to ${classified.department}` },
                { status: "In Progress", time: "Sep 26, 04:10 PM", note: "Maintenance team dispatched" },
                { status: "Resolved", time: "Sep 27, 09:15 AM", note: "Issue inspected & fixed." }
              ],
              replies: [
                { sender: "System", text: `Query auto-categorized under ${classified.category}.`, time: "Sep 26, 02:32 PM" }
              ]
            });
          }
        }}
        className="bg-slate-100 dark:bg-[#0D1525] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-sm hover:border-blue-500/60 transition-all cursor-pointer group"
      >
        <div>
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold mb-0.5 flex items-center gap-1">
            <span>CC-2026-10482</span>
            <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            {classified.department} · {classified.category}
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/50">
          Resolved
        </span>
      </div>

    </div>
  );
}
