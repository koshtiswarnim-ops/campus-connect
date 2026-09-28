import React, { useState, useEffect } from 'react';
import { 
  Bus, MapPin, Clock, Users, ShieldCheck, AlertTriangle, 
  Search, Phone, CheckCircle2, ArrowLeft, Radio, Star, Award, ChevronRight, User
} from 'lucide-react';

// Generator function for G1 to G100 Bus Fleet
const generateFleetBuses = () => {
  const driverNames = [
    'Ramesh Singh', 'Suresh Patil', 'Vikram Solanki', 'Gurmeet Singh', 
    'Rajesh Kumar', 'Mahesh Sharma', 'Anil Verma', 'Devendra Yadav', 
    'Prakash Joshi', 'Sunil Gawli', 'Manish Pandit', 'Harpreet Singh',
    'Deepak Chouhan', 'Vijay Rathod', 'Subhash Chandra', 'Sanjay Dutt'
  ];

  const routePresets = [
    { name: 'North Tech Campus Route', stops: ['Campus Main Depot', 'Academic Complex', 'Central Library', 'North Hostel Block A', 'Tech Park'] },
    { name: 'South Hostel Express', stops: ['Campus Main Depot', 'South Hostel Circle', 'Mess Hall', 'Sports Stadium', 'Innovation Hub'] },
    { name: 'Metro & City Connection', stops: ['Campus Main Depot', 'Metro Junction', 'City Circle', 'University Hospital', 'Railway Terminal'] },
    { name: 'Science & Research Link', stops: ['Campus Main Depot', 'Science Park', 'Research Labs', 'Biotech Center', 'East Gate'] },
    { name: 'Airport & Faculty Express', stops: ['Campus Main Depot', 'International Hostel', 'Faculty Quarters', 'Botanical Gardens', 'Airport Link'] }
  ];

  const fleet = [];
  for (let i = 1; i <= 100; i++) {
    const busCode = `G${i}`;
    const routeIndex = (i - 1) % routePresets.length;
    const routeInfo = routePresets[routeIndex];
    const driver = driverNames[(i - 1) % driverNames.length];
    const phone = `+91 ${98200 + (i * 37)} ${(10000 + i * 43).toString().slice(0, 5)}`;
    const experience = `${6 + (i % 12)} years`;
    const rating = (4.7 + ((i % 4) * 0.1)).toFixed(1);
    const plate = `MH-12-CC-${1000 + i}`;
    
    const isDelayed = i % 7 === 0;
    const occupied = 15 + (i * 7) % 30;

    fleet.push({
      id: `bus-${busCode}`,
      code: busCode,
      number: `Bus ${busCode} (${routeInfo.name})`,
      routeTitle: routeInfo.name,
      stops: routeInfo.stops,
      routePath: routeInfo.stops.join(' ➔ '),
      firstStop: 'Campus Main Depot',
      lastStop: routeInfo.stops[routeInfo.stops.length - 1],
      driverName: `${driver}`,
      driverPhone: phone,
      experience,
      rating,
      licenseNo: `DL-${(10 + (i % 89)).toString().padStart(2, '0')}-2019-${(3000 + i * 11)}`,
      busModel: i % 2 === 0 ? 'Tata Starbus Ultra 45-Seater Electric' : 'Ashok Leyland Campus Shuttle',
      busNoPlate: plate,
      status: isDelayed ? 'Delayed' : 'On Route',
      currentLocation: isDelayed ? `Stuck near ${routeInfo.stops[2]}` : `Approaching ${routeInfo.stops[1 + (i % 3)]}`,
      nextStop: routeInfo.stops[2 + (i % 2)],
      etaMinutes: isDelayed ? 12 : Math.max(2, (i * 3) % 9),
      speedKmH: isDelayed ? 14 : 32,
      occupiedSeats: occupied,
      totalCapacity: 45,
      positionPct: 20 + (i * 9) % 70,
      isDelayed,
      delayNote: isDelayed ? `Morning traffic congestion near ${routeInfo.stops[2]}` : ''
    });
  }

  return fleet;
};

