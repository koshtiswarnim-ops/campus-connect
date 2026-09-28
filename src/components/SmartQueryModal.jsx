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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-gray-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-gray-900 flex flex-col max-h-[90vh] transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-black">Smart Query Classifier</h3>
              <p className="text-xs text-gray-500 font-medium">Describe your issue in plain language</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          
          {/* Query Input Box */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Describe your college-related query:
            </label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. I have a problem with my hostel room fan."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 text-base focus:outline-none focus:border-black placeholder-gray-400 font-medium"
              required
            />
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2 font-medium">
              <span>Quick sample: Click "Hostel fan" or "Wi-Fi issue" below</span>
              <span>{inputText.length} chars</span>
            </div>
          </div>

          {/* Quick Sample Prompts */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setInputText("I have a problem with my hostel room fan.")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200 cursor-pointer"
            >
              🏠 Hostel room fan
            </button>
            <button
              type="button"
              onClick={() => setInputText("Cannot connect to Campus_5G Wi-Fi in Central Library.")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200 cursor-pointer"
            >
              📶 Library Wi-Fi issue
            </button>
            <button
              type="button"
              onClick={() => setInputText("Need duplicate fee payment receipt for Semester 4.")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200 cursor-pointer"
            >
              💳 Fee receipt
            </button>
          </div>

          {/* Real-time AI Classification Visual Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-black" />
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  Campus Connect AI Intent Detection
                </span>
              </div>
              {isAnalyzing ? (
                <span className="text-xs text-amber-600 animate-pulse flex items-center gap-1 font-semibold">
                  Analyzing query...
                </span>
              ) : (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Routed & Ready
                </span>
              )}
            </div>

            {analysisResult && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
                  <div className="text-[10px] text-gray-500 font-bold uppercase">Category</div>
                  <div className="text-xs font-bold text-black truncate mt-0.5">{analysisResult.category}</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
                  <div className="text-[10px] text-gray-500 font-bold uppercase">Detected Dept</div>
                  <div className="text-xs font-bold text-black truncate mt-0.5">{analysisResult.department}</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
                  <div className="text-[10px] text-gray-500 font-bold uppercase">Priority</div>
                  <div className="text-xs font-bold text-emerald-600 truncate mt-0.5">{analysisResult.priority}</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
                  <div className="text-[10px] text-gray-500 font-bold uppercase">Assigned To</div>
                  <div className="text-xs font-bold text-gray-900 truncate mt-0.5">{analysisResult.assignedTo}</div>
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
              className="w-4 h-4 rounded border-gray-300 bg-white text-black focus:ring-black cursor-pointer"
            />
            <label htmlFor="privacy-toggle" className="text-xs text-gray-600 cursor-pointer select-none">
              <span className="font-bold text-black">Privacy-aware submission</span> (Hide student identity in general staff view)
            </label>
          </div>

          {/* Action Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-gray-600 hover:text-black text-sm font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
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
