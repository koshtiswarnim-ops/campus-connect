import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, ArrowLeft, EyeOff, FileText, CheckCircle2, 
  Sparkles, Mail, Server, Cpu, Bus, ChevronDown, List, Home, Key, Database, Users, HelpCircle
} from 'lucide-react';

export default function PrivacyPolicy({ onBack, onNavigateToModule }) {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    // Set page metadata for SEO
    document.title = "Campus Connect | Privacy Policy";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Privacy Policy for Campus Connect, an AI-powered college communication and assistance platform.');
    }

    // Intersection observer for sticky TOC active highlight
    const handleScroll = () => {
      const sections = tocItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tocItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tocItems = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'information-collected', label: '2. Information We May Collect' },
    { id: 'how-we-use-information', label: '3. How We Use Information' },
    { id: 'anonymous-requests', label: '4. Anonymous Requests' },
    { id: 'google-authentication', label: '5. Google Sign-In / Authentication' },
    { id: 'bus-tracking', label: '6. Bus Tracking' },
    { id: 'data-sharing', label: '7. Data Sharing' },
    { id: 'data-security', label: '8. Data Security' },
    { id: 'data-retention', label: '9. Data Retention' },
    { id: 'your-choices-and-rights', label: '10. Your Choices and Rights' },
    { id: 'childrens-privacy', label: '11. Children\'s Privacy' },
    { id: 'third-party-services', label: '12. Third-Party Services' },
    { id: 'policy-changes', label: '13. Changes to This Privacy Policy' },
    { id: 'contact-us', label: '14. Contact Us' }
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Breadcrumb & Navigation Bar */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between border-b border-gray-200 pb-4">
          <ol className="flex items-center gap-2 text-xs font-semibold text-gray-600">
            <li>
              <button
                onClick={onBack}
                className="hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-black font-bold">Privacy Policy</li>
          </ol>

          <span className="text-xs font-mono text-gray-500 font-medium">
            Last updated: September 29, 2026
          </span>
        </nav>

        {/* HERO SECTION */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-bold text-gray-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Institutional Data Protection Charter</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-black tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
            Your privacy matters to us. This policy explains what information Campus Connect collects, how we use it, and how we protect your information.
          </p>

          <div className="pt-2 text-xs text-gray-500 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Applies to Campus Connect Web Portal, AI Routing Engine, and Bus GPS Services</span>
          </div>
        </section>

        {/* MOBILE TABLE OF CONTENTS (Collapsible Dropdown) */}
        <div className="lg:hidden bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-xs">
          <button
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between font-bold text-sm text-black cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <List className="w-4 h-4 text-gray-700" />
              <span>On this page ({tocItems.length} sections)</span>
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${mobileTocOpen ? 'rotate-180' : ''}`} />
          </button>

          {mobileTocOpen && (
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-black text-white font-bold'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-black'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MAIN CONTENT LAYOUT WITH DESKTOP STICKY SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* DESKTOP STICKY TABLE OF CONTENTS SIDEBAR (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-2 bg-gray-50 border border-gray-200 rounded-3xl p-5 shadow-xs max-h-[80vh] overflow-y-auto">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-black flex items-center gap-2 border-b border-gray-200 pb-3 mb-2">
              <List className="w-4 h-4 text-gray-700" />
              <span>On this page</span>
            </h3>
            
            <nav className="space-y-1 text-xs">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer font-medium ${
                    activeSection === item.id
                      ? 'bg-black text-white font-bold shadow-xs'
                      : 'text-gray-600 hover:text-black hover:bg-gray-200/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* MAIN 14 SECTIONS CONTAINER (9 Cols) */}
          <div className="lg:col-span-9 max-w-4xl space-y-8 text-sm text-gray-800 leading-relaxed font-normal">

            {/* SECTION 1: INTRODUCTION */}
            <section id="introduction" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <FileText className="w-5 h-5 text-black" />
                <span>1. Introduction</span>
              </h2>
              <p>
                Campus Connect is designed to make college communication easier by helping students connect with the right person, department, or service. This Privacy Policy explains how information may be collected, used, stored, and protected when you use Campus Connect.
              </p>
              <p className="text-xs text-gray-600">
                By using Campus Connect, you acknowledge the terms outlined in this document regarding information handling and service routing.
              </p>
            </section>

            {/* SECTION 2: INFORMATION WE MAY COLLECT */}
            <section id="information-collected" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Database className="w-5 h-5 text-black" />
                <span>2. Information We May Collect</span>
              </h2>
              <p>
                Depending on the features used within the application, Campus Connect may collect:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Basic account information</strong> such as name and email address</li>
                <li><strong>Login/authentication information</strong> provided during sign-in</li>
                <li><strong>Student-provided queries or requests</strong> submitted through plain language forms or AI chat</li>
                <li><strong>Ticket/request information</strong> generated for administrative tracking</li>
                <li><strong>Anonymous reports</strong> where applicable when privacy mode is selected</li>
                <li><strong>College-related information</strong> voluntarily provided by the user (such as department or roll number)</li>
                <li><strong>Basic technical information</strong> such as browser/device information and usage data</li>
                <li><strong>Bus tracking/location-related information</strong> only when the relevant shuttle feature requires it</li>
              </ul>
            </section>

            {/* SECTION 3: HOW WE USE INFORMATION */}
            <section id="how-we-use-information" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Cpu className="w-5 h-5 text-black" />
                <span>3. How We Use Information</span>
              </h2>
              <p>Information collected by Campus Connect may be used to:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  "Provide Campus Connect services",
                  "Authenticate users securely",
                  "Respond to student queries",
                  "Route requests to appropriate department/person",
                  "Create and track support tickets",
                  "Improve reliability and user experience",
                  "Maintain security and prevent misuse",
                  "Provide requested features such as bus tracking",
                  "Communicate important service-related information"
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-2 text-xs font-medium text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4: ANONYMOUS REQUESTS */}
            <section id="anonymous-requests" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Lock className="w-5 h-5 text-black" />
                <span>4. Anonymous Requests</span>
              </h2>
              <p>
                Campus Connect may provide anonymous workflows for certain reports or complaints. When a user chooses an anonymous workflow, their identity should not be unnecessarily displayed to the recipient of the report.
              </p>
              <div className="p-4 bg-gray-50 border border-gray-300 rounded-2xl text-xs space-y-2 text-gray-900 font-medium">
                <div className="font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                  <EyeOff className="w-4 h-4 text-emerald-600" />
                  <span>Technical Limitation Notice</span>
                </div>
                <p>
                  "Where the anonymous reporting feature is available, Campus Connect is designed to limit the identity information shown to the receiving party. Technical information may still be processed as necessary for security, reliability, or legal requirements."
                </p>
              </div>
            </section>

            {/* SECTION 5: GOOGLE SIGN-IN / AUTHENTICATION */}
            <section id="google-authentication" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Key className="w-5 h-5 text-black" />
                <span>5. Google Sign-In / Authentication</span>
              </h2>
              <p>
                Users may be able to authenticate using supported single sign-on authentication providers such as Google, Apple, or Microsoft.
              </p>
              <p className="text-xs text-gray-600">
                Campus Connect only uses authentication information (such as verified name and institutional email) necessary to provide account and login functionality. We do not request or claim access to unrelated account data from these third-party providers.
              </p>
            </section>

            {/* SECTION 6: BUS TRACKING */}
            <section id="bus-tracking" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Bus className="w-5 h-5 text-amber-600" />
                <span>6. Bus Tracking</span>
              </h2>
              <p>
                The bus tracking feature may process relevant location or vehicle information required to display shuttle positions, estimated arrival times, and route status.
              </p>
              <p className="text-xs text-gray-600">
                Campus Connect only collects and uses location or shuttle telemetry information necessary to deliver the vehicle tracking functionality provided by the application.
              </p>
            </section>

            {/* SECTION 7: DATA SHARING */}
            <section id="data-sharing" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Users className="w-5 h-5 text-black" />
                <span>7. Data Sharing</span>
              </h2>
              <p>
                Campus Connect does not intend to sell users' personal information.
              </p>
              <p>
                Information may be shared with appropriate college departments, staff, or service providers when necessary to provide the requested service. For example:
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-semibold text-black">
                Student issue raised ➔ Appropriate college department / authorized person
              </div>
              <p className="text-xs text-gray-600">
                The specific information shared depends on the feature being used and the user's interaction with the platform.
              </p>
            </section>

            {/* SECTION 8: DATA SECURITY */}
            <section id="data-security" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>8. Data Security</span>
              </h2>
              <p>
                We employ reasonable technical and organizational security measures to safeguard user information against unauthorized access, loss, or alteration.
              </p>
              <div className="p-4 bg-gray-50 border border-gray-300 rounded-2xl text-xs text-gray-800 font-medium">
                "We take reasonable measures to protect information from unauthorized access, alteration, disclosure, or destruction. However, no online service can guarantee absolute security."
              </div>
            </section>

            {/* SECTION 9: DATA RETENTION */}
            <section id="data-retention" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Server className="w-5 h-5 text-black" />
                <span>9. Data Retention</span>
              </h2>
              <p>
                Information may be retained only for as long as reasonably necessary to provide services, maintain administrative records, resolve student requests, improve the platform, comply with legal obligations, or protect system security.
              </p>
            </section>

            {/* SECTION 10: YOUR CHOICES AND RIGHTS */}
            <section id="your-choices-and-rights" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <CheckCircle2 className="w-5 h-5 text-black" />
                <span>10. Your Choices and Rights</span>
              </h2>
              <p>Users may have choices regarding:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Managing their account information within profile settings</li>
                <li>Information submitted through requests and queries</li>
                <li>Choosing anonymous reporting where supported</li>
                <li>Account deletion where supported by the institution</li>
                <li>Contacting Campus Connect regarding privacy questions</li>
              </ul>
            </section>

            {/* SECTION 11: CHILDREN'S PRIVACY */}
            <section id="childrens-privacy" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <ShieldCheck className="w-5 h-5 text-black" />
                <span>11. Children's Privacy</span>
              </h2>
              <p>
                Campus Connect is intended for college users and higher education students. We do not knowingly collect personal information from children where prohibited by applicable law.
              </p>
            </section>

            {/* SECTION 12: THIRD-PARTY SERVICES */}
            <section id="third-party-services" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Server className="w-5 h-5 text-black" />
                <span>12. Third-Party Services</span>
              </h2>
              <p>Campus Connect uses trusted third-party infrastructure for specific functions:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="font-bold text-black text-xs">Vercel</div>
                  <div className="text-[11px] text-gray-600">Application hosting & global edge distribution infrastructure</div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="font-bold text-black text-xs">Supabase</div>
                  <div className="text-[11px] text-gray-600">Database & authentication session management</div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="font-bold text-black text-xs">Google / Apple / Microsoft OAuth</div>
                  <div className="text-[11px] text-gray-600">Identity verification and single sign-on authentication</div>
                </div>
              </div>
            </section>

            {/* SECTION 13: CHANGES TO THIS PRIVACY POLICY */}
            <section id="policy-changes" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <FileText className="w-5 h-5 text-black" />
                <span>13. Changes to This Privacy Policy</span>
              </h2>
              <p>
                This Privacy Policy may be updated when the application, features, or legal requirements change. The revised policy will be posted on this page.
              </p>
              <div className="text-xs font-mono font-bold text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200 inline-block">
                Last updated: September 29, 2026
              </div>
            </section>

            {/* SECTION 14: CONTACT US */}
            <section id="contact-us" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Mail className="w-5 h-5 text-black" />
                <span>14. Contact Us</span>
              </h2>
              <div className="space-y-2">
                <h3 className="font-bold text-black text-base">Campus Connect</h3>
                <p>
                  For privacy-related questions, users can contact the Campus Connect project team through the contact method provided by the application.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
                >
                  Return to Overview
                </button>
              </div>
            </section>

          </div>

        </div>

      </div>

    </div>
  );
}
