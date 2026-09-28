import React, { useState } from 'react';
import { X, Check, Plus, ShieldCheck, ArrowRight, User } from 'lucide-react';

export default function OAuthAccountModal({ provider, isOpen, onClose, onSelectAccount }) {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  if (!isOpen || !provider) return null;

  // Preset quick accounts per provider
  const getSuggestedAccounts = () => {
    if (provider === 'google') {
      return [
        { name: 'Swarnim Koshti', email: 'koshtiswarnim@gmail.com', avatar: 'S', color: 'bg-black' },
        { name: 'Student Campus Account', email: 'student.rahul@gmail.com', avatar: 'R', color: 'bg-slate-800' }
      ];
    } else if (provider === 'apple') {
      return [
        { name: 'Swarnim (Apple ID)', email: 'swarnim.apple@icloud.com', avatar: '', color: 'bg-black' }
      ];
    } else {
      // Microsoft
      return [
        { name: 'Campus Student Office 365', email: 'rahul.sharma@campus.edu', avatar: 'M', color: 'bg-black' },
        { name: 'Swarnim Microsoft', email: 'swarnim@outlook.com', avatar: 'S', color: 'bg-slate-800' }
      ];
    }
  };

  const handleSelect = (account) => {
    onSelectAccount({
      name: account.name,
      email: account.email,
      provider: provider,
      role: 'student'
    });
  };

  const handleCreateCustom = (e) => {
    e.preventDefault();
    if (!customEmail) return;
    onSelectAccount({
      name: customName || customEmail.split('@')[0],
      email: customEmail,
      provider: provider,
      role: 'student'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 relative animate-scaleIn text-gray-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Provider Header */}
        <div className="text-center space-y-2 pt-2">
          {provider === 'google' && (
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto shadow-xs">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>
          )}

          {provider === 'apple' && (
            <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mx-auto shadow-xs">
              <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.82c.67-.82 1.13-1.97.99-3.12-1 .04-2.19.67-2.88 1.47-.62.72-1.16 1.89-.99 3.01 1.11.09 2.22-.54 2.88-1.36z"/>
              </svg>
            </div>
          )}

          {provider === 'azure' && (
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto shadow-xs">
              <svg className="w-7 h-7" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
            </div>
          )}

          <h3 className="text-xl font-bold tracking-tight text-black">
            Sign in with {provider === 'google' ? 'Google' : provider === 'apple' ? 'Apple ID' : 'Microsoft'}
          </h3>
          <p className="text-xs text-gray-500">
            Choose an account to continue to <span className="font-semibold text-black">Campus Connect</span>
          </p>
        </div>

        {/* Account Selector Body */}
        {!isAddingNew ? (
          <div className="space-y-3">
            <div className="space-y-2">
              {getSuggestedAccounts().map((acc, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(acc)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${acc.color} text-white font-bold flex items-center justify-center text-sm shadow-xs`}>
                      {acc.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-black group-hover:underline transition-colors">
                        {acc.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {acc.email}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {/* Add Custom Account Option */}
            <button
              onClick={() => setIsAddingNew(true)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl border border-dashed border-gray-300 text-gray-700 hover:text-black hover:border-black text-xs font-semibold transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </div>
              <span>Use another {provider === 'google' ? 'Google' : provider === 'apple' ? 'Apple ID' : 'Microsoft'} account</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleCreateCustom} className="space-y-3.5 pt-1">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Swarnim Koshti"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                {provider === 'google' ? 'Google Email' : provider === 'apple' ? 'Apple ID Email' : 'Microsoft / Campus Email'}
              </label>
              <input
                type="email"
                required
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder={provider === 'google' ? 'user@gmail.com' : provider === 'apple' ? 'user@icloud.com' : 'user@campus.edu'}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="w-1/2 py-2.5 rounded-xl bg-gray-100 text-gray-800 font-semibold text-xs hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Continue</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Security Footer Notice */}
        <div className="text-center text-[11px] text-gray-500 flex items-center justify-center gap-1.5 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted Single Sign-On session protected by Campus Connect</span>
        </div>

      </div>
    </div>
  );
}