const ALL_FLEET_BUSES = generateFleetBuses();

export default function BusTracker({ currentUser, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusId, setSelectedBusId] = useState('bus-G1');
  const [buses, setBuses] = useState(ALL_FLEET_BUSES);
  const [subscribedBusId, setSubscribedBusId] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const [adminNotice, setAdminNotice] = useState('');
  const [showDriverDetails, setShowDriverDetails] = useState(false);

  // Filter G1 to G100 buses based on user search query
  const filteredBuses = buses.filter(b => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return b.code.toLowerCase().includes(q) ||
           b.number.toLowerCase().includes(q) ||
           b.routePath.toLowerCase().includes(q) ||
           b.driverName.toLowerCase().includes(q) ||
           b.lastStop.toLowerCase().includes(q);
  });

  // Animate GPS position movement of active selected bus
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev => prev.map(bus => {
        let newPct = bus.positionPct + 1.5;
        if (newPct > 95) newPct = 5;
        let newEta = Math.max(1, Math.round((100 - newPct) / 12));
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
            className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer border border-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-600" />
              <span>Campus Fleet Telemetry • G1 to G100 Buses Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight flex items-center gap-2">
              <Bus className="w-8 h-8 text-black" />
              <span>Campus Shuttle & Bus GPS Tracker</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            100 Campus Buses Synchronized
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
          <button onClick={() => setAnnouncement('')} className="text-amber-800 font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Grid: Map & Details (Left 8 cols) & Searchable G1-G100 Fleet (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Interactive Google Maps Live Canvas */}
        <div className="lg:col-span-8 bg-gray-900 rounded-3xl p-6 relative overflow-hidden text-white shadow-2xl border border-gray-800 min-h-[480px] flex flex-col justify-between">
          
          {/* Map Grid Background Simulation */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          {/* Map Header Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between bg-black/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-xs gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500 animate-bounce" />
              <span className="font-bold text-white">Google Maps Satellite Stream</span>
              <span className="text-amber-400 font-bold">[{selectedBus.code}]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-md font-mono text-[11px]">
                DEPOT: {selectedBus.firstStop}
              </span>
            </div>
          </div>

          {/* Simulated Animated Bus Route Map Visualizer */}
          <div className="relative z-10 my-8 px-4 sm:px-8 py-8">
            
            {/* Route Connecting Line */}
            <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-500 transition-all duration-700 rounded-full"
                style={{ width: `${selectedBus.positionPct}%` }}
              />
            </div>

            {/* Route Stops Markers */}
            <div className="grid grid-cols-5 gap-1 text-center mt-4 text-[10px] sm:text-[11px] font-semibold text-gray-300">
              {selectedBus.stops.map((stop, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-3.5 h-3.5 rounded-full mb-1 border-2 border-white shadow-md ${
                    idx === 0 ? 'bg-blue-600' : idx === selectedBus.stops.length - 1 ? 'bg-emerald-500' : 'bg-amber-400'
                  }`} />
                  <span className="truncate max-w-[80px] font-bold text-gray-200">{stop}</span>
                </div>
              ))}
            </div>

            {/* Animated Floating Live Bus Pointer Icon */}
            <div 
              className="absolute top-4 transition-all duration-700 transform -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${Math.max(8, Math.min(92, selectedBus.positionPct))}%` }}
            >
              <div className="bg-black border-2 border-amber-400 text-amber-400 px-3 py-1 rounded-xl shadow-2xl flex items-center gap-1.5 text-xs font-extrabold animate-pulse">
                <Bus className="w-4 h-4 text-amber-400" />
                <span>{selectedBus.code} • ETA: {selectedBus.etaMinutes} mins</span>
              </div>
              <div className="w-0.5 h-4 bg-amber-400" />
            </div>

          </div>

          {/* Map Bottom Telemetry Bar */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px]">Speed</span>
              <span className="font-bold text-white text-base">{selectedBus.speedKmH} km/h</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Seats Capacity</span>
              <span className="font-bold text-emerald-400 text-base">{selectedBus.totalCapacity - selectedBus.occupiedSeats} / {selectedBus.totalCapacity} Available</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Current Live Stop</span>
              <span className="font-bold text-amber-400 truncate block">{selectedBus.currentLocation}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Destination Area</span>
              <span className="font-bold text-blue-400 truncate block">{selectedBus.lastStop}</span>
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Fleet Bus Selector & Bus Details */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* G1 to G100 Search & Selector List */}
          <div className="bg-white border border-gray-200 rounded-3xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Search Fleet (G1 to G100)
              </h3>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                {filteredBuses.length} Buses Found
              </span>
            </div>

            {/* Search Input for G1 - G100 */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bus (e.g. G1, G14, G45, Metro, Ramesh)..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-black font-medium"
              />
            </div>

            {/* Scrollable Bus List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {filteredBuses.slice(0, 30).map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBusId(b.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedBusId === b.id
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-gray-50 text-gray-900 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 rounded font-mono text-[11px] ${
                        selectedBusId === b.id ? 'bg-amber-400 text-black' : 'bg-black text-white'
                      }`}>
                        {b.code}
                      </span>
                      <span className="truncate max-w-[170px]">{b.routeTitle}</span>
                    </div>
                    <div className={`text-[11px] ${selectedBusId === b.id ? 'text-gray-300' : 'text-gray-500'}`}>
                      ETA: {b.etaMinutes} mins • {b.lastStop}
                    </div>
                  </div>
                  {b.isDelayed && (
                    <span className="text-[10px] bg-red-100 text-red-700 border border-red-200 font-bold px-1.5 py-0.5 rounded">
                      DELAYED
                    </span>
                  )}
                </button>
              ))}

              {filteredBuses.length > 30 && (
                <div className="text-center text-[11px] text-gray-500 pt-1">
                  + {filteredBuses.length - 30} more buses. Type query to narrow down.
                </div>
              )}
            </div>
          </div>

          {/* Selected Bus Driver & Vehicle Details Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{selectedBus.code} Roster</span>
                <h4 className="text-base font-extrabold text-black">{selectedBus.driverName}</h4>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-amber-800 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{selectedBus.rating}</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Contact Number</span>
                <a href={`tel:${selectedBus.driverPhone}`} className="font-bold text-blue-600 hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {selectedBus.driverPhone}
                </a>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Experience</span>
                <span className="font-bold text-gray-900">{selectedBus.experience}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">License Number</span>
                <span className="font-mono text-gray-700">{selectedBus.licenseNo}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Bus Model</span>
                <span className="font-medium text-gray-800">{selectedBus.busModel}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Number Plate</span>
                <span className="font-mono font-bold text-black bg-gray-100 px-2 py-0.5 rounded border border-gray-200">{selectedBus.busNoPlate}</span>
              </div>
            </div>

            {/* Driver Details Modal Toggle / Subscribe Action */}
            <div className="pt-1 flex flex-col gap-2">
              <button
                onClick={() => {
                  setSubscribedBusId(selectedBus.id);
                  alert(`Subscribed! Live SMS alert set for ${selectedBus.code} when it arrives at ${selectedBus.nextStop}.`);
                }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  subscribedBusId === selectedBus.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {subscribedBusId === selectedBus.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Live Arrival Alerts Subscribed</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Notify Me When 2 Mins Away</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bus Transport Admin Delay Announcement Form */}
          {(currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && (
            <form onSubmit={handlePostAdminDelay} className="bg-gray-50 border border-gray-200 rounded-3xl p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Bus Admin Control (Broadcast Delay)</span>
              </div>

              <input
                type="text"
                value={adminNotice}
                onChange={(e) => setAdminNotice(e.target.value)}
                placeholder={`e.g. Bus ${selectedBus.code} delayed by 10 mins due to rain`}
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-black"
              />

              <button
                type="submit"
                className="w-full py-2 bg-black hover:bg-gray-800 text-white rounded-xl font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                Broadcast Delay Notice
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
