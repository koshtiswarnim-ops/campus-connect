import React from 'react';
import { 
  ShieldCheck, Lock, ArrowLeft, EyeOff, FileText, CheckCircle2, 
  Sparkles, Mail, Server, Cpu, Bus, HelpCircle 
} from 'lucide-react';

export default function PrivacyPolicy({ onBack, onNavigateToModule }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-gray-900 min-h-screen">
      
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-black font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Campus Connect</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 bg-slate-900 text-white rounded-full font-bold flex items-center gap-1">
            <Lock className="w-3 h-3 text-amber-400" /> FERPA & GDPR Compliant
          </span>
          <span className="text-xs text-gray-500 font-medium hidden sm:inline">
            Last updated: September 29, 2026
          </span>
        </div>
      </div>

      {/* Hero Banner Card */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-bold text-gray-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Official Institutional Privacy Charter</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
          Campus Connect Privacy Policy & Data Protection Charter
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
          Campus Connect is committed to protecting student confidentiality, safeguarding institutional communications, and providing 100% encrypted anonymous reporting channels. This Privacy Policy details how we collect, process, and protect your data.
        </p>

        {/* Quick Highlights Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
              <EyeOff className="w-4 h-4 text-emerald-600" />
              <span>Identity Encryption</span>
            </div>
            <p className="text-xs text-gray-600">
              Anonymous queries strip student names, roll numbers, and emails from all staff & warden dashboards.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-black" />
              <span>AI Intent Security</span>
            </div>
            <p className="text-xs text-gray-600">
              Natural language queries are processed strictly for intent classification without selling student data.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
              <Bus className="w-4 h-4 text-amber-600" />
              <span>Bus GPS Privacy</span>
            </div>
            <p className="text-xs text-gray-600">
              Shuttle telemetry tracks physical campus buses only—never student personal device location.
            </p>
          </div>
        </div>
      </div>

      {/* Main Privacy Policy Document Body */}
      <div className="space-y-8 text-sm text-gray-800 leading-relaxed font-normal">

        {/* Section 1: Anonymous Submissions & Student Protection */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
            <Lock className="w-5 h-5 text-black" />
            <span>1. 100% Anonymous Query Submissions & Identity Protection</span>
          </h2>
          <p>
            Campus Connect features built-in <strong>Anonymous Submissions</strong> to encourage safe reporting of sensitive campus issues, including hostel maintenance defaults, ragging concerns, financial hardship requests, or examination discrepancies.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Data Masking:</strong> When you select "Submit Anonymously", your name, student roll number, and email address are encrypted and completely stripped from warden and staff views.
            </li>
            <li>
              <strong>Staff Visibility:</strong> College wardens and administrators can only view the issue category, query text, and SLA status needed to resolve your ticket.
            </li>
            <li>
              <strong>Immutable Privacy:</strong> Once a query is submitted anonymously, it cannot be unmasked by department staff.
            </li>
          </ul>
        </section>

        {/* Section 2: Data We Collect */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
            <FileText className="w-5 h-5 text-black" />
            <span>2. Information We Collect & Purpose Scoping</span>
          </h2>
          <p>
            We collect minimal information necessary to deliver student services, manage department routing, and provide automated query resolution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="font-bold text-black text-xs uppercase tracking-wider">Account Credentials</h3>
              <p className="text-xs text-gray-600">
                Institutional email address, student roll number, full name, and department affiliation when authenticated via SSO (Google, Apple, Microsoft) or password.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="font-bold text-black text-xs uppercase tracking-wider">Query Logs & Activity History</h3>
              <p className="text-xs text-gray-600">
                Submitted query descriptions, category tags, resolution SLA timestamps, official messaging logs, and service feedback ratings.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: AI Processing & Privacy */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>3. Natural Language AI Query Classification</span>
          </h2>
          <p>
            Our Natural Language AI engine analyzes student query text to automatically detect intent, assign priority levels (Urgent, High, Normal), and route tickets to responsible department desks.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>No Data Selling:</strong> Student query text is never sold to third-party data brokers or advertising networks.
            </li>
            <li>
              <strong>Isolated AI Training:</strong> AI classification models are strictly isolated to institutional service routing and FAQ resolution.
            </li>
          </ul>
        </section>

        {/* Section 4: Live Bus GPS Telemetry */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
            <Bus className="w-5 h-5 text-amber-600" />
            <span>4. Campus Bus GPS Telemetry & Location Privacy</span>
          </h2>
          <p>
            The Live Bus GPS Telemetry feature monitors designated campus shuttle vehicles (Buses G1 through G100).
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Vehicle Tracking Only:</strong> GPS coordinates are collected solely from hardware telematics installed inside college buses.
            </li>
            <li>
              <strong>No Device Tracking:</strong> Campus Connect does not track student mobile phone GPS or background location.
            </li>
          </ul>
        </section>

        {/* Section 5: Data Security & Governance */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
            <Server className="w-5 h-5 text-black" />
            <span>5. Encryption, Security & Governance</span>
          </h2>
          <p>
            Campus Connect employs end-to-end transport layer security (TLS 1.3) and AES-256 data encryption at rest. Access to administration desks is protected by strict Role-Based Access Control (RBAC).
          </p>
        </section>

        {/* Section 6: Student Rights & Contact */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-black flex items-center gap-2 border-b border-gray-100 pb-3">
            <Mail className="w-5 h-5 text-black" />
            <span>6. Student Data Rights & Contact Information</span>
          </h2>
          <p>
            Students have the right to inspect, rectify, or request deletion of their account records and non-anonymous query logs in accordance with institutional data retention policies.
          </p>
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-black text-sm">Institutional Data Protection Officer (DPO)</div>
              <div className="text-xs text-gray-600">Email: <a href="mailto:privacy@campusconnect.edu" className="font-semibold text-black hover:underline">privacy@campusconnect.edu</a></div>
            </div>
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-xs transition-all cursor-pointer shadow-sm"
            >
              Return to Campus Portal
            </button>
          </div>
        </section>

      </div>

    </div>
  );
}
