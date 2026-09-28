import React, { useState, useEffect } from 'react';
import { 
  Bus, MapPin, Clock, Users, ShieldCheck, AlertTriangle, 
  RefreshCw, Navigation, Phone, ChevronRight, CheckCircle2, ArrowLeft, Radio
} from 'lucide-react';

export default function BusTracker({ currentUser, onBack }) {
  const [selectedBusId, setSelectedBusId] = useState('bus-101');
  const [buses, setBuses] = useState([
    {
      id: 'bus-101',
      number: 'Bus #01 (Campus Express)',
      route: 'Main Gate ➔ Academic Complex ➔ Central Library ➔ Hostel Block A',
      driverName: 'Ramesh Singh',
      driverPhone: '+91 98765 43210',
      busNoPlate: 'MH-12-CC-1042',
      status: 'On Route',
      currentLocation: 'Near Central Library Stop',
      nextStop: 'Hostel Block A',
      etaMinutes: 3,
      speedKmH: 28,
      occupiedSeats: 32,
      totalCapacity: 45,
      positionPct: 65, // % progress along animated route line
      isDelayed: false,
      delayNote: ''
    },
    {
      id: 'bus-102',
      number: 'Bus #02 (South Hostel Shuttle)',
      route: 'Hostel Complex ➔ Mess Hall ➔ Sports Stadium ➔ Science Park',
      driverName: 'Suresh Patil',
      driverPhone: '+91 98220 11223',
      busNoPlate: 'MH-12-CC-8091',
      status: 'On Route',
      currentLocation: 'Approaching Sports Stadium',
      nextStop: 'Science Park',
      etaMinutes: 2,
      speedKmH: 34,
      occupiedSeats: 18,
      totalCapacity: 45,
      positionPct: 40,
      isDelayed: false,
      delayNote: ''
    },
    {
      id: 'bus-103',
      number: 'Bus #03 (Metro Station Shuttle)',
      route: 'Campus Main Gate ➔ Metro Junction ➔ Tech Park ➔ City Circle',
      driverName: 'Vikram Solanki',
      driverPhone: '+91 97110 55443',
      busNoPlate: 'MH-12-CC-4410',
      status: 'Slight Delay',
      currentLocation: 'Stuck near Metro Flyover Signal',
      nextStop: 'Metro Station Stop',
      etaMinutes: 8,
      speedKmH: 12,
      occupiedSeats: 42,
      totalCapacity: 45,
      positionPct: 20,
      isDelayed: true,
      delayNote: 'Heavy morning traffic near Metro Flyover.'
    }
  ]);

  const [subscribedBusId, setSubscribedBusId] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const [adminNotice, setAdminNotice] = useState('');

  // Animate GPS position movement of active selected bus
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev => prev.map(bus => {
        let newPct = bus.positionPct + 2;
        if (newPct > 95) newPct = 5;
        let newEta = Math.max(1, Math.round((100 - newPct) / 15));
        return {
          ...bus,
          positionPct: newPct,
          etaMinutes: newEta
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const selectedBus = buses.find(b => b.id === selectedBusId) || buses[0];

  const handlePostAdminDelay = (e) => {
    e.preventDefault();
    if (!adminNotice) return;
    setBuses(prev => prev.map(b => {
      if (b.id === selectedBusId) {
        return {
          ...b,
          isDelayed: true,
          delayNote: adminNotice,
          status: 'Delayed'
        };
      }
      return b;
    }));
    setAnnouncement(`Announcement broadcasted for ${selectedBus.number}: ${adminNotice}`);
    setAdminNotice('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-white text-gray-900 min-h-screen">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-600" />
              <span>Live GPS Satellite Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight flex items-center gap-2">
              <Bus className="w-8 h-8 text-black" />
              <span>Campus Shuttle & Bus GPS Tracker</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            3 Active Fleet Buses Online
          </span>
        </div>
      </div>

      {/* Broadcast Notice Banner if any */}
      {announcement && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{announcement}</span>
          </div>
          <button onClick={() => setAnnouncement('')} className="text-amber-700 font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Grid: Interactive Map (Left 8 cols) & Bus Details (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Interactive Google Maps Live Canvas */}
        <div className="lg:col-span-8 bg-gray-900 rounded-3xl p-6 relative overflow-hidden text-white shadow-2xl border border-gray-800 min-h-[480px] flex flex-col justify-between">
          
          {/* Map Grid Background Simulation */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          {/* Map Header Bar */}
          <div className="relative z-10 flex items-center justify-between bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500 animate-bounce" />
              <span className="font-bold text-white">Google Maps Live Shuttle Telemetry</span>
              <span className="text-gray-400">({selectedBus.number})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-md font-mono text-[11px]">
                GPS 24.1820° N, 72.8491° E
              </span>
            </div>
          </div>

          {/* Simulated Animated Bus Route Map Visualizer */}
          <div className="relative z-10 my-8 px-4 sm:px-12 py-8">
            
            {/* Route Connecting Line */}
            <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-white/10 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-500 transition-all duration-700 rounded-full"
                style={{ width: `${selectedBus.positionPct}%` }}
              />
            </div>

            {/* Route Stops Markers */}
            <div className="flex items-center justify-between mt-4 text-[11px] font-semibold text-gray-300">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white mb-1 shadow-md" />
                <span>Main Gate</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-indigo-600 border-2 border-white mb-1 shadow-md" />
                <span>Academic Complex</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white mb-1 shadow-md" />
                <span>Central Library</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white mb-1 shadow-md" />
                <span>Hostel Complex</span>
              </div>
            </div>

            {/* Animated Floating Live Bus Pointer Icon */}
            <div 
              className="absolute top-4 transition-all duration-700 transform -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${Math.max(8, Math.min(92, selectedBus.positionPct))}%` }}
            >
              <div className="bg-black border-2 border-amber-400 text-amber-400 px-3 py-1 rounded-xl shadow-2xl flex items-center gap-1.5 text-xs font-extrabold animate-pulse">
                <Bus className="w-4 h-4 text-amber-400" />
                <span>LIVE ETA: {selectedBus.etaMinutes} mins</span>
              </div>
              <div className="w-0.5 h-4 bg-amber-400" />
            </div>

          </div>

          {/* Map Bottom Telemetry Bar */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/70 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px]">Speed</span>
              <span className="font-bold text-white text-base">{selectedBus.speedKmH} km/h</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Seats Available</span>
              <span className="font-bold text-emerald-400 text-base">{selectedBus.totalCapacity - selectedBus.occupiedSeats} / {selectedBus.totalCapacity}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Current Stop</span>
              <span className="font-bold text-amber-400 truncate block">{selectedBus.currentLocation}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Next Stop</span>
              <span className="font-bold text-blue-400 truncate block">{selectedBus.nextStop}</span>
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Fleet Bus Selector & Bus Details */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Fleet Selection List */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Select Shuttle Bus
            </h3>

            <div className="space-y-2.5">
              {buses.map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBusId(b.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedBusId === b.id
                      ? 'bg-black text-white border-black shadow-lg'
                      : 'bg-white text-gray-900 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm flex items-center gap-1.5">
                      <Bus className={`w-4 h-4 ${selectedBusId === b.id ? 'text-amber-400' : 'text-gray-700'}`} />
                      <span>{b.number}</span>
                    </div>
                    <div className={`text-xs ${selectedBusId === b.id ? 'text-gray-300' : 'text-gray-500'}`}>
                      ETA: {b.etaMinutes} mins • {b.currentLocation}
                    </div>
                  </div>
                  {b.isDelayed && (
                    <span className="text-[10px] bg-red-500 text-white font-bold px-2 py-0.5 rounded-md">
                      DELAYED
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Bus Driver & Route Info Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="text-sm font-bold text-gray-900">Driver & Vehicle Roster</h4>
              <span className="text-xs font-mono font-semibold text-gray-500">{selectedBus.busNoPlate}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Assigned Driver</span>
                <span className="font-bold text-gray-900 flex items-center gap-1">
                  {selectedBus.driverName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Driver Phone</span>
                <a href={`tel:${selectedBus.driverPhone}`} className="font-bold text-blue-600 hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {selectedBus.driverPhone}
                </a>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Route Map</span>
                <span className="font-medium text-gray-700 text-right max-w-[180px] truncate">{selectedBus.route}</span>
              </div>
            </div>

            {/* Subscribe to Live Stop Arrival Notification */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setSubscribedBusId(selectedBus.id);
                  alert(`Subscribed! You will receive a live alert on your phone when ${selectedBus.number} is 2 minutes away from your stop.`);
                }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  subscribedBusId === selectedBus.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {subscribedBusId === selectedBus.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Subscribed to Live Bus Alerts</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4" />
                    <span>Notify Me When 2 Mins Away</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bus Transport Admin Delay Announcement Form */}
          {(currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && (
            <form onSubmit={handlePostAdminDelay} className="bg-amber-50 border border-amber-200 rounded-3xl p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Bus Admin Control (Post Delay Alert)</span>
              </div>

              <input
                type="text"
                value={adminNotice}
                onChange={(e) => setAdminNotice(e.target.value)}
                placeholder="e.g. Bus #01 delayed by 10 mins due to rain"
                className="w-full bg-white border border-amber-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-amber-600"
              />

              <button
                type="submit"
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                Broadcast Delay Announcement
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
