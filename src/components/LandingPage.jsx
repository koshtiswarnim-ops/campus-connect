import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Bus, Building, Wallet, 
  GraduationCap, Stethoscope, Laptop, CheckCircle2, MessageSquare, 
  Zap, Clock, FileText, ChevronRight, User, Play, HelpCircle
} from 'lucide-react';
import HeroDemoCard from './HeroDemoCard';

export default function LandingPage({ 
  onGetStarted, 
  onTryQuery, 
  onOpenLogin,
  onNavigateToModule,
  onSelectTicket 
}) {
  const [activeModal, setActiveModal] = useState(null); // 'how-it-works' | feature id

  const featureCards = [
    {
      id: 'ai-routing',
      title: 'Smart AI Query Classification',
      category: 'Natural Language NLP',
      desc: 'Parses unstructured student queries in real time and automatically routes them to the exact department and warden SLA queue.',
      icon: Sparkles,
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'staff-desks',
      title: 'Dedicated Staff & Warden Dashboards',
      category: 'Multi-Department Control',
      desc: 'Separate, specialized control centers for Hostel Warden, Fee Counter, Exam Branch, Medical Center, and IT Support.',
      icon: Building,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'bus-tracking',
      title: 'Live Bus GPS Telemetry System',
      category: 'Campus Mobility',
      desc: 'Real-time Google Maps campus shuttle tracking, animated route progress, driver rosters, and stop arrival SMS alerts.',
      icon: Bus,
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      id: 'tracking-sla',
      title: '4-Stage Resolution & Rating',
      category: 'Transparency',
      desc: 'Students track query status from Submitted ➔ Assigned ➔ In Progress ➔ Resolved, with a 5-star rating feedback loop.',
      icon: Clock,
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <div className="bg-[#0B111E] text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white space-y-16 pb-16">
      
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION                                                  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-12 md:pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Background Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide shadow-sm animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI-Powered Campus Communication & Service Platform</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
            One Message.{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              The Right Help.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Campus Connect uses natural language AI to instantly classify, prioritize, and route student queries directly to the responsible college wardens and staff.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <span>Ask Campus AI Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToModule('bus')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#121B2D] hover:bg-[#1A263E] border border-slate-800 text-slate-200 font-bold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Bus className="w-4 h-4 text-amber-400" />
              <span>Track Live Campus Buses</span>
            </button>
          </div>

          {/* Preset Prompt Chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Try asking:</span>
            {[
              "Water problem in hostel room 304",
              "When is the fee payment deadline?",
              "Lost my library card",
              "Bus #01 schedule & live location"
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => onTryQuery(preset)}
                className="px-3 py-1.5 rounded-xl bg-[#121B2D] hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-blue-400 transition-colors cursor-pointer"
              >
                "{preset}"
              </button>
            ))}
          </div>

        </div>

        {/* Hero Interactive Demo Card Component */}
        <div className="mt-12 relative z-10">
          <HeroDemoCard onSelectTicket={onSelectTicket} />
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* DEDICATED STAFF DASHBOARDS & BUS SYSTEM QUICK ACCESS           */}
      {/* ------------------------------------------------------------- */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Multi-Department Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Dedicated Staff & Administration Desks
          </h2>
          <p className="text-slate-400 text-sm">
            Every college department gets its own custom warden desk with custom SLA queues and live tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* 1. Hostel Warden Desk */}
          <div 
            onClick={() => onNavigateToModule('admin-hostel')}
            className="bg-[#121B2D] border border-slate-800 rounded-3xl p-6 hover:border-blue-500/50 transition-all cursor-pointer group space-y-4 shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Hostel Warden Desk
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Room maintenance, water/electricity issues, curfew logs & room inspections.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-blue-400 gap-1 pt-2">
              <span>Open Warden Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Fee Counter & Finance Desk */}
          <div 
            onClick={() => onNavigateToModule('admin-finance')}
            className="bg-[#121B2D] border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/50 transition-all cursor-pointer group space-y-4 shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Fee Counter & Finance
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Receipt verification, scholarship applications, fee due reminders & refunds.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-400 gap-1 pt-2">
              <span>Open Finance Desk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Academic & Exam Branch Desk */}
          <div 
            onClick={() => onNavigateToModule('admin-academic')}
            className="bg-[#121B2D] border border-slate-800 rounded-3xl p-6 hover:border-purple-500/50 transition-all cursor-pointer group space-y-4 shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                Academic & Exam Branch
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Admit card issues, backlog forms, transcript requests & grade verification.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-purple-400 gap-1 pt-2">
              <span>Open Exam Branch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. Live Bus GPS Tracker Card */}
          <div 
            onClick={() => onNavigateToModule('bus')}
            className="bg-[#121B2D] border border-slate-800 rounded-3xl p-6 hover:border-amber-500/50 transition-all cursor-pointer group space-y-4 shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  Live Bus GPS Tracker
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  LIVE MAP
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Real-time Google Maps shuttle tracking, driver rosters & live arrival ETAs.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-amber-400 gap-1 pt-2">
              <span>Launch Live Map</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* KEY FEATURES HIGHLIGHT GRID                                    */}
      {/* ------------------------------------------------------------- */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Built for Modern Higher Education
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Everything students and administrators need for seamless query resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureCards.map(f => {
            const Icon = f.icon;
            return (
              <div 
                key={f.id}
                className="bg-[#121B2D] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-slate-700 transition-all shadow-xl"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.gradient} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {f.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {f.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
