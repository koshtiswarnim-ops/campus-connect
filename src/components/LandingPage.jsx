import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, MessageSquare, Zap, ShieldCheck, 
  Bell, Building, CheckCircle, FileText, Wifi, BookOpen, 
  CreditCard, GraduationCap, Bus, Briefcase, HeartHandshake,
  Lock, AlertCircle, RefreshCw, X, ChevronRight, CheckCircle2, Shield
} from 'lucide-react';
import HeroDemoCard from './HeroDemoCard';

const SERVICE_TAGS = [
  { name: "Hostel maintenance", sampleText: "I have a problem with my hostel room fan." },
  { name: "Examination", sampleText: "Grade sheet discrepancy in Semester 5 CS302 examination." },
  { name: "ID cards & documents", sampleText: "Need urgent Bonafide Certificate for passport application." },
  { name: "Scholarships", sampleText: "State Merit Scholarship disbursement status pending for 2026." },
  { name: "IT & Wi-Fi", sampleText: "Cannot connect to Campus_5G Wi-Fi in Central Library." },
  { name: "Library", sampleText: "Overdue fine calculation issue on reserved reference books." },
  { name: "Transport", sampleText: "Campus Shuttle Bus Route 4 timing delay inquiry." },
  { name: "Placements", sampleText: "Resume verification pending for upcoming T&P drive." },
  { name: "Student welfare", sampleText: "Requesting approval for Annual Cultural Fest club stall." }
];

