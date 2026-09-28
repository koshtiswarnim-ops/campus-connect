import React, { useState } from 'react';
import { 
  User, Mail, ShieldCheck, GraduationCap, Building, 
  KeyRound, Clock, CheckCircle2, Ticket, ArrowLeft, LogOut, 
  Sparkles, Save, Bell, Smartphone
} from 'lucide-react';

export default function UserProfile({ currentUser, queries = [], onUpdateUser, onLogout, onBack }) {
  if (!currentUser) return null;

  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [rollNo, setRollNo] = useState(currentUser.rollNo || '2024CS104');
  const [department, setDepartment] = useState(currentUser.department || 'Computer Science & Engineering');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Compute user query statistics
  const userQueries = queries.filter(q => 
    q.studentName?.toLowerCase().includes(currentUser.name?.toLowerCase()) || 
    currentUser.role === 'admin'
  );
  const totalCount = userQueries.length;
  const activeCount = userQueries.filter(q => q.status !== 'Resolved').length;
  const resolvedCount = userQueries.filter(q => q.status === 'Resolved').length;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...currentUser,
      name,
      email,
      rollNo: currentUser.role === 'student' ? rollNo : undefined,
      department: currentUser.role === 'admin' ? department : undefined
    };
    if (onUpdateUser) onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-white text-gray-900 min-h-screen">
      
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
          User ID: {currentUser.id || 'usr_2026_x89'}
        </span>
      </div>

      {/* Main Profile Header Banner Card */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs">

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
          {/* Avatar Icon */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-black text-white font-extrabold text-3xl sm:text-4xl flex items-center justify-center shadow-md">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white text-xs shadow-md" title="Account Active">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* User Basic Summary */}
          <div className="space-y-2.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                {currentUser.name}
              </h1>

              {/* Role Badge */}
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 bg-gray-100 text-gray-800 border border-gray-200">
                {currentUser.role === 'admin' ? (
                  <>
                    <Building className="w-3.5 h-3.5" />
                    <span>Staff / Warden</span>
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Student Account</span>
                  </>
                )}
              </span>
            </div>

            <p className="text-sm text-gray-600 font-medium">
              {currentUser.email}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-gray-600">
              {currentUser.role === 'student' && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                  <User className="w-3.5 h-3.5 text-black" />
                  <span>Roll No: <strong className="text-black">{currentUser.rollNo || '2024CS104'}</strong></span>
                </div>
              )}

              {currentUser.role === 'admin' && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                  <Building className="w-3.5 h-3.5 text-black" />
                  <span>Dept: <strong className="text-black">{currentUser.department || 'Hostel Administration'}</strong></span>
                </div>
              )}

              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Status: <strong className="text-emerald-700">Verified & Active</strong></span>
              </div>
            </div>
          </div>

          {/* Logout Action Button */}
          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <span>Total Queries Raised</span>
            <Ticket className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-extrabold text-black">
            {totalCount}
          </div>
          <div className="text-[11px] text-gray-500">Recorded in Campus Connect</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <span>Active In-Progress</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600">
            {activeCount}
          </div>
          <div className="text-[11px] text-gray-500">Currently being processed</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <span>Resolved Queries</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">
            {resolvedCount}
          </div>
          <div className="text-[11px] text-gray-500">100% SLA Resolution Rate</div>
        </div>
      </div>

      {/* Profile Edit Form & Security Details Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Edit Profile Form */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <h3 className="text-lg font-bold text-black flex items-center gap-2">
              <User className="w-5 h-5 text-black" />
              <span>Personal Profile Information</span>
            </h3>
            {savedSuccess && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" /> Profile Updated!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Campus Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black font-medium"
                />
              </div>
            </div>

            {currentUser.role === 'student' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Student Roll Number
                  </label>
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Branch / Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black font-medium"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Assigned Staff Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black font-medium"
                />
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Security & Authentication Provider Info */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-5 shadow-xs">
          <h3 className="text-lg font-bold text-black flex items-center gap-2 pb-3 border-b border-gray-200">
            <KeyRound className="w-5 h-5 text-black" />
            <span>Security & Auth Provider</span>
          </h3>

          <div className="space-y-3.5 text-xs">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl space-y-1">
              <div className="font-semibold text-gray-800">Authentication Method</div>
              <div className="text-gray-600 capitalize flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentUser.provider ? `${currentUser.provider} SSO Single Sign-On` : 'Encrypted Campus Password Auth'}</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl space-y-1">
              <div className="font-semibold text-gray-800">Account Authorization Level</div>
              <div className="text-gray-600 capitalize">
                {currentUser.role === 'admin' ? 'Staff & Department Warden Access' : 'Verified Student Portal User'}
              </div>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl space-y-1">
              <div className="font-semibold text-gray-800">Push Notifications & Alerts</div>
              <div className="text-gray-600 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-black" />
                <span>Enabled for Query Status Updates</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
