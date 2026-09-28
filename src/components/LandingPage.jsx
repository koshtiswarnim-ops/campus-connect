import React, { useState, useEffect } from 'react';
import { 
  Star, ChevronDown, BarChart3, BookOpen, Users, Rocket, 
  Check, ArrowRight, ShieldCheck, Bus, Building, Wallet, 
  GraduationCap, Stethoscope, Laptop, MapPin
} from 'lucide-react';

export default function LandingPage({ 
  onGetStarted, 
  onTryQuery, 
  onOpenLogin,
  onNavigateToModule 
}) {
  const [activeTab, setActiveTab] = useState('analyse'); // 'analyse' | 'train' | 'testing' | 'deploy'

  // Auto-cycle tabs every 4 seconds
  useEffect(() => {
    const tabs = ['analyse', 'train', 'testing', 'deploy'];
    const interval = setInterval(() => {
      setActiveTab(prev => {
        const currentIndex = tabs.indexOf(prev);
        return tabs[(currentIndex + 1) % tabs.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen selection:bg-black selection:text-white">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. NAVIGATION (animationDelay: 0.1s)                           */}
      {/* ------------------------------------------------------------- */}
      <nav 
        style={{ animationDelay: '0.1s' }}
        className="opacity-0 animate-fade-in-up px-6 py-4 flex items-center justify-between max-w-7xl mx-auto sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100"
      >
        {/* Left: Star Icon + Stellar.ai (Campus Connect) Brand */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateToModule('landing')}>
          <Star className="w-5 h-5 fill-black text-black" />
          <span className="text-lg font-semibold tracking-tight text-black">
            Stellar.ai <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full ml-1">Campus Connect</span>
          </span>
        </div>

        {/* Center Nav Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-1 text-sm text-gray-700 hover:text-black cursor-pointer font-medium">
            <span>Solutions</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-700 hover:text-black cursor-pointer font-medium">
            <span>For Teams</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <button onClick={() => onNavigateToModule('bus')} className="text-sm text-gray-700 hover:text-black font-medium cursor-pointer flex items-center gap-1">
            <Bus className="w-4 h-4 text-blue-600" />
            <span>Live Bus Tracker</span>
          </button>
          <button onClick={() => onNavigateToModule('student')} className="text-sm text-gray-700 hover:text-black font-medium cursor-pointer">
            Student Portal
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onOpenLogin()}
            className="text-sm text-gray-700 hover:text-black font-medium cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => onGetStarted()}
            className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
          >
            Get started free
          </button>
        </div>
      </nav>

      {/* ------------------------------------------------------------- */}
      {/* 2. HERO SECTION (max-w-7xl mx-auto text-center)               */}
      {/* ------------------------------------------------------------- */}
      <section className="px-6 pt-16 md:pt-24 pb-24 max-w-7xl mx-auto text-center">
        
        {/* Reviews Badge (delay: 0.2s) */}
        <div 
          style={{ animationDelay: '0.2s' }}
          className="opacity-0 animate-fade-in-up inline-flex items-center gap-2 mb-8"
        >
          <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center bg-gray-50">
            <Star className="w-3.5 h-3.5 fill-black text-black" />
          </div>
          <span className="text-sm font-medium text-black">
            4.9 rating from 18.3K+ users
          </span>
        </div>

        {/* Main Heading (delay: 0.3s) */}
        <h1 
          style={{ animationDelay: '0.3s' }}
          className="opacity-0 animate-fade-in-up text-5xl md:text-7xl lg:text-[80px] font-normal leading-[1.1] tracking-tight mb-5 text-black"
        >
          Work Smarter. Move Faster.<br />
          <span className="bg-gradient-to-r from-black via-gray-500 to-gray-400 bg-clip-text text-transparent">
            AI Powers You Up.
          </span>
        </h1>

        {/* Subheading (delay: 0.4s) */}
        <p 
          style={{ animationDelay: '0.4s' }}
          className="opacity-0 animate-fade-in-up text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Intelligent automation syncs with the tools you love to streamline tasks, boost output, and save time.
        </p>

        {/* CTA Button (delay: 0.5s) */}
        <div 
          style={{ animationDelay: '0.5s' }}
          className="opacity-0 animate-fade-in-up mb-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onGetStarted()}
            className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors cursor-pointer shadow-lg active:scale-95"
          >
            Begin Free Trial
          </button>
          <button
            onClick={() => onNavigateToModule('bus')}
            className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-full text-base font-medium transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Bus className="w-5 h-5 text-black" />
            <span>Track Campus Buses</span>
          </button>
        </div>

        {/* Tab Bar (delay: 0.6s) */}
        <div 
          style={{ animationDelay: '0.6s' }}
          className="opacity-0 animate-fade-in-up max-w-3xl mx-auto mb-10"
        >
          {/* Mobile (md:hidden): 2x2 grid */}
          <div className="md:hidden grid grid-cols-2 gap-1.5 bg-gray-100 p-1.5 rounded-xl border border-gray-200">
            <button
              onClick={() => setActiveTab('analyse')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'analyse' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analyse</span>
            </button>
            <button
              onClick={() => setActiveTab('train')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'train' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Train</span>
            </button>
            <button
              onClick={() => setActiveTab('testing')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'testing' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Testing</span>
            </button>
            <button
              onClick={() => setActiveTab('deploy')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'deploy' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
              }`}
            >
              <Rocket className="w-4 h-4" />
              <span>Deploy</span>
            </button>
          </div>

          {/* Desktop (hidden md:flex): Row with vertical dividers */}
          <div className="hidden md:inline-flex items-center bg-gray-100 rounded-xl p-1.5 border border-gray-200/80 shadow-inner">
            <button
              onClick={() => setActiveTab('analyse')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'analyse' ? 'bg-white text-black shadow-sm font-semibold' : 'text-gray-600 hover:text-black'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span>Analyse</span>
            </button>

            <div className="w-px h-5 bg-gray-300" />

            <button
              onClick={() => setActiveTab('train')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'train' ? 'bg-white text-black shadow-sm font-semibold' : 'text-gray-600 hover:text-black'
              }`}
            >
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span>Train</span>
            </button>

            <div className="w-px h-5 bg-gray-300" />

            <button
              onClick={() => setActiveTab('testing')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'testing' ? 'bg-white text-black shadow-sm font-semibold' : 'text-gray-600 hover:text-black'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Testing</span>
            </button>

            <div className="w-px h-5 bg-gray-300" />

            <button
              onClick={() => setActiveTab('deploy')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'deploy' ? 'bg-white text-black shadow-sm font-semibold' : 'text-gray-600 hover:text-black'
              }`}
            >
              <Rocket className="w-4 h-4 text-blue-600" />
              <span>Deploy</span>
            </button>
          </div>
        </div>

        {/* Video + Overlay Section (delay: 0.7s) */}
        <div 
          style={{ animationDelay: '0.7s' }}
          className="opacity-0 animate-fade-in-up relative rounded-3xl overflow-hidden h-[400px] md:h-[500px] shadow-2xl border border-gray-200/80 group"
        >
          {/* Background MP4 Video */}
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
          />

          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          {/* 4 Conditional Animated Overlays */}
          {activeTab === 'analyse' && (
            <div className="animate-fade-in-overlay absolute inset-0 flex items-center justify-center p-4">
              <div className="animate-slide-up-overlay bg-white/95 backdrop-blur-xl border border-gray-100 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                    Step 1 of 4
                  </span>
                  <span className="text-xs font-semibold text-gray-500">25% Completed</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Set Up Your AI Workspace</h3>
                <p className="text-xs text-gray-600">
                  Connect campus databases, query routing channels, and student identity providers.
                </p>
                {/* Purple Progress Bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-1/4 h-full bg-purple-600 rounded-full animate-pulse" />
                </div>
                <div className="space-y-2 pt-1 text-xs text-gray-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Database schema & intent classifier initialized</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">2</div>
                    <span>Configure staff department routing matrices</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'train' && (
            <div className="animate-fade-in-overlay absolute inset-0 flex items-center justify-center p-4">
              <div className="animate-slide-up-overlay bg-white/95 backdrop-blur-xl border border-gray-100 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
                    Training Model
                  </span>
                  <span className="text-xs font-semibold text-orange-600">67% Accuracy</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI Intent Model Training</h3>
                <p className="text-xs text-gray-600">
                  Fine-tuning campus query resolution logic on 10,000+ historical college tickets.
                </p>
                {/* Orange Progress Bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-[67%] h-full bg-orange-500 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-lg font-bold text-gray-900">0.04s</div>
                    <div className="text-[10px] text-gray-500">Latency SLA</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-lg font-bold text-gray-900">99.4%</div>
                    <div className="text-[10px] text-gray-500">Router Precision</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testing' && (
            <div className="animate-fade-in-overlay absolute inset-0 flex items-center justify-center p-4">
              <div className="animate-slide-up-overlay bg-white/95 backdrop-blur-xl border border-gray-100 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> All Passed
                  </span>
                  <span className="text-xs font-bold text-emerald-600">127/127 Passed</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Test Suite Results</h3>
                <p className="text-xs text-gray-600">
                  Automated test suites passed across Hostel, Academic, Finance, and Health Center channels.
                </p>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 text-xs text-emerald-900 font-medium">
                  <div className="flex justify-between">
                    <span>Hostel Water Leak Routing</span>
                    <span className="font-bold text-emerald-700">PASS (12ms)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee Payment Refund Validation</span>
                    <span className="font-bold text-emerald-700">PASS (18ms)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GPS Bus Live Telemetry Sync</span>
                    <span className="font-bold text-emerald-700">PASS (9ms)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="animate-fade-in-overlay absolute inset-0 flex items-center justify-center p-4">
              <div className="animate-slide-up-overlay bg-white/95 backdrop-blur-xl border border-gray-100 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    Production Ready
                  </span>
                  <span className="text-xs font-semibold text-gray-500">v2.4.0</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Deploy to Production</h3>
                <div className="space-y-2 text-xs text-gray-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>Real-time WebSocket & Bus GPS feed connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>Role-Based Authorization Guards (RBAC) active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>Dedicated Staff & Warden dashboards synchronized</span>
                  </div>
                </div>
                <button
                  onClick={() => onGetStarted()}
                  className="w-full py-2.5 bg-black hover:bg-gray-800 text-white rounded-xl font-medium text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Launch Live Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Company Logos (delay: 0.8s) */}
        <div 
          style={{ animationDelay: '0.8s' }}
          className="opacity-0 animate-fade-in-up mt-24 flex flex-wrap items-center justify-center gap-8 md:gap-14 text-gray-400 font-bold tracking-widest text-sm uppercase"
        >
          <span className="hover:text-black transition-colors">INTERSCOPE</span>
          <span className="hover:text-black transition-colors font-extrabold tracking-normal">SPOTIFY</span>
          <span className="hover:text-black transition-colors flex items-center gap-1">
            <span className="grid grid-cols-2 gap-0.5 w-3 h-3"><span className="bg-current rounded-full"/><span className="bg-current rounded-full"/><span className="bg-current rounded-full"/><span className="bg-current rounded-full"/></span>
            Nexera
          </span>
          <span className="hover:text-black transition-colors font-serif italic text-base">M3</span>
          <span className="hover:text-black transition-colors flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold">LC</span>
            LAURA COLE
          </span>
          <span className="hover:text-black transition-colors flex items-center gap-1">
            vertex <span className="w-1.5 h-1.5 bg-current rounded-full inline-block" />
          </span>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. DEDICATED STAFF DASHBOARD & CAMPUS SERVICES QUICK LAUNCH    */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gray-50 border-t border-gray-200 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Dedicated Staff & Administration Dashboards
            </h2>
            <p className="text-gray-600 text-base">
              Every college department gets its own specialized control center with custom workflows, SLAs, and live tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Hostel Warden Dashboard Card */}
            <div 
              onClick={() => onNavigateToModule('admin-hostel')}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-black transition-all cursor-pointer group space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-black">
                  Hostel Warden Desk
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Room maintenance, water/electricity complaints, curfew logs & room inspections.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-blue-600 group-hover:text-black gap-1 pt-2">
                <span>Open Warden Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. Fee Counter / Finance Dashboard Card */}
            <div 
              onClick={() => onNavigateToModule('admin-finance')}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-black transition-all cursor-pointer group space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-black">
                  Fee Counter & Finance
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Receipt verification, scholarship applications, fee due reminders & refunds.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-emerald-600 group-hover:text-black gap-1 pt-2">
                <span>Open Finance Desk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 3. Academic & Exam Branch Card */}
            <div 
              onClick={() => onNavigateToModule('admin-academic')}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-black transition-all cursor-pointer group space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-black">
                  Academic & Exam Branch
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Admit card issues, backlog forms, transcript requests & grade verification.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-purple-600 group-hover:text-black gap-1 pt-2">
                <span>Open Academic Desk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 4. Bus Transport & Google Maps GPS Tracker Card */}
            <div 
              onClick={() => onNavigateToModule('bus')}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-black transition-all cursor-pointer group space-y-4 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-black">
                    Live Bus GPS Tracker
                  </h3>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                    LIVE MAP
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Real-time Google Maps campus shuttle tracking, driver rosters & live ETA.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-amber-600 group-hover:text-black gap-1 pt-2">
                <span>Launch Map Tracker</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