export default function LandingPage({ onGetStarted, onTryQuery, onOpenLogin, onSelectTicket }) {
  const [selectedTag, setSelectedTag] = useState("Hostel maintenance");
  
  // Interactive Modal States for Landing Page Features
  const [activeFeatureModal, setActiveFeatureModal] = useState(null);
  const [activeStepModal, setActiveStepModal] = useState(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-[#0B111E] selection:bg-blue-500 selection:text-white pb-12 transition-colors">
      
      {/* ---------------- 1. HERO SECTION ---------------- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Pill Badge */}
            <div 
              onClick={() => setShowAiModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 text-xs font-semibold text-blue-700 dark:text-blue-400 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>AI-powered campus assistance</span>
              <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full ml-1 font-bold">v2.4</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              One message. <br />
              <span className="text-blue-600 dark:text-blue-500">The right help.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Describe your problem in your own words. Campus Connect finds the right department, raises a trackable request and follows it through to resolution.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onGetStarted}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 group active:scale-95 cursor-pointer"
              >
                <span>Get started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenLogin}
                className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-base transition-all shadow-xs active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Log In / Sign Up</span>
              </button>

              <button
                onClick={() => onTryQuery("There is a water problem in my hostel.")}
                className="px-4 py-3.5 rounded-xl bg-white/80 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-all cursor-pointer"
              >
                Try Interactive Demo
              </button>
            </div>

            {/* Subtext */}
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500 pt-1 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Demo accounts ready
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> College SSO Supported
              </span>
            </div>
          </div>

          {/* Right Visual Interactive Card */}
          <div className="lg:col-span-6">
            <HeroDemoCard 
              onTryQuery={onTryQuery}
              onSelectTicket={onSelectTicket}
            />
          </div>

        </div>
      </section>

      {/* ---------------- 2. HOW IT WORKS ---------------- */}
      <section className="py-16 bg-slate-100/70 dark:bg-[#0E1626]/80 border-t border-b border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                How it works
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">Click any step below to explore the detailed workflow process</p>
            </div>
            <span className="text-xs text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-3 py-1 rounded-full font-semibold hidden sm:inline-block">
              Interactive Workflow
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Step 1 */}
            <div 
              onClick={() => setActiveStepModal(1)}
              className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">
                STEP 1
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors flex items-center justify-between">
                <span>Student describes the problem</span>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </h3>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => setActiveStepModal(2)}
              className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">
                STEP 2
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                <span>Campus Connect understands it</span>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              </h3>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => setActiveStepModal(3)}
              className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-sky-500/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700/60 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-5 group-hover:scale-110 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">
                STEP 3
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors flex items-center justify-between">
                <span>Routed to the right department</span>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
              </h3>
            </div>

            {/* Step 4 */}
            <div 
              onClick={() => setActiveStepModal(4)}
              className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-slate-800/80 border border-emerald-100 dark:border-slate-700/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">
                STEP 4
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                <span>Tracked to resolution</span>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
              </h3>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- 3. BUILT LIKE A REAL PRODUCT ---------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Built like a real product
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base font-medium">
            Not a chatbot demo — a working service desk for the whole campus. (Click any feature card to see live demo modal)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div 
            onClick={() => setActiveFeatureModal('intent')}
            className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-600/15 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Intent detection</span>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Plain language in, structured request out — category, department, priority and next action.
            </p>
          </div>

          {/* Feature 2 */}
          <div 
            onClick={() => setActiveFeatureModal('routing')}
            className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-600/15 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Smart routing</span>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every request lands with the department that can actually solve it, with no forwarding chains.
            </p>
          </div>

          {/* Feature 3 */}
          <div 
            onClick={() => setActiveFeatureModal('tracking')}
            className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-600/15 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Live request tracking</span>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A request ID, a status timeline and staff replies in one place for every student.
            </p>
          </div>

          {/* Feature 4 */}
          <div 
            onClick={() => setActiveFeatureModal('dashboard')}
            className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-600/15 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Staff & admin dashboards</span>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Queues, assignment, priority control, replies, internal notes and campus-wide analytics.
            </p>
          </div>

          {/* Feature 5 */}
          <div 
            onClick={() => setActiveFeatureModal('notifications')}
            className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-600/15 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Notifications</span>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Students are told when a request is assigned, progressed, replied to or resolved.
            </p>
          </div>

          {/* Feature 6 */}
          <div 
            onClick={() => setActiveFeatureModal('privacy')}
            className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-600/15 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Privacy-aware requests</span>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Sensitive issues can be raised without showing identity in general staff views.
            </p>
          </div>

        </div>
      </section>

      {/* ---------------- 4. CAMPUS SERVICES COVERED ---------------- */}
      <section className="py-16 bg-slate-100/70 dark:bg-[#0E1626]/80 border-t border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Campus services covered
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Click any service tag below to launch an instant pre-populated query demo</p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">9 Active Departments</span>
          </div>

          {/* Service Filter Pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {SERVICE_TAGS.map((tagObj) => (
              <button
                key={tagObj.name}
                onClick={() => {
                  setSelectedTag(tagObj.name);
                  onTryQuery(tagObj.sampleText);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedTag === tagObj.name
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white dark:bg-[#121B2D] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500 shadow-xs'
                }`}
              >
                <span>{tagObj.name}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          {/* Service Feature Sub-cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Sub-card 1 */}
            <div 
              onClick={() => onGetStarted()}
              className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 cursor-pointer hover:border-blue-500/50 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>Request tracking</span>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Every request gets an ID like CC-2026-10482, a live status, a full history of who changed what, and a conversation with the department handling it.
              </p>
            </div>

            {/* Sub-card 2 */}
            <div 
              onClick={() => setShowPrivacyModal(true)}
              className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 cursor-pointer hover:border-blue-500/50 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>Privacy, stated honestly</span>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Anonymous requests hide your identity from general staff views, but authorised administrators may still access identity information when required.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------- 5. VIBRANT CTA BANNER ---------------- */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Students shouldn't need to know the college hierarchy
            </h2>
            <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto font-medium">
              They just describe the problem. Campus Connect handles the process.
            </p>
            <div>
              <button
                onClick={() => onTryQuery("I have a problem with my hostel room fan.")}
                className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base transition-all shadow-xl active:scale-95 cursor-pointer"
              >
                Try the live demo
              </button>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* ---------------- 6. FOOTER ---------------- */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-8 bg-white dark:bg-[#090E1A] text-slate-600 dark:text-slate-500 text-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              C
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-400 text-sm">Campus Connect</span>
            <span className="text-slate-500 dark:text-slate-600">| Unified College Service Desk</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 font-medium">
            <button onClick={() => setShowAiModal(true)} className="hover:text-slate-900 dark:hover:text-white">AI Engine v2.4</button>
            <span>•</span>
            <button onClick={() => setShowPrivacyModal(true)} className="hover:text-slate-900 dark:hover:text-white">Privacy Disclosure</button>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              Routing Engine Online
            </span>
          </div>
        </div>
      </footer>

      {/* ---------------- MODALS FOR FEATURE EXPLORATION ---------------- */}

      {/* 1. Feature Detail Modal */}
      {activeFeatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 max-w-lg w-full rounded-2xl p-6 space-y-4 relative shadow-2xl text-slate-900 dark:text-white">
            <button 
              onClick={() => setActiveFeatureModal(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
              {activeFeatureModal.replace('_', ' ')} Feature Demonstration
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              This core capability ensures every student query is auto-categorized, assigned to the exact authorized department officer, and tracked transparently with SLA guarantees.
            </p>

            <div className="bg-slate-50 dark:bg-[#0E1626] p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <div className="font-semibold text-blue-600 dark:text-blue-400 uppercase">Live Feature Action:</div>
              <div>• Auto-detected Intent: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">98.4% Accuracy</span></div>
              <div>• Zero Manual Dispatcher Bottlenecks</div>
              <div>• Campus-wide Escalation Automation</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveFeatureModal(null);
                  onTryQuery("I have a problem with my hostel room fan.");
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md cursor-pointer"
              >
                Try In Live Demo Modal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Step Detail Modal */}
      {activeStepModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 max-w-lg w-full rounded-2xl p-6 space-y-4 relative shadow-2xl text-slate-900 dark:text-white">
            <button 
              onClick={() => setActiveStepModal(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <span className="font-bold text-lg">Step {activeStepModal}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {activeStepModal === 1 && "Step 1: Student describes the problem"}
              {activeStepModal === 2 && "Step 2: Campus Connect understands it"}
              {activeStepModal === 3 && "Step 3: Routed to the right department"}
              {activeStepModal === 4 && "Step 4: Tracked to resolution"}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeStepModal === 1 && "Students type in plain language without worrying about college hierarchy or department names."}
              {activeStepModal === 2 && "Campus Connect NLP engine extracts entities, assigns urgency priority, and sets SLA timers."}
              {activeStepModal === 3 && "The query lands directly on the Warden, IT Desk, or Accounts Officer queue instantly."}
              {activeStepModal === 4 && "Students get real-time timeline tracking from Submitted -> Assigned -> In Progress -> Resolved."}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveStepModal(null);
                  onGetStarted();
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-md cursor-pointer"
              >
                Go to Student Portal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Privacy Disclosure Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#121B2D] border border-slate-200 dark:border-slate-800 max-w-lg w-full rounded-2xl p-6 space-y-4 relative shadow-2xl text-slate-900 dark:text-white">
            <button 
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Privacy & Identity Disclosure
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Campus Connect allows students to raise sensitive issues anonymously. In general staff views, student roll number and personal name are masked. Authorized senior administrators retain access strictly for emergency safety situations.
            </p>

            <button
              onClick={() => setShowPrivacyModal(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-md cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
