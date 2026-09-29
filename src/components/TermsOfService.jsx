import React, { useState, useEffect } from 'react';
import { 
  FileText, ShieldCheck, CheckCircle2, Home, List, ChevronDown, 
  AlertTriangle, Lock, Cpu, Bus, Users, Server, Scale, UserCheck, 
  HelpCircle, Mail, ExternalLink, ArrowLeft, Ban
} from 'lucide-react';

export default function TermsOfService({ onBack, onNavigateToModule }) {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('acceptance-of-terms');

  useEffect(() => {
    // Set page metadata for SEO
    document.title = "Campus Connect | Terms of Service";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Terms of Service for Campus Connect, an AI-powered college communication and assistance platform.');
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
    { id: 'acceptance-of-terms', label: '1. Acceptance of Terms' },
    { id: 'about-campus-connect', label: '2. About Campus Connect' },
    { id: 'eligibility-and-account', label: '3. Eligibility and Account' },
    { id: 'acceptable-use', label: '4. Acceptable Use' },
    { id: 'student-queries-and-requests', label: '5. Student Queries and Requests' },
    { id: 'anonymous-reporting', label: '6. Anonymous Reporting' },
    { id: 'ai-assisted-features', label: '7. AI-Assisted Features' },
    { id: 'bus-tracking', label: '8. Bus Tracking' },
    { id: 'user-content', label: '9. User Content' },
    { id: 'privacy', label: '10. Privacy' },
    { id: 'third-party-services', label: '11. Third-Party Services' },
    { id: 'service-availability', label: '12. Service Availability' },
    { id: 'intellectual-property', label: '13. Intellectual Property' },
    { id: 'suspension-or-termination', label: '14. Suspension or Termination' },
    { id: 'disclaimer', label: '15. Disclaimer' },
    { id: 'limitation-of-liability', label: '16. Limitation of Liability' },
    { id: 'changes-to-terms', label: '17. Changes to These Terms' },
    { id: 'contact', label: '18. Contact' }
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
    <div className="bg-white text-gray-900 min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Main Container */}
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
            <li className="text-black font-bold">Terms of Service</li>
          </ol>

          <span className="text-xs font-mono text-gray-500 font-medium">
            Last updated: September 29, 2026
          </span>
        </nav>

        {/* HERO SECTION */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-bold text-gray-900">
            <Scale className="w-4 h-4 text-black" />
            <span>Campus Connect Platform Guidelines</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-black tracking-tight">
            Terms of Service
          </h1>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
            These terms explain the rules and conditions for using Campus Connect.
          </p>

          <div className="pt-2 text-xs text-gray-500 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Applies to Campus Connect Web Portal, AI Assistant, Department Routing, and Bus Tracking</span>
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

          {/* MAIN 18 SECTIONS CONTAINER (9 Cols) */}
          <div className="lg:col-span-9 max-w-4xl space-y-8 text-sm text-gray-800 leading-relaxed font-normal">

            {/* SECTION 1: ACCEPTANCE OF TERMS */}
            <section id="acceptance-of-terms" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <FileText className="w-5 h-5 text-black" />
                <span>1. Acceptance of Terms</span>
              </h2>
              <p>
                By accessing or using Campus Connect, you agree to be bound by these Terms of Service.
              </p>
              <p className="text-xs text-gray-600">
                If you do not agree with any part of these terms, you should not access or use the Campus Connect platform.
              </p>
            </section>

            {/* SECTION 2: ABOUT CAMPUS CONNECT */}
            <section id="about-campus-connect" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <HelpCircle className="w-5 h-5 text-black" />
                <span>2. About Campus Connect</span>
              </h2>
              <p>
                Campus Connect is a smart college communication and assistance platform designed to streamline student query resolution, department routing, and campus information access.
              </p>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs space-y-2 text-gray-900 font-medium">
                <div className="font-extrabold text-black text-xs uppercase tracking-wider">Platform Core Mission</div>
                <p>
                  "One bot. Every query. Right person, right away." — Campus Connect helps students submit academic questions, find college information, communicate with appropriate campus departments or staff, and track support requests.
                </p>
              </div>
            </section>

            {/* SECTION 3: ELIGIBILITY AND ACCOUNT */}
            <section id="eligibility-and-account" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <UserCheck className="w-5 h-5 text-black" />
                <span>3. Eligibility and Account</span>
              </h2>
              <p>
                Users are responsible for providing accurate and truthful information when creating an account or submitting queries through the platform.
              </p>
              <p className="text-xs text-gray-600">
                You are responsible for maintaining the security and confidentiality of your login credentials. You accept responsibility for all activities that occur under your account session.
              </p>
            </section>

            {/* SECTION 4: ACCEPTABLE USE */}
            <section id="acceptable-use" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Ban className="w-5 h-5 text-red-600" />
                <span>4. Acceptable Use</span>
              </h2>
              <p>
                Users must use Campus Connect responsibly and ethically. When interacting with the service, you agree not to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  "Submit false or deliberately misleading information",
                  "Harass, threaten, or abuse students, staff, or administration",
                  "Impersonate another person or student identity",
                  "Attempt unauthorized access to admin or staff controls",
                  "Disrupt, overburden, or damage the platform service",
                  "Upload or transmit malicious code or scripts",
                  "Abuse anonymous reporting or support ticketing features",
                  "Use the platform for any illegal or unauthorized activities"
                ].map((rule, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-2 text-xs font-medium text-gray-800">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: STUDENT QUERIES AND REQUESTS */}
            <section id="student-queries-and-requests" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Users className="w-5 h-5 text-black" />
                <span>5. Student Queries and Requests</span>
              </h2>
              <p>
                Campus Connect routes queries or support tickets to relevant college departments (such as Admissions, Academics, Finance, Hostel, or Health), staff, or wardens depending on the nature of the request.
              </p>
              <p className="text-xs text-gray-600">
                While the system aims to streamline communication, Campus Connect does not guarantee an immediate or instant response for every submitted query.
              </p>
            </section>

            {/* SECTION 6: ANONYMOUS REPORTING */}
            <section id="anonymous-reporting" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Lock className="w-5 h-5 text-black" />
                <span>6. Anonymous Reporting</span>
              </h2>
              <p>
                Where available, Campus Connect provides anonymous reporting options for sensitive campus concerns.
              </p>
              <div className="p-4 bg-gray-50 border border-gray-300 rounded-2xl text-xs space-y-2 text-gray-900 font-medium">
                <div className="font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Privacy Notice for Anonymous Reporting</span>
                </div>
                <p>
                  "Where the anonymous reporting feature is available, the platform is designed to limit the identity information shown to the receiving department or party. Technical metadata may still be logged as necessary for system security and abuse prevention."
                </p>
              </div>
            </section>

            {/* SECTION 7: AI-ASSISTED FEATURES */}
            <section id="ai-assisted-features" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Cpu className="w-5 h-5 text-black" />
                <span>7. AI-Assisted Features</span>
              </h2>
              <p>
                Campus Connect incorporates AI-assisted capabilities to help categorize student inquiries, suggest relevant FAQ guidance, and assist with initial query processing.
              </p>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs space-y-2 text-amber-950 font-medium">
                <div className="font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Important AI Information Disclaimer</span>
                </div>
                <p className="text-xs leading-relaxed font-semibold">
                  "AI-generated responses may contain errors or incomplete information. Users should verify important information with the appropriate college authority."
                </p>
              </div>
            </section>

            {/* SECTION 8: BUS TRACKING */}
            <section id="bus-tracking" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Bus className="w-5 h-5 text-amber-600" />
                <span>8. Bus Tracking</span>
              </h2>
              <p>
                Where shuttle GPS tracking is available, location status and route information are provided for informational and convenience purposes only.
              </p>
              <p className="text-xs text-gray-600">
                Bus locations and estimated arrival times depend on telemetry signals, traffic conditions, and network availability. Status information may not always be perfectly accurate or available in real time.
              </p>
            </section>

            {/* SECTION 9: USER CONTENT */}
            <section id="user-content" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <FileText className="w-5 h-5 text-black" />
                <span>9. User Content</span>
              </h2>
              <p>
                Users may submit text, queries, complaints, or attachments through the platform.
              </p>
              <p className="text-xs text-gray-600">
                You retain ownership of content you submit, but you grant Campus Connect the necessary rights to process, store, and route your content to fulfill your service requests. You must not submit content that you do not have the right to share or that infringes on third-party rights.
              </p>
            </section>

            {/* SECTION 10: PRIVACY */}
            <section id="privacy" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Lock className="w-5 h-5 text-black" />
                <span>10. Privacy</span>
              </h2>
              <p>
                Your use of Campus Connect is also governed by our Privacy Policy, which details our data practices and student information protection.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (onNavigateToModule) {
                      onNavigateToModule('privacy');
                    } else {
                      window.location.href = '/privacy';
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Read Full Privacy Policy (/privacy)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* SECTION 11: THIRD-PARTY SERVICES */}
            <section id="third-party-services" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Server className="w-5 h-5 text-black" />
                <span>11. Third-Party Services</span>
              </h2>
              <p>
                Campus Connect relies on established cloud infrastructure providers to operate securely:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="font-bold text-black text-xs">Vercel</div>
                  <div className="text-[11px] text-gray-600">Application hosting, CDN deployment, and edge routing</div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="font-bold text-black text-xs">Supabase</div>
                  <div className="text-[11px] text-gray-600">Database storage, API, and authentication management</div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="font-bold text-black text-xs">OAuth Providers</div>
                  <div className="text-[11px] text-gray-600">Single sign-on identity verification services</div>
                </div>
              </div>
            </section>

            {/* SECTION 12: SERVICE AVAILABILITY */}
            <section id="service-availability" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Server className="w-5 h-5 text-black" />
                <span>12. Service Availability</span>
              </h2>
              <p>
                Campus Connect is provided on an "as is" and "as available" basis.
              </p>
              <p className="text-xs text-gray-600">
                Temporary service interruptions may occur due to routine maintenance, system updates, network connectivity issues, or third-party service downtime. We do not guarantee uninterrupted uptime.
              </p>
            </section>

            {/* SECTION 13: INTELLECTUAL PROPERTY */}
            <section id="intellectual-property" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <ShieldCheck className="w-5 h-5 text-black" />
                <span>13. Intellectual Property</span>
              </h2>
              <p>
                The Campus Connect application, source code, branding, interface designs, logos, and original content are protected by intellectual property laws.
              </p>
              <p className="text-xs text-gray-600">
                Users may not copy, reverse-engineer, modify, distribute, or create derivative works from protected platform components without prior written permission.
              </p>
            </section>

            {/* SECTION 14: SUSPENSION OR TERMINATION */}
            <section id="suspension-or-termination" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Ban className="w-5 h-5 text-black" />
                <span>14. Suspension or Termination</span>
              </h2>
              <p>
                We reserve the right to restrict, suspend, or terminate user access to Campus Connect when necessary to protect system security, enforce acceptable use policies, or prevent misuse.
              </p>
            </section>

            {/* SECTION 15: DISCLAIMER */}
            <section id="disclaimer" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>15. Disclaimer</span>
              </h2>
              <p>
                Campus Connect is designed to assist college students and facilitate communication.
              </p>
              <div className="p-4 bg-gray-50 border border-gray-300 rounded-2xl text-xs text-gray-800 font-medium leading-relaxed">
                Campus Connect is an informational and assistance tool. It should not be treated as a substitute for official college policy documents, formal administrative notices, emergency service dispatchers, or professional legal/medical advice.
              </div>
            </section>

            {/* SECTION 16: LIMITATION OF LIABILITY */}
            <section id="limitation-of-liability" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Scale className="w-5 h-5 text-black" />
                <span>16. Limitation of Liability</span>
              </h2>
              <p>
                To the maximum extent permitted by applicable law, Campus Connect and its operators are not liable for losses or damages arising from misuse of the platform, inaccurate user-provided information, temporary service outages, or reliance on AI-generated suggestions.
              </p>
            </section>

            {/* SECTION 17: CHANGES TO THESE TERMS */}
            <section id="changes-to-terms" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <FileText className="w-5 h-5 text-black" />
                <span>17. Changes to These Terms</span>
              </h2>
              <p>
                These Terms of Service may be updated periodically to reflect changes in our service offerings, technical architecture, or administrative guidelines.
              </p>
              <div className="text-xs font-mono font-bold text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200 inline-block">
                Last updated: September 29, 2026
              </div>
            </section>

            {/* SECTION 18: CONTACT */}
            <section id="contact" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-24">
              <h2 className="text-xl font-extrabold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Mail className="w-5 h-5 text-black" />
                <span>Questions about these Terms?</span>
              </h2>
              <div className="space-y-2">
                <h3 className="font-bold text-black text-base">Campus Connect Support Desk</h3>
                <p className="text-xs text-gray-600">
                  If you have questions regarding these Terms of Service, please reach out through the official Campus Connect support and query channels within the application.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Overview</span>
                </button>
              </div>
            </section>

          </div>

        </div>

      </div>

    </div>
  );
}
