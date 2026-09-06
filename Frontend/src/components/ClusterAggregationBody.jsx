import React, { useState, useEffect, useRef } from 'react';

const GOOGLE_MAPS_API_KEY = "AIzaSyDHX3Rt8GtAzTfOQOmp1g_bzY8W37HO56c";

// Dedicated Origins for 3 Neighboring Farmers & Destination Dealer
const FARMER_COORDS = {
  "TRK-01": { lat: 18.2514, lng: 76.5022 }, // Ausa Cluster (Farmer 1)
  "TRK-02": { lat: 18.4231, lng: 76.4312 }, // Murud Cluster (Farmer 2)
  "TRK-03": { lat: 18.1256, lng: 76.7584 }  // Nilanga Belt (Farmer 3)
};
const DEST_PUNE = { lat: 18.5204, lng: 73.8567 }; // Pune Processing Plant

// 1. FORWARD TRUCK SVG (Flipped Left for Westward Travel from Latur belt to Pune)
const GREEN_TRUCK_WEST_SVG = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 24 24" fill="#059669" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="transform: scaleX(-1); transform-origin: center;">
    <rect x="1" y="3" width="15" height="13" rx="2" fill="#059669"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 8" fill="#047857"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5" fill="#0f172a"></circle>
    <circle cx="18.5" cy="18.5" r="2.5" fill="#0f172a"></circle>
  </svg>
`);

// 2. RETURN TRUCK SVG (Normal Right for Eastward Travel from Pune to Farmer Hub)
const RED_TRUCK_EAST_SVG = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 24 24" fill="#dc2626" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="2" fill="#dc2626"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 8" fill="#b91c1c"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5" fill="#0f172a"></circle>
    <circle cx="18.5" cy="18.5" r="2.5" fill="#0f172a"></circle>
  </svg>
`);

