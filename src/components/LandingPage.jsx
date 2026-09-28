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
  const featureCards = [
    {
      id: 'ai-routing',
      title: 'Smart AI Query Classification',
      category: 'Natural Language NLP',
      desc: 'Parses unstructured student queries in real time and automatically routes them to the exact department and warden SLA queue.',
      icon: Sparkles,
      badgeColor: 'bg-slate-100 border border-slate-200 text-slate-900'
    },
    {
      id: 'staff-desks',
      title: 'Dedicated Staff & Warden Dashboards',
      category: 'Multi-Department Control',
      desc: 'Separate, specialized control centers for Hostel Warden, Fee Counter, Exam Branch, Medical Center, and IT Support.',
      icon: Building,
      badgeColor: 'bg-slate-100 border border-slate-200 text-slate-900'
    },
    {
      id: 'bus-tracking',
      title: 'Live Bus GPS Telemetry System',
      category: 'Campus Mobility',
      desc: 'Real-time Google Maps campus shuttle tracking, animated route progress, driver rosters, and stop arrival SMS alerts.',
      icon: Bus,
      badgeColor: 'bg-amber-50 border border-amber-200 text-amber-800'
    },
    {
      id: 'tracking-sla',
      title: '4-Stage Resolution & Rating',
      category: 'Transparency',
      desc: 'Students track query status from Submitted ➔ Assigned ➔ In Progress ➔ Resolved, with a 5-star rating feedback loop.',
      icon: Clock,
      badgeColor: 'bg-emerald-50 border border-emerald-200 text-emerald-800'
    }
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen space-y-16 pb-16">
      
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION                                                  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-12 md:pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>AI-Powered Campus Communication & Service Platform</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-black leading-[1.15]">
            One Message.{' '}
            <span className="text-black underline decoration-slate-300 underline-offset-8">
              The Right Help.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Campus Connect uses natural language AI to instantly classify, prioritize, and route student queries directly to the responsible college wardens and staff.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-black hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <span>Ask Campus AI Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToModule('bus')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-xs cursor-pointer"
            >
              <Bus className="w-4 h-4 text-amber-600" />
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
                className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-black font-medium transition-colors cursor-pointer"
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
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Multi-Department Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight">
            Dedicated Staff & Administration Desks
          </h2>
          <p className="text-slate-600 text-sm">
            Every college department gets its own custom warden desk with custom SLA queues and live tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* 1. Hostel Warden Desk */}
          <div 
            onClick={() => onNavigateToModule('admin-hostel')}
            className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-black transition-all cursor-pointer group space-y-4 shadow-xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-black group-hover:text-slate-700 transition-colors">
                Hostel Warden Desk
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Room maintenance, water/electricity issues, curfew logs & room inspections.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-black gap-1 pt-2">
              <span>Open Warden Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Fee Counter & Finance Desk */}
          <div 
            onClick={() => onNavigateToModule('admin-finance')}
            className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-black transition-all cursor-pointer group space-y-4 shadow-xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-black group-hover:text-slate-700 transition-colors">
                Fee Counter & Finance
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Receipt verification, scholarship applications, fee due reminders & refunds.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-black gap-1 pt-2">
              <span>Open Finance Desk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Academic & Exam Branch Desk */}
          <div 
            onClick={() => onNavigateToModule('admin-academic')}
            className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-black transition-all cursor-pointer group space-y-4 shadow-xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-black group-hover:text-slate-700 transition-colors">
                Academic & Exam Branch
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Admit card issues, backlog forms, transcript requests & grade verification.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-black gap-1 pt-2">
              <span>Open Exam Branch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. Live Bus GPS Tracker Card */}
          <div 
            onClick={() => onNavigateToModule('bus')}
            className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-black transition-all cursor-pointer group space-y-4 shadow-xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-black group-hover:text-slate-700 transition-colors">
                  Live Bus GPS Tracker
                </h3>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  LIVE MAP
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Real-time Google Maps shuttle tracking, driver rosters & live arrival ETAs.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-black gap-1 pt-2">
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
            Built for Modern Higher Education
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
            Everything students and administrators need for seamless query resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureCards.map(f => {
            const Icon = f.icon;
            return (
              <div 
                key={f.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-slate-400 transition-all shadow-xs"
              >
                <div className={`w-12 h-12 rounded-2xl ${f.badgeColor} flex items-center justify-center shadow-xs`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {f.category}
                  </span>
                  <h3 className="text-xl font-bold text-black">
                    {f.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
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
