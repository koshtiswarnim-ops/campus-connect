import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight, Building, CheckCircle, Clock, ShieldAlert, Cpu } from 'lucide-react';
import { classifyQuery } from '../utils/aiClassifier';

export default function SmartQueryModal({ isOpen, onClose, onSubmitQuery, defaultText = "" }) {
  const [inputText, setInputText] = useState(defaultText || "I have a problem with my hostel room fan.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    if (defaultText) {
      setInputText(defaultText);
    }
  }, [defaultText]);

  useEffect(() => {
    if (inputText.trim().length > 3) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        const result = classifyQuery(inputText, isAnonymous);
        setAnalysisResult(result);
        setIsAnalyzing(false);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setAnalysisResult(null);
    }
  }, [inputText, isAnonymous]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const classified = analysisResult || classifyQuery(inputText, isAnonymous);
    const newTicket = {
      id: `CC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `${classified.department} · ${classified.category}`,
      studentSays: inputText,
      category: classified.category,
      department: classified.department,
      assignedTo: classified.assignedTo,
      priority: classified.priority,
      status: "Submitted",
      isAnonymous: isAnonymous,
      studentName: isAnonymous ? "Anonymous Student" : "Rahul Sharma (Roll: 2024CS104)",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        { 
          status: "Submitted", 
          time: "Just Now", 
          note: `Request raised by ${isAnonymous ? 'Anonymous Student' : 'Rahul Sharma'}. AI intent detected with ${(classified.confidence * 100).toFixed(0)}% confidence.` 
        },
        { 
          status: "Assigned", 
          time: "Just Now", 
          note: `Smart-routed to ${classified.department} (${classified.assignedTo})` 
        }
      ],
      replies: [
        {
          sender: "System AI",
          text: `Query classified under ${classified.category}. Routed directly to ${classified.assignedTo} with ${classified.priority} priority. Expected resolution SLA: ${classified.suggestedSLA}.`,
          time: "Just Now"
        }
      ]
    };

    onSubmitQuery(newTicket);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#11192A] border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 flex flex-col max-h-[90vh] transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1626]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Smart Query Classifier</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Describe your issue in plain language</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          
          {/* Query Input Box */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Describe your college-related query:
            </label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. I have a problem with my hostel room fan."
              className="w-full bg-slate-50 dark:bg-[#182338] border border-slate-200 dark:border-slate-700/80 rounded-xl p-4 text-slate-900 dark:text-white text-base focus:outline-none focus:border-blue-500 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
              required
            />
            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">
              <span>Quick sample: Click "Hostel fan" or "Wi-Fi issue" below</span>
              <span>{inputText.length} chars</span>
            </div>
          </div>

          {/* Quick Sample Prompts */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setInputText("I have a problem with my hostel room fan.")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              🏠 Hostel room fan
            </button>
            <button
              type="button"
              onClick={() => setInputText("Cannot connect to Campus_5G Wi-Fi in Central Library.")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              📶 Library Wi-Fi issue
            </button>
            <button
              type="button"
              onClick={() => setInputText("Need duplicate fee payment receipt for Semester 4.")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              💳 Fee receipt
            </button>
          </div>

          {/* Real-time AI Classification Visual Box */}
          <div className="bg-slate-50 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800/90 rounded-xl p-5 relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Campus Connect AI Intent Detection
                </span>
              </div>
              {isAnalyzing ? (
                <span className="text-xs text-amber-600 dark:text-amber-400 animate-pulse flex items-center gap-1 font-semibold">
                  Analyzing query...
                </span>
              ) : (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Routed & Ready
                </span>
              )}
            </div>

            {analysisResult && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="bg-white dark:bg-[#141E30] p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Category</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">{analysisResult.category}</div>
                </div>

                <div className="bg-white dark:bg-[#141E30] p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Detected Dept</div>
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 truncate mt-0.5">{analysisResult.department}</div>
                </div>

                <div className="bg-white dark:bg-[#141E30] p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Priority</div>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 truncate mt-0.5">{analysisResult.priority}</div>
                </div>

                <div className="bg-white dark:bg-[#141E30] p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Assigned To</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">{analysisResult.assignedTo}</div>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Aware Checkbox */}
          <div className="flex items-center gap-2 pt-1 font-medium">
            <input
              type="checkbox"
              id="privacy-toggle"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="privacy-toggle" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
              <span className="font-bold text-slate-800 dark:text-slate-300">Privacy-aware submission</span> (Hide student identity in general staff view)
            </label>
          </div>

          {/* Action Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
            >
              <span>Submit & Track Query</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
