import React, { useState } from 'react';
import { Truck, LayoutDashboard, PlusCircle, Navigation, CheckCircle2, AlertCircle, Clock, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dummy State for Workflow Visualization (Next step me API se replace ho jayega)
  const [trips, setTrips] = useState([
    { _id: '1', tripId: 'TRIP-101', destination: 'Gurugram Factory Warehouse', cargoDetails: 'Industrial Steel Coils (12 Tons)', deliveryStatus: 'Scheduled', vehicleId: { vehicleNumber: 'DL-3C-1122', driverName: 'Satish Kumar' } },
    { _id: '2', tripId: 'TRIP-102', destination: 'Okhla Industrial Area Phase-3', cargoDetails: 'Automotive Component Consignment', deliveryStatus: 'In Transit', vehicleId: { vehicleNumber: 'HR-55-9876', driverName: 'Manpreet Singh' } },
    { _id: '3', tripId: 'TRIP-103', destination: 'Noida Sector-62 Distribution Hub', cargoDetails: 'Raw Aluminium Billets', deliveryStatus: 'Delivered', vehicleId: { vehicleNumber: 'UP-16-4321', driverName: 'Amit Sharma' } },
  ]);

  // Handler for immediate workflow status transition
  const handleStatusTransition = (id, currentStatus) => {
    let nextStatus = 'Scheduled';
    if (currentStatus === 'Scheduled') nextStatus = 'In Transit';
    else if (currentStatus === 'In Transit') nextStatus = 'Delivered';
    else return; // Delivered stays Delivered

    setTrips(prev => prev.map(t => t._id === id ? { ...t, deliveryStatus: nextStatus } : t));
  };

  // Metrics Counter Computations
  const scheduledCount = trips.filter(t => t.deliveryStatus === 'Scheduled').length;
  const inTransitCount = trips.filter(t => t.deliveryStatus === 'In Transit').length;
  const deliveredCount = trips.filter(t => t.deliveryStatus === 'Delivered').length;

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col justify-between shadow-xl">
        <div>
          <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/30">
              <Truck size={24} />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight tracking-wide text-white">LogiMfg AI</h2>
              <span className="text-xs text-slate-400 font-medium">Transport Workspace</span>
            </div>
          </div>

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
        <div className="p-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500 font-medium">Isaii AI Assessment Round</p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
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
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Logistics Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">Real-time breakdown of trips, ongoing journeys, and industrial vehicle telemetry.</p>
              </div>

              {/* METRICS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Scheduled Dispatches</span>
                    <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{scheduledCount}</h3>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-xl text-amber-600"><Clock size={24} /></div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active In Transit</span>
                    <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{inTransitCount}</h3>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><Navigation size={24} /></div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Successful Deliveries</span>
                    <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{deliveredCount}</h3>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600"><CheckCircle2 size={24} /></div>
                </div>
              </div>

              {/* OPERATIONS WORKFLOW GRID */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-base">Active Supply Chain Shipments</h3>
                  <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-semibold">{trips.length} Total Registered</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {trips.map((trip) => (
                    <div key={trip._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors duration-150">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold bg-slate-900 text-slate-100 px-2 py-0.5 rounded">
                            {trip.tripId}
                          </span>
                          <h4 className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
                            <MapPin size={15} className="text-slate-400" />
                            {trip.destination}
                          </h4>
                        </div>
                        <p className="text-xs md:text-sm text-slate-500 font-medium">Cargo: {trip.cargoDetails}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                          <span>🚚 Fleet No: <strong>{trip.vehicleId.vehicleNumber}</strong></span>
                          <span>👤 Driver: <strong>{trip.vehicleId.driverName}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 justify-between md:justify-end">
                        {/* Dynamic Status Badge */}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          trip.deliveryStatus === 'Scheduled' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          trip.deliveryStatus === 'In Transit' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {trip.deliveryStatus}
                        </span>

                        {/* Action Workflow Button */}
                        {trip.deliveryStatus !== 'Delivered' && (
                          <button
                            onClick={() => handleStatusTransition(trip._id, trip.deliveryStatus)}
                            className="text-xs bg-slate-950 text-white font-semibold px-4 py-2 rounded-xl hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
                          >
                            {trip.deliveryStatus === 'Scheduled' ? 'Dispatch Consignment' : 'Mark as Delivered'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Fleet & Operations</h1>
              <p className="text-sm text-slate-500 mt-1">Register new heavy machinery vehicles or deploy transport shipments across channels.</p>
              
              <div className="mt-6 p-12 bg-white rounded-2xl border border-slate-200 text-center text-slate-400">
                Forms management section layout skeleton.
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}