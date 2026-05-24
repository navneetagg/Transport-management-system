import React, { useState } from 'react';
import { Truck, LayoutDashboard, PlusCircle, Navigation, CheckCircle2, Clock, MapPin, Plus, ListFilter } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dummy State for Vehicles
  const [vehicles, setVehicles] = useState([
    { _id: 'v1', vehicleNumber: 'DL-3C-1122', driverName: 'Satish Kumar', driverPhone: '9876543210', status: 'Available' },
    { _id: 'v2', vehicleNumber: 'HR-55-9876', driverName: 'Manpreet Singh', driverPhone: '8765432109', status: 'On Journey' },
    { _id: 'v3', vehicleNumber: 'UP-16-4321', driverName: 'Amit Sharma', driverPhone: '7654321098', status: 'Available' },
  ]);

  // Dummy State for Trips
  const [trips, setTrips] = useState([
    { _id: '1', tripId: 'TRIP-101', destination: 'Gurugram Factory Warehouse', cargoDetails: 'Industrial Steel Coils (12 Tons)', deliveryStatus: 'Scheduled', vehicleId: { vehicleNumber: 'DL-3C-1122', driverName: 'Satish Kumar' } },
    { _id: '2', tripId: 'TRIP-102', destination: 'Okhla Industrial Area Phase-3', cargoDetails: 'Automotive Component Consignment', deliveryStatus: 'In Transit', vehicleId: { vehicleNumber: 'HR-55-9876', driverName: 'Manpreet Singh' } },
  ]);

  // Form Input States
  const [vehicleForm, setVehicleForm] = useState({ vehicleNumber: '', driverName: '', driverPhone: '' });
  const [tripForm, setTripForm] = useState({ tripId: '', vehicleId: '', destination: '', cargoDetails: '' });

  // Status transition handler
  const handleStatusTransition = (id, currentStatus) => {
    let nextStatus = 'Scheduled';
    if (currentStatus === 'Scheduled') nextStatus = 'In Transit';
    else if (currentStatus === 'In Transit') nextStatus = 'Delivered';
    else return;

    setTrips(prev => prev.map(t => t._id === id ? { ...t, deliveryStatus: nextStatus } : t));
  };

  // Local Form Submit Handlers
  const handleAddVehicle = (e) => {
    e.preventDefault();
    const newV = { _id: 'v' + (vehicles.length + 1), ...vehicleForm, status: 'Available' };
    setVehicles([...vehicles, newV]);
    setVehicleForm({ vehicleNumber: '', driverName: '', driverPhone: '' });
  };

  const handleCreateTrip = (e) => {
    e.preventDefault();
    const selectedVehicle = vehicles.find(v => v._id === tripForm.vehicleId);
    if (!selectedVehicle) return;

    const newT = {
      _id: 't' + (trips.length + 1),
      tripId: tripForm.tripId,
      destination: tripForm.destination,
      cargoDetails: tripForm.cargoDetails,
      deliveryStatus: 'Scheduled',
      vehicleId: { vehicleNumber: selectedVehicle.vehicleNumber, driverName: selectedVehicle.driverName }
    };

    setTrips([...trips, newT]);
    // Mark vehicle as On Journey locally
    setVehicles(prev => prev.map(v => v._id === tripForm.vehicleId ? { ...v, status: 'On Journey' } : v));
    setTripForm({ tripId: '', vehicleId: '', destination: '', cargoDetails: '' });
  };

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

              {/* SHIPMENT VIEW */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-base">Active Supply Chain Shipments</h3>
                  <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-semibold">{trips.length} Total</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {trips.map((trip) => (
                    <div key={trip._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors duration-150">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold bg-slate-900 text-slate-100 px-2 py-0.5 rounded">{trip.tripId}</span>
                          <h4 className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5"><MapPin size={15} className="text-slate-400" />{trip.destination}</h4>
                        </div>
                        <p className="text-xs md:text-sm text-slate-500 font-medium">Cargo: {trip.cargoDetails}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                          <span>🚚 Fleet No: <strong>{trip.vehicleId.vehicleNumber}</strong></span>
                          <span>👤 Driver: <strong>{trip.vehicleId.driverName}</strong></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 justify-between md:justify-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          trip.deliveryStatus === 'Scheduled' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          trip.deliveryStatus === 'In Transit' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>{trip.deliveryStatus}</span>
                        {trip.deliveryStatus !== 'Delivered' && (
                          <button onClick={() => handleStatusTransition(trip._id, trip.deliveryStatus)} className="text-xs bg-slate-950 text-white font-semibold px-4 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-sm">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* VEHICLE REGISTER FORM */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2"><Truck size={18} className="text-blue-600" /> Register Industrial Vehicle</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Add active fleet loaders and heavy freight machinery drivers.</p>
                </div>
                <form onSubmit={handleAddVehicle} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Vehicle Number</label>
                    <input type="text" placeholder="e.g. DL-3C-1122" value={vehicleForm.vehicleNumber} onChange={e => setVehicleForm({...vehicleForm, vehicleNumber: e.target.value})} className="w-full text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Driver Name</label>
                      <input type="text" placeholder="John Doe" value={vehicleForm.driverName} onChange={e => setVehicleForm({...vehicleForm, driverName: e.target.value})} className="w-full text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Driver Phone</label>
                      <input type="text" placeholder="9876543210" value={vehicleForm.driverPhone} onChange={e => setVehicleForm({...vehicleForm, driverPhone: e.target.value})} className="w-full text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors" required />
                    </div>
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-blue-600/10 transition-all"><Plus size={16} /> Register Vehicle</button>
                </form>
              </div>

              {/* TRIP DISPATCH FORM */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2"><Navigation size={18} className="text-blue-600" /> Schedule Consignment Trip</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Dispatch plant logistics raw goods to customer fulfillment coordinates.</p>
                </div>
                <form onSubmit={handleCreateTrip} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Trip Token ID</label>
                      <input type="text" placeholder="e.g. TRIP-999" value={tripForm.tripId} onChange={e => setTripForm({...tripForm, tripId: e.target.value})} className="w-full text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Assign Fleet Vehicle</label>
                      <select value={tripForm.vehicleId} onChange={e => setTripForm({...tripForm, vehicleId: e.target.value})} className="w-full text-sm px-4 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-500 transition-colors" required>
                        <option value="">-- Choose Available Vehicle --</option>
                        {vehicles.filter(v => v.status === 'Available').map(v => (
                          <option key={v._id} value={v._id}>{v.vehicleNumber} ({v.driverName})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Destination Coordinates/Address</label>
                    <input type="text" placeholder="Manufacturing Center Sector-4, Plot B" value={tripForm.destination} onChange={e => setTripForm({...tripForm, destination: e.target.value})} className="w-full text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Cargo Specifications</label>
                    <textarea rows="2" placeholder="e.g. Copper Cathodes, Raw Industrial Polymers (5 Tons)" value={tripForm.cargoDetails} onChange={e => setTripForm({...tripForm, cargoDetails: e.target.value})} className="w-full text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors" required></textarea>
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 text-sm bg-slate-950 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl shadow-lg transition-all"><Plus size={16} /> Deploy & Dispatch Shipment</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}