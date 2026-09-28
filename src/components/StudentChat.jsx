import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Sparkles, User, Building, Clock, CheckCircle, 
  ArrowRight, ShieldCheck, RefreshCw, Trash2, CheckCircle2, AlertCircle, FileText
} from 'lucide-react';
import { classifyQuery } from '../utils/aiClassifier';

const SUGGESTED_PROMPTS = [
  { text: "There is a water problem in my hostel.", tag: "Hostel Issue" },
  { text: "I lost my ID card yesterday.", tag: "Lost ID Card" },
  { text: "My college Wi-Fi is not working in Central Library.", tag: "Wi-Fi Outage" },
  { text: "When does the main library close?", tag: "FAQ Timing" },
  { text: "Need help with my exam form status.", tag: "Exam Form" }
];

export default function StudentChat({ 
  queries, 
  onCreateTicket, 
  onSelectTicket, 
  currentUser 
}) {
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "ai",
      text: "Hello! I am Campus Connect AI. How can we help you on campus today?",
      time: "Just Now"
    }
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const queryText = textToSend || inputQuery;
    if (!queryText.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: queryText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAnonymous
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery("");
    setIsTyping(true);

    // Simulate AI Intent Detection Delay
    setTimeout(() => {
      const classification = classifyQuery(queryText, isAnonymous);

      if (classification.action === 'answer') {
        const aiResponseMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: "ai",
          text: classification.faqAnswer,
          classification: classification,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponseMsg]);
        setIsTyping(false);
      } else {
        const newTicket = {
          id: `CC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
          title: `${classification.department} · ${classification.category}`,
          studentSays: queryText,
          category: classification.category,
          department: classification.department,
          assignedTo: classification.assignedTo,
          priority: classification.priority,
          status: "Submitted",
          isAnonymous: isAnonymous,
          studentName: isAnonymous ? "Anonymous Student" : (currentUser?.name || "Rahul Sharma"),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          timeline: [
            { 
              status: "Submitted", 
              time: "Just Now", 
              note: `Request raised by ${isAnonymous ? 'Anonymous Student' : (currentUser?.name || 'Rahul Sharma')}. Smart Intent: ${classification.intent}` 
            },
            { 
              status: "Assigned", 
              time: "Just Now", 
              note: `Routed to ${classification.department} (${classification.assignedTo})` 
            }
          ],
          replies: [
            {
              sender: "System AI",
              text: `Query intent recognized as ${classification.intent}. Smart-routed to ${classification.department}. SLA: ${classification.suggestedSLA}.`,
              time: "Just Now"
            }
          ]
        };

        onCreateTicket(newTicket);

        const aiResponseMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: "ai",
          text: `I have analyzed your problem and created a trackable ticket for ${classification.department}.`,
          classification: classification,
          ticket: newTicket,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, aiResponseMsg]);
        setIsTyping(false);
      }
    }, 700);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "msg-1",
        sender: "ai",
        text: "Hello! I am Campus Connect AI. How can we help you on campus today?",
        time: "Just Now"
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-5rem)] flex flex-col bg-white text-gray-900">
      
      {/* Chat Header Bar */}
      <div className="bg-white border border-gray-200 rounded-t-2xl p-4 flex items-center justify-between shadow-xs transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-white font-bold shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="font-bold text-black text-base flex items-center gap-2">
              <span>Campus Connect AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Natural Language Query Classifier & Dynamic Department Router
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="p-2 rounded-xl text-gray-500 hover:text-black hover:bg-gray-100 transition-colors text-xs flex items-center gap-1 font-medium cursor-pointer"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Message Feed Area */}
      <div className="flex-1 bg-gray-50 border-x border-gray-200 p-4 sm:p-6 overflow-y-auto space-y-6 transition-colors">
        
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex gap-3 max-w-2xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 shadow-xs ${
              msg.sender === 'user'
                ? 'bg-black text-white'
                : 'bg-gray-200 border border-gray-300 text-gray-800'
            }`}>
              {msg.sender === 'user' ? (msg.isAnonymous ? 'A' : 'R') : <Sparkles className="w-4 h-4 text-black" />}
            </div>

            {/* Bubble */}
            <div className="space-y-3 flex-1">
              
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-black text-white rounded-tr-none shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-900 rounded-tl-none shadow-xs'
              }`}>
                <p>{msg.text}</p>
                <div className={`text-[10px] mt-1.5 font-medium ${msg.sender === 'user' ? 'text-gray-300 text-right' : 'text-gray-400'}`}>
                  {msg.time} {msg.isAnonymous && '• Anonymous'}
                </div>
              </div>

              {/* Structured AI Analysis Card */}
              {msg.classification && (
                <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 shadow-xs">
                  
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-100">
                    <span className="font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI Intent Recognition
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-600">
                      {(msg.classification.confidence * 100).toFixed(0)}% Confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <div className="text-[10px] text-gray-500 font-bold uppercase">Intent</div>
                      <div className="font-semibold text-black truncate mt-0.5">{msg.classification.intent}</div>
                    </div>

                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <div className="text-[10px] text-gray-500 font-bold uppercase">Department</div>
                      <div className="font-semibold text-black truncate mt-0.5">{msg.classification.department}</div>
                    </div>

                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <div className="text-[10px] text-gray-500 font-bold uppercase">Action</div>
                      <div className="font-semibold text-emerald-600 truncate mt-0.5 capitalize">{msg.classification.action}</div>
                    </div>

                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <div className="text-[10px] text-gray-500 font-bold uppercase">Priority</div>
                      <div className="font-semibold text-amber-600 truncate mt-0.5">{msg.classification.priority}</div>
                    </div>
                  </div>

                  {/* Generated Ticket Box */}
                  {msg.ticket && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-bold text-black">
                          Ticket ID: {msg.ticket.id}
                        </div>
                        <div className="text-xs text-gray-600 mt-0.5 font-medium">
                          Status: <span className="text-emerald-600 font-bold">{msg.ticket.status}</span> · Assigned to {msg.ticket.assignedTo}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectTicket(msg.ticket)}
                        className="px-3 py-1.5 rounded-lg bg-black hover:bg-gray-800 text-white text-xs font-semibold flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <span>Track Ticket</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        ))}

        {/* Typing State */}
        {isTyping && (
          <div className="flex gap-3 max-w-md">
            <div className="w-8 h-8 rounded-xl bg-gray-200 border border-gray-300 text-black flex items-center justify-center text-xs font-bold">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-gray-200 p-3.5 rounded-2xl rounded-tl-none text-xs text-gray-600 flex items-center gap-2 font-medium shadow-xs">
              <span className="w-2 h-2 rounded-full bg-black animate-ping" />
              <span>Analyzing student intent & routing parameters...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompts Bar */}
      <div className="bg-gray-100 border-x border-gray-200 p-3 transition-colors">
        <div className="text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2 px-1">
          Suggested Prompts (Click to test workflow):
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {SUGGESTED_PROMPTS.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(prompt.text)}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-gray-200 border border-gray-200 text-gray-800 text-xs font-semibold shrink-0 transition-colors cursor-pointer shadow-xs"
            >
              "{prompt.text}"
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Bar */}
      <div className="bg-white border border-gray-200 rounded-b-2xl p-4 space-y-2 transition-colors shadow-sm">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type your campus problem (e.g. There is a water problem in my hostel)..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-black placeholder-gray-400 font-medium"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="px-5 py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-sm transition-all shadow-md flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Privacy Toggle Bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 px-1 pt-1 font-medium">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-gray-300 bg-white text-black focus:ring-black"
            />
            <span className="text-gray-900 font-semibold">Submit anonymously</span> (Restricted identity visibility)
          </label>

          <span className="text-[11px] text-gray-400">
            Powered by Campus Connect Routing Engine v2.4
          </span>
        </div>
      </div>

    </div>
  );
}
