import React, { useState } from 'react';
import { Truck, LayoutDashboard, PlusCircle, Navigation, Layers, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col justify-between shadow-xl">
        <div>
          {/* Company Branding Logo Area */}
          <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/30">
              <Truck size={24} />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight tracking-wide text-white">LogiMfg AI</h2>
              <span className="text-xs text-slate-400 font-medium">Transport Workspace</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Logistics Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('manage')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'manage'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <PlusCircle size={18} />
              <span>Manage Fleet & Trips</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500 font-medium">Isaii AI Assessment Round</p>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Navigation size={16} className="text-blue-600 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Live Infrastructure Monitoring</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium border border-emerald-200">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span>System Operational</span>
          </div>
        </header>

        {/* Dynamic Content Views */}
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {activeTab === 'dashboard' ? (
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Logistics Dashboard</h1>
              <p className="text-sm text-slate-500 mt-1">Real-time breakdown of trips, ongoing journeys, and industrial vehicle telemetry.</p>
              
              {/* Dummy Placeholder for Analytics Cards to test state changes */}
              <div className="mt-6 p-12 bg-white rounded-2xl border border-slate-200 text-center text-slate-400">
                Dashboard Grid content will sit right here.
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Fleet & Operations</h1>
              <p className="text-sm text-slate-500 mt-1">Register new heavy machinery vehicles or deploy transport shipments across channels.</p>
              
              {/* Dummy Placeholder for Forms */}
              <div className="mt-6 p-12 bg-white rounded-2xl border border-slate-200 text-center text-slate-400">
                Management Forms will sit right here.
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}