function ClusterAggregationBody() {
  // Navigation State: 'DASHBOARD' (view all 3 truck cards) OR 'ACTIVE_TRACKING' (track 1 truck on map)
  const [viewMode, setViewMode] = useState('DASHBOARD');
  const [activeTruck, setActiveTruck] = useState(null);

  // Tracking Stages: 'IN_TRANSIT' -> 'INSPECTION' -> 'PAID_SUCCESS' OR 'RETURN_TRANSIT' -> 'REFUNDED'
  const [trackStep, setTrackStep] = useState('IN_TRANSIT');
  const [truckProgress, setTruckProgress] = useState(0);

  // 3 Independent Consignments
  const [orders, setOrders] = useState([
    {
      id: "TRK-01",
      truckNo: "MH-12-A-101",
      farmerName: "Ramesh Patil",
      village: "Ausa Cluster, Latur",
      crop: "Soybean (Grade A)",
      qty: "90 Quintals",
      amount: 418500,
      bank: "HDFC •••• 9821",
      moisture: "9.1% (Optimal)",
      status: "READY_TO_TRACK", // 'READY_TO_TRACK', 'ACCEPTED', 'REJECTED'
      qualityNote: "Clean seeds, lab verified purity."
    },
    {
      id: "TRK-02",
      truckNo: "MH-12-B-202",
      farmerName: "Suresh Deshmukh",
      village: "Murud Cluster, Latur",
      crop: "Soybean (Grade A)",
      qty: "80 Quintals",
      amount: 372000,
      bank: "SBI •••• 4412",
      moisture: "9.4% (Standard)",
      status: "READY_TO_TRACK",
      qualityNote: "Fair average quality, clean packaging."
    },
    {
      id: "TRK-03",
      truckNo: "MH-12-C-303",
      farmerName: "Ganesh Jadhav",
      village: "Nilanga Belt, Latur",
      crop: "Soybean (Grade A)",
      qty: "70 Quintals",
      amount: 325500,
      bank: "Bank of Mah. •••• 6031",
      moisture: "14.8% (Fungus Risk)",
      status: "READY_TO_TRACK",
      qualityNote: "High moisture reading, potential discoloration."
    }
  ]);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const animTimerRef = useRef(null);

  // Google Maps Dynamic Loader
  useEffect(() => {
    if (window.google && window.google.maps) return;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  const generateRoute = (start, end, steps = 150) => {
    const list = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const arc = Math.sin(t * Math.PI) * 0.12;
      list.push({
        lat: start.lat + (end.lat - start.lat) * t + arc,
        lng: start.lng + (end.lng - start.lng) * t
      });
    }
    return list;
  };

  // 15-Second Single Truck Animation Engine
  const startSingleTruckAnimation = (truck, isReturn = false) => {
    const origin = FARMER_COORDS[truck.id] || FARMER_COORDS["TRK-01"];
    const startPt = isReturn ? DEST_PUNE : origin;
    const endPt = isReturn ? origin : DEST_PUNE;
    const path = generateRoute(startPt, endPt, 150);

    if (window.google && window.google.maps && mapRef.current) {
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 18.4646, lng: 75.2086 },
          zoom: 7,
          mapTypeId: 'roadmap',
          disableDefaultUI: true,
          zoomControl: true,
        });

        new window.google.maps.Marker({
          position: origin,
          map: map,
          label: { text: `Farmer (${truck.farmerName.split(' ')[0]})`, color: "#ffffff", fontWeight: "bold", fontSize: "10px" }
        });

        new window.google.maps.Marker({
          position: DEST_PUNE,
          map: map,
          label: { text: "Buyer (Pune)", color: "#ffffff", fontWeight: "bold", fontSize: "11px" }
        });

        new window.google.maps.Polyline({
          path: path,
          strokeColor: isReturn ? "#dc2626" : "#059669",
          strokeOpacity: 0.9,
          strokeWeight: 6,
          map: map
        });

        markerRef.current = new window.google.maps.Marker({
          position: path[0],
          map: map,
          icon: {
            url: isReturn ? RED_TRUCK_EAST_SVG : GREEN_TRUCK_WEST_SVG,
            scaledSize: new window.google.maps.Size(44, 44),
            anchor: new window.google.maps.Point(22, 22)
          }
        });
      } catch (err) {
        console.warn("Map setup notice:", err);
      }
    }

    let idx = 0;
    if (animTimerRef.current) clearInterval(animTimerRef.current);

    animTimerRef.current = setInterval(() => {
      idx++;

      if (idx >= path.length) {
        clearInterval(animTimerRef.current);
        setTruckProgress(100);

        setTimeout(() => {
          if (!isReturn) {
            setTrackStep('INSPECTION');
          } else {
            setTrackStep('REFUNDED');
            setOrders(prev => prev.map(o => o.id === truck.id ? { ...o, status: 'REJECTED' } : o));
          }
        }, 500);
        return;
      }

      const currentPos = path[idx];
      if (markerRef.current && window.google) {
        markerRef.current.setPosition(new window.google.maps.LatLng(currentPos.lat, currentPos.lng));
      }

      setTruckProgress(Math.round((idx / (path.length - 1)) * 100));
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (animTimerRef.current) clearInterval(animTimerRef.current);
    };
  }, []);

  const handleSelectTruckToTrack = (truck) => {
    setActiveTruck(truck);
    setViewMode('ACTIVE_TRACKING');
    setTrackStep('IN_TRANSIT');
    setTruckProgress(0);
    setTimeout(() => {
      startSingleTruckAnimation(truck, false);
    }, 350);
  };

  const handleAcceptTruck = () => {
    setTrackStep('PAID_SUCCESS');
    setOrders(prev => prev.map(o => o.id === activeTruck.id ? { ...o, status: 'ACCEPTED' } : o));
  };

  const handleRejectTruck = () => {
    setTrackStep('RETURN_TRANSIT');
    setTruckProgress(0);
    setTimeout(() => {
      startSingleTruckAnimation(activeTruck, true);
    }, 350);
  };

  return (
    <div className="pt-20 max-w-screen-2xl container mx-auto md:px-20 bg-gradient-to-b from-slate-100 via-emerald-50/20 to-slate-100 min-h-screen font-sans pb-16">
      <main className="bg-white rounded-3xl shadow-2xl mt-12 overflow-hidden border border-slate-200/80">
        
        {/* Header */}
        <section className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 rounded-full text-emerald-300">
              Bulk Aggregation • Independent Fleet Model
            </span>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">
              Cluster Sourcing & Granular Escrow Disbursals
            </h1>
            <p className="text-xs text-emerald-100/90 max-w-xl">
              Procured 240 Qtl from 3 neighboring farmers. Har kisan ka maal independent truck me safely transit karta hai—no cross-contamination risk.
            </p>
          </div>

          {viewMode === 'ACTIVE_TRACKING' && (
            <button
              onClick={() => setViewMode('DASHBOARD')}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow">
              ← Back to Fleet Dashboard
            </button>
          )}
        </section>

        {/* --------------------------------------------------------------- */}
        {/* VIEW 1: FLEET DASHBOARD (3 INDEPENDENT TRUCKS) */}
        {/* --------------------------------------------------------------- */}
        {viewMode === 'DASHBOARD' && (
          <div className="p-6 md:p-10 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5">
              <div>
                <h2 className="text-lg font-black text-slate-900">Active Consignments (3 Independent Dispatches)</h2>
                <p className="text-xs text-slate-500">Click "Track Truck Live" on any consignment to view individual GPS movement and inspect quality.</p>
              </div>

              <div className="flex gap-4 text-xs font-mono">
                <span className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-1.5 rounded-xl font-bold">
                  Total Order: 240 Qtl
                </span>
                <span className="bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-xl font-bold">
                  Total Escrow: ₹11,16,000
                </span>
              </div>
            </div>

            {/* 3 Truck Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {orders.map((truck) => (
                <div 
                  key={truck.id}
                  className="bg-white border-2 border-slate-200 hover:border-emerald-500 rounded-3xl p-6 shadow-sm hover:shadow-xl transition flex flex-col justify-between space-y-5">
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-slate-900 text-white px-2.5 py-1 rounded">
                          {truck.truckNo}
                        </span>
                        <h3 className="text-base font-black text-slate-900 mt-2">{truck.farmerName}</h3>
                        <p className="text-xs text-slate-500">📍 {truck.village}</p>
                      </div>

                      {/* Dynamic Status Badges */}
                      {truck.status === 'READY_TO_TRACK' && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-full animate-pulse">
                          In-Transit
                        </span>
                      )}
                      {truck.status === 'ACCEPTED' && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full">
                          ✓ Paid to Farmer
                        </span>
                      )}
                      {truck.status === 'REJECTED' && (
                        <span className="text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 px-2.5 py-1 rounded-full">
                          ✗ Returned & Refunded
                        </span>
                      )}
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Cargo Volume:</span>
                        <span className="font-extrabold text-slate-800">{truck.qty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Moisture Reading:</span>
                        <span className={truck.moisture.includes('Fungus') ? 'font-black text-rose-600' : 'font-bold text-emerald-700'}>
                          {truck.moisture}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 pt-1">
                        <span className="text-slate-500">Escrow Value:</span>
                        <span className="font-mono font-black text-emerald-700">₹{truck.amount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 italic">"{truck.qualityNote}"</p>
                  </div>

                  <button
                    onClick={() => handleSelectTruckToTrack(truck)}
                    className="w-full bg-slate-900 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs transition shadow flex items-center justify-center gap-2">
                    <span>🚚 Track Truck Live</span>
                    <span>→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* VIEW 2: ACTIVE TRUCK LIVE TRACKING & INDEPENDENT INSPECTION */}
        {/* --------------------------------------------------------------- */}
        {viewMode === 'ACTIVE_TRACKING' && activeTruck && (
          <div className="p-6 md:p-10 space-y-8">
            
            {/* STAGE A: 15-SECOND GPS FORWARD TRANSIT */}
            {trackStep === 'IN_TRANSIT' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-black text-slate-900">
                      Live GPS Tracking: {activeTruck.truckNo} ({activeTruck.farmerName})
                    </h2>
                    <p className="text-xs text-slate-500">{activeTruck.village} → Pune Processing Facility (15-Sec Live Simulation)[cite: 1]</p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300 animate-pulse">
                    Progress: {truckProgress}%[cite: 1]
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 h-full transition-all duration-100 ease-linear" style={{ width: `${truckProgress}%` }}></div>
                </div>

                {/* Map Display with moving indicators */}
                <div className="rounded-3xl overflow-hidden border-2 border-slate-300 shadow-2xl relative">
                  <div ref={mapRef} style={{ width: '100%', height: '440px' }}></div>

                  {/* Flipped Moving Truck Indicator for Westward Movement */}
                  <div 
                    className="absolute bottom-6 pointer-events-none transition-all duration-100 ease-linear flex flex-col items-center z-20"
                    style={{ left: `calc(${truckProgress}% * 0.85 + 5%)` }}
                  >
                    <span 
                      className="text-3xl filter drop-shadow-md animate-bounce inline-block"
                      style={{ transform: 'scaleX(-1)' }}
                    >
                      🚚
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-emerald-600 text-white px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                      {activeTruck.truckNo} ({truckProgress}%)
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-slate-600 bg-slate-100 p-3 rounded-xl border">
                  <span>Vehicle: {activeTruck.truckNo}</span>
                  <span>Volume: {activeTruck.qty} ({activeTruck.crop})</span>
                  <span>Speed: ~66 km/h</span>
                  <span className="text-emerald-700 font-bold">Escrow Vault: ₹{activeTruck.amount.toLocaleString('en-IN')} (Locked)</span>
                </div>
              </div>
            )}

            {/* STAGE B: GATE INSPECTION (ACCEPT OR REJECT) */}
            {trackStep === 'INSPECTION' && (
              <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in duration-200">
                <div className="bg-sky-50 border-2 border-sky-400 rounded-2xl p-5 shadow-lg flex items-start gap-3">
                  <span className="text-2xl">🔔</span>
                  <div>
                    <h3 className="text-sm font-black text-sky-900">{activeTruck.truckNo} Arrived at Pune Processing Gate!</h3>
                    <p className="text-xs text-sky-800 mt-1">
                      Farmer: <b>{activeTruck.farmerName}</b> | Tested Moisture: <b>{activeTruck.moisture}</b>.
                      Inspect and verify this consignment independently without disturbing other farmers' shipments.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-6">
                  <h3 className="text-base font-black text-slate-900">Physical Lab Quality Decision</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Accept Option */}
                    <div className="border-2 border-emerald-300 bg-emerald-50/50 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">Option 1</span>
                        <h4 className="text-sm font-black text-emerald-950 mt-2">Approve Produce Quality</h4>
                        <p className="text-xs text-slate-600 mt-1">
                          Produce passes quality assay. Disburse <b>₹{activeTruck.amount.toLocaleString('en-IN')}</b> directly into {activeTruck.farmerName}'s bank account.
                        </p>
                      </div>
                      <button
                        onClick={handleAcceptTruck}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs transition shadow">
                        ✓ Accept & Pay Farmer →
                      </button>
                    </div>

                    {/* Reject Option */}
                    <div className="border-2 border-rose-300 bg-rose-50/50 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-200 px-2 py-0.5 rounded">Option 2</span>
                        <h4 className="text-sm font-black text-rose-950 mt-2">Disapprove & Return</h4>
                        <p className="text-xs text-slate-600 mt-1">
                          High moisture or substandard grade. Send this truck back and refund <b>₹{activeTruck.amount.toLocaleString('en-IN')}</b> back to Dealer's account.
                        </p>
                      </div>
                      <button
                        onClick={handleRejectTruck}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3 rounded-xl text-xs transition shadow">
                        ✗ Reject & Return Truck →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE C: REVERSE RETURN TRANSIT ON MAP */}
            {trackStep === 'RETURN_TRANSIT' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-black text-rose-700">Reverse Logistics: Returning {activeTruck.truckNo}</h2>
                    <p className="text-xs text-slate-500">Pune Buyer Facility → Returning to {activeTruck.village} (Quality Disapproved)</p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-rose-100 text-rose-900 px-3 py-1 rounded-full border border-rose-300 animate-pulse">
                    Return Progress: {truckProgress}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-600 h-full transition-all duration-100 ease-linear" style={{ width: `${truckProgress}%` }}></div>
                </div>

                <div className="rounded-3xl overflow-hidden border-2 border-rose-300 shadow-2xl relative">
                  <div ref={mapRef} style={{ width: '100%', height: '440px' }}></div>

                  {/* Normal East-Facing Return Truck Indicator */}
                  <div 
                    className="absolute bottom-6 pointer-events-none transition-all duration-100 ease-linear flex flex-col items-center z-20"
                    style={{ right: `calc(${truckProgress}% * 0.85 + 5%)` }}
                  >
                    <span className="text-3xl filter drop-shadow-md animate-bounce inline-block">
                      🚛
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-rose-600 text-white px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                      RETURN ({truckProgress}%)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE D: ACCEPTANCE SUCCESS SCREEN */}
            {trackStep === 'PAID_SUCCESS' && (
              <div className="max-w-md mx-auto text-center space-y-4 bg-emerald-50 border border-emerald-300 rounded-3xl p-8 shadow-lg">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto">✓</div>
                <h2 className="text-xl font-black text-emerald-950">Payment Released to Farmer!</h2>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <b>₹{activeTruck.amount.toLocaleString('en-IN')}</b> transferred to {activeTruck.farmerName} ({activeTruck.bank}). Other dispatches in the fleet remain completely secure.
                </p>
                <button
                  onClick={() => setViewMode('DASHBOARD')}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition">
                  ← Back to Fleet Dashboard
                </button>
              </div>
            )}

            {/* STAGE E: REJECTION REFUND SCREEN */}
            {trackStep === 'REFUNDED' && (
              <div className="max-w-md mx-auto text-center space-y-4 bg-rose-50 border border-rose-300 rounded-3xl p-8 shadow-lg">
                <div className="w-14 h-14 bg-rose-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto">↩️</div>
                <h2 className="text-xl font-black text-rose-950">Truck Returned & Escrow Refunded!</h2>
                <p className="text-xs text-rose-800 leading-relaxed">
                  Truck {activeTruck.truckNo} returned back to {activeTruck.village}. Full amount of <b>₹{activeTruck.amount.toLocaleString('en-IN')}</b> refunded to your account.
                </p>
                <button
                  onClick={() => setViewMode('DASHBOARD')}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition">
                  ← Back to Fleet Dashboard
                </button>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}

export default ClusterAggregationBody;