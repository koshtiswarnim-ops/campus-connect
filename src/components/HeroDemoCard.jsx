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
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-lg relative overflow-hidden transition-colors">
      
      {/* Preset Selector Header */}
      <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
        <span className="font-semibold text-slate-800 uppercase tracking-wider">TRY DEMO PROMPTS:</span>
        <button
          onClick={() => triggerAnimation((selectedPromptIndex + 1) % DEMO_PRESETS.length)}
          className="flex items-center gap-1 text-slate-900 hover:text-black transition-colors cursor-pointer font-bold"
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
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              selectedPromptIndex === idx
                ? 'bg-black text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:text-black hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Sample {idx + 1}
          </button>
        ))}
      </div>

      {/* Student Input Quote Box */}
      <div 
        onClick={() => onTryQuery(currentPrompt)}
        className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 shadow-xs cursor-pointer hover:border-black transition-colors group"
      >
        <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-700 uppercase mb-1">
          <span>STUDENT SAYS</span>
          <span className="text-slate-500 group-hover:text-black transition-colors text-[10px] lowercase">click to test AI classifier →</span>
        </div>
        <div className="text-slate-900 font-semibold text-base sm:text-lg">
          "{currentPrompt}"
        </div>
      </div>

      {/* Interactive Step Timeline */}
      <div className="space-y-3 mb-6">
        
        {/* Step 1 */}
        <div 
          onClick={() => onTryQuery(currentPrompt)}
          className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
            activeStep >= 1 ? 'bg-slate-50 border border-slate-200 hover:border-slate-300' : 'opacity-40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-900">
              Student describes the problem
            </span>
          </div>
          <ArrowDown className={`w-4 h-4 text-slate-400 ${activeStep === 1 ? 'animate-bounce text-black' : ''}`} />
        </div>

        {/* Step 2 */}
        <div 
          onClick={() => onTryQuery(currentPrompt)}
          className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
            activeStep >= 2 ? 'bg-slate-50 border border-slate-200 hover:border-slate-300' : 'opacity-40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-900">
              Campus Connect understands it
            </span>
          </div>
          <ArrowDown className={`w-4 h-4 text-slate-400 ${activeStep === 2 ? 'animate-bounce text-black' : ''}`} />
        </div>

        {/* Step 3 */}
        <div 
          onClick={() => onTryQuery(currentPrompt)}
          className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
            activeStep >= 3 ? 'bg-slate-50 border border-slate-200 hover:border-slate-300' : 'opacity-40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center font-bold">
              <Building className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-900">
              Routed to the right department
            </span>
          </div>
          <ArrowDown className={`w-4 h-4 text-slate-400 ${activeStep === 3 ? 'animate-bounce text-black' : ''}`} />
        </div>

        {/* Step 4 */}
        <div 
          onClick={() => onTryQuery(currentPrompt)}
          className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
            activeStep >= 4 ? 'bg-slate-50 border border-slate-200 hover:border-slate-300' : 'opacity-40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-900">
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
        className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between shadow-xs hover:border-black transition-all cursor-pointer group"
      >
        <div>
          <div className="text-xs font-mono text-black font-bold mb-0.5 flex items-center gap-1">
            <span>CC-2026-10482</span>
            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-black transition-colors" />
          </div>
          <div className="text-xs text-slate-600 font-medium">
            {classified.department} · {classified.category}
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          Resolved
        </span>
      </div>

    </div>
  );
}
