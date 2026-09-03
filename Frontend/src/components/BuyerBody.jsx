// import React from 'react';

// function BuyerBody() {
//   return (
//     <div className="max-w-screen-2xl container mx-auto md:px-20 bg-gray-100 min-h-screen font-sans">
//       <main className="bg-white rounded-xl shadow-lg mt-20 py-20 px-4 flex items-center justify-center">
//         <h1 className="text-4xl font-bold text-gray-800">
//           Home
//         </h1>
//       </main>
//     </div>
    
//   );
// }


import React, { useState, useEffect, useRef } from 'react';

const GOOGLE_MAPS_API_KEY = "AIzaSyDHX3Rt8GtAzTfOQOmp1g_bzY8W37HO56c";

// Coordinates: Latur (Farmer) & Pune (Buyer)
const ORIGIN_LATUR = { lat: 18.4088, lng: 76.5604 };
const DEST_PUNE = { lat: 18.5204, lng: 73.8567 };

// Custom SVG Icons
const GREEN_TRUCK_SVG = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 24 24" fill="#059669" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="2" fill="#059669"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" fill="#047857"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5" fill="#0f172a"></circle>
    <circle cx="18.5" cy="18.5" r="2.5" fill="#0f172a"></circle>
  </svg>
`);

const RED_TRUCK_SVG = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 24 24" fill="#dc2626" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="2" fill="#dc2626"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" fill="#b91c1c"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5" fill="#0f172a"></circle>
    <circle cx="18.5" cy="18.5" r="2.5" fill="#0f172a"></circle>
  </svg>
`);

function BuyerBody() {
  const [step, setStep] = useState('SELECT_LOT');
  const [truckProgress, setTruckProgress] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  const selectedLot = {
    id: "LOT-MH-2026-101",
    crop: "Soybean (Grade A)",
    qty: "50 Quintals",
    farmerName: "Ramesh Patil (Shivaji FPO)",
    farmerBank: "Bank of Maharashtra •••• 4412",
    farmerLocation: "Latur Hub",
    buyerLocation: "Pune Processing Plant",
    pricePerQtl: 4650,
    totalAmount: 232500
  };

  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [rejectReason, setRejectReason] = useState('High Moisture & Discoloration');

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const animRef = useRef(null);

  // 1. Google Maps Script Dynamic Loading
  useEffect(() => {
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }
    const existingScript = document.getElementById('google-map-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-map-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
      script.async = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    } else {
      existingScript.addEventListener('load', () => setMapLoaded(true));
    }
  }, []);

  // 2. Smooth Interpolation Calculator
  const generateRoute = (start, end, steps = 150) => {
    const list = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const arc = Math.sin(t * Math.PI) * 0.12; // highway curvature
      list.push({
        lat: start.lat + (end.lat - start.lat) * t + arc,
        lng: start.lng + (end.lng - start.lng) * t
      });
    }
    return list;
  };

  // 3. Robust Animation Engine (Works with Google Maps & Updates State)
  const startMapAnimation = (isReturn = false) => {
    const startPt = isReturn ? DEST_PUNE : ORIGIN_LATUR;
    const endPt = isReturn ? ORIGIN_LATUR : DEST_PUNE;
    const path = generateRoute(startPt, endPt, 150);

    // Initialize Google Maps if script is ready
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
          position: ORIGIN_LATUR,
          map: map,
          label: { text: "Farmer (Latur)", color: "#ffffff", fontWeight: "bold", fontSize: "11px" }
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
            url: isReturn ? RED_TRUCK_SVG : GREEN_TRUCK_SVG,
            scaledSize: new window.google.maps.Size(46, 46),
            anchor: new window.google.maps.Point(23, 23)
          }
        });
      } catch (err) {
        console.warn("Map setup notice:", err);
      }
    }

    // 15 Seconds Time-based Animation (Independent of framerate lag)
    const duration = 15000;
    const startTime = performance.now();

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const animateLoop = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const percent = Math.round(progress * 100);

      setTruckProgress(percent);

      const coordIndex = Math.min(Math.floor(progress * (path.length - 1)), path.length - 1);
      const currentPos = path[coordIndex];

      // Move marker on real google map if present
      if (markerRef.current && window.google) {
        markerRef.current.setPosition(new window.google.maps.LatLng(currentPos.lat, currentPos.lng));
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animateLoop);
      } else {
        setTruckProgress(100);
        setTimeout(() => {
          if (!isReturn) {
            setStep('DELIVERY_VERIFICATION');
          } else {
            setStep('REFUND_BUYER');
          }
        }, 500);
      }
    };

    animRef.current = requestAnimationFrame(animateLoop);
  };

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleStartForwardTransit = () => {
    setTruckProgress(0);
    setStep('IN_TRANSIT');
    setTimeout(() => startMapAnimation(false), 300);
  };

  const handleStartReturnTransit = () => {
    setTruckProgress(0);
    setStep('RETURN_TRANSIT');
    setRating(1);
    setFeedbackText("Produce rejected upon gate inspection: Moisture was 14.8% (Contract specified max 9.5%), fungal discoloration found. Return transit initiated.");
    setTimeout(() => startMapAnimation(true), 300);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 bg-gradient-to-b from-slate-100 via-emerald-50/20 to-slate-100 min-h-screen font-sans pb-16">
      <main className="bg-white rounded-3xl shadow-2xl mt-12 overflow-hidden border border-slate-200/80">
        
        {/* Header */}
        <section className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-8 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 rounded-full text-emerald-300">
              Buyer Portal & Automated Escrow Vault
            </span>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">
              Contract Order & Settlement Lifecycle
            </h1>
            <p className="text-xs text-emerald-100/90 max-w-xl">
              Simulated flow: Escrow deposit → 15s Google Map GPS movement → Gate verification → Payout or Reversal.
            </p>
          </div>
        </section>

        <div className="p-6 md:p-10 space-y-8">

          {/* STEP 1: SELECT LOT */}
          {step === 'SELECT_LOT' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-lg font-black text-slate-900">Step 1: Direct Produce Sourcing</h2>
              <div className="border border-slate-300 rounded-2xl p-6 bg-slate-50 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-mono bg-white border px-2 py-0.5 rounded text-slate-600 font-bold">{selectedLot.id}</span>
                    <h3 className="text-xl font-black text-slate-900 mt-2">{selectedLot.crop}</h3>
                    <p className="text-xs text-slate-500">Farmer: <b>{selectedLot.farmerName}</b></p>
                    <p className="text-xs text-slate-500">Route: <b>{selectedLot.farmerLocation} → {selectedLot.buyerLocation}</b></p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Valuation</span>
                    <span className="text-2xl font-black text-emerald-700 font-mono">₹{selectedLot.totalAmount.toLocaleString('en-IN')}</span>
                    <span className="text-[11px] text-slate-500 block">({selectedLot.qty} @ ₹{selectedLot.pricePerQtl}/qtl)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setStep('RAZORPAY_MODAL')}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3.5 rounded-xl text-xs transition shadow-md">
                    Order Produce & Deposit in Escrow →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: RAZORPAY GATEWAY */}
          {step === 'RAZORPAY_MODAL' && (
            <div className="max-w-md mx-auto bg-white border-2 border-indigo-500 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded">Razorpay</span>
                  <span className="text-xs font-bold text-slate-800">Demo Escrow Checkout</span>
                </div>
                <span className="text-xs font-mono font-black text-slate-900">₹{selectedLot.totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-slate-600">Merchant: <b>KisanSetu Escrow Vault</b></p>
                <p className="text-slate-600">Item: <b>{selectedLot.crop}</b> ({selectedLot.qty})</p>
                <div className="p-2.5 bg-blue-50 text-blue-900 rounded-lg text-[11px] font-medium border border-blue-200">
                  🛡️ Funds stay locked in Escrow. If quality is disapproved upon arrival, 100% amount will be refunded.
                </div>
              </div>

              <button
                onClick={() => setStep('ESCROW_PAID')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl text-xs transition shadow-lg">
                Simulate Payment: ₹{selectedLot.totalAmount.toLocaleString('en-IN')}
              </button>
            </div>
          )}

          {/* STEP 3: ESCROW SUCCESS */}
          {step === 'ESCROW_PAID' && (
            <div className="max-w-xl mx-auto text-center space-y-4 bg-emerald-50 border border-emerald-300 rounded-2xl p-8">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-black mx-auto">✓</div>
              <h2 className="text-xl font-black text-emerald-900">₹{selectedLot.totalAmount.toLocaleString('en-IN')} Locked in Escrow</h2>
              <p className="text-xs text-emerald-800">
                Vehicle MH-12-Q-4091 loaded produce from Farmer ({selectedLot.farmerLocation}). Launch the 15-second highway tracking animation.
              </p>
              <button
                onClick={handleStartForwardTransit}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition shadow-md">
                Launch 15-Second Highway GPS Transit →
              </button>
            </div>
          )}

          {/* STEP 4: FORWARD TRANSIT (FARMER TO BUYER) */}
          {step === 'IN_TRANSIT' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-black text-slate-900">Live GPS Highway Telemetry: Farmer to Buyer</h2>
                  <p className="text-xs text-slate-500">Latur Farm Gate → Pune Processing Plant (15-Second Movement)</p>
                </div>
                <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300 animate-pulse">
                  Transit Progress: {truckProgress}%
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 h-full transition-all duration-75 ease-linear" style={{ width: `${truckProgress}%` }}></div>
              </div>

              {/* MAP DISPLAY WITH INTEGRATED VISUAL OVERLAY */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-300 shadow-2xl bg-slate-900 h-[450px]">
                {/* Real Google Map Div */}
                <div ref={mapRef} className="w-full h-full"></div>

                {/* Guaranteed Visual Moving Indicator on top of Map */}
                <div 
                  className="absolute bottom-6 pointer-events-none transition-all duration-75 ease-linear flex flex-col items-center z-20"
                  style={{ left: `calc(${truckProgress}% * 0.85 + 5%)` }}
                >
                  <span className="text-3xl filter drop-shadow-md animate-bounce">🚚</span>
                  <span className="text-[10px] font-mono font-bold bg-emerald-600 text-white px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                    MH-12-Q-4091 ({truckProgress}%)
                  </span>
                </div>

                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-emerald-300 font-mono z-10">
                  ● Origin: Latur Farm Gate
                </div>
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-sky-300 font-mono z-10">
                  ● Destination: Pune Processing Plant
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: VERIFICATION (ACCEPT OR REJECT) */}
          {step === 'DELIVERY_VERIFICATION' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-sky-50 border-2 border-sky-400 rounded-2xl p-5 shadow-lg flex items-start gap-3">
                <span className="text-2xl">🔔</span>
                <div>
                  <h3 className="text-sm font-black text-sky-900">Truck Reached Pune Processing Plant!</h3>
                  <p className="text-xs text-sky-800 mt-1">
                    Vehicle MH-12-Q-4091 has arrived at the destination gate. Inspect the produce quality to either approve payment to the farmer or initiate rejection.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-6">
                <h3 className="text-base font-black text-slate-900">Physical Inspection Decision</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Accept */}
                  <div className="border-2 border-emerald-300 bg-emerald-50/50 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">Scenario A</span>
                      <h4 className="text-sm font-black text-emerald-950 mt-2">Quality Meets Standards</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Moisture &lt; 10%, clean grading confirmed. Release payment directly to the farmer.
                      </p>
                    </div>
                    <button
                      onClick={() => setStep('PAY_FARMER_SCREEN')}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs transition shadow">
                      ✓ Accept Produce & Pay Farmer →
                    </button>
                  </div>

                  {/* Reject */}
                  <div className="border-2 border-rose-300 bg-rose-50/50 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-200 px-2 py-0.5 rounded">Scenario B</span>
                      <h4 className="text-sm font-black text-rose-950 mt-2">Produce Disapproved</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Damaged or high moisture. Return shipment back to farmer and refund buyer escrow.
                      </p>
                    </div>
                    <button
                      onClick={handleStartReturnTransit}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3 rounded-xl text-xs transition shadow">
                      ✗ Reject Lot & Return to Farmer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAY FARMER SCREEN */}
          {step === 'PAY_FARMER_SCREEN' && (
            <div className="max-w-xl mx-auto space-y-5 animate-in fade-in zoom-in duration-200">
              <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-5 shadow-lg flex items-start gap-3">
                <span className="text-2xl">💸</span>
                <div>
                  <h3 className="text-sm font-black text-emerald-900">Release Escrow Payment to Farmer</h3>
                  <p className="text-xs text-emerald-800 mt-1">
                    Quality approved. Transfer the locked escrow funds directly into farmer's linked bank account.
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-3xl p-6 bg-white shadow-md space-y-4 text-xs">
                <h3 className="text-base font-black text-slate-900">Direct Bank Settlement (IMPS)</h3>
                <div className="bg-slate-50 p-4 rounded-xl space-y-3 border">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Beneficiary:</span>
                    <span className="font-black text-slate-900">{selectedLot.farmerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bank Account:</span>
                    <span className="font-mono font-bold text-slate-800">{selectedLot.farmerBank}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-slate-700 font-bold">Total Amount:</span>
                    <span className="font-black text-emerald-700 text-base">₹{selectedLot.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep('FEEDBACK')}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3.5 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2">
                  <span>🚀</span> Transfer ₹{selectedLot.totalAmount.toLocaleString('en-IN')} to Farmer's Account →
                </button>
              </div>
            </div>
          )}

          {/* RETURN LOGISTICS (REJECT TRANSIT) */}
          {step === 'RETURN_TRANSIT' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-black text-rose-700">Reverse Logistics: Returning Lot to Farmer</h2>
                  <p className="text-xs text-slate-500">Pune Buyer Facility → Latur Farmer Hub (15-Second Movement)</p>
                </div>
                <span className="text-xs font-mono font-bold bg-rose-100 text-rose-900 px-3 py-1 rounded-full border border-rose-300 animate-pulse">
                  Return Progress: {truckProgress}%
                </span>
              </div>

              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-600 h-full transition-all duration-75 ease-linear" style={{ width: `${truckProgress}%` }}></div>
              </div>

              <div className="relative rounded-3xl overflow-hidden border-2 border-rose-300 shadow-2xl bg-slate-900 h-[450px]">
                <div ref={mapRef} className="w-full h-full"></div>

                <div 
                  className="absolute bottom-6 pointer-events-none transition-all duration-75 ease-linear flex flex-col items-center z-20"
                  style={{ right: `calc(${truckProgress}% * 0.85 + 5%)` }}
                >
                  <span className="text-3xl filter drop-shadow-md animate-bounce">🚛</span>
                  <span className="text-[10px] font-mono font-bold bg-rose-600 text-white px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                    RETURN SHIPMENT ({truckProgress}%)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* REFUND BUYER */}
          {step === 'REFUND_BUYER' && (
            <div className="max-w-xl mx-auto space-y-5">
              <div className="bg-rose-50 border-2 border-rose-400 rounded-2xl p-5 shadow-lg flex items-start gap-3">
                <span className="text-2xl">↩️</span>
                <div>
                  <h3 className="text-sm font-black text-rose-900">Lot Returned to Farmer Hub!</h3>
                  <p className="text-xs text-rose-800 mt-1">
                    Truck returned produce back to {selectedLot.farmerName}. Escrow vault initiates 100% refund to the buyer.
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-3xl p-6 bg-white shadow-md space-y-4 text-xs">
                <h3 className="text-base font-black text-slate-900">Escrow Reversal Notice</h3>
                <div className="bg-slate-50 p-4 rounded-xl space-y-2 border">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Refund Beneficiary:</span>
                    <span className="font-bold text-slate-800">buyer@okhdfcbank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Refund Amount:</span>
                    <span className="font-black text-emerald-700 text-sm">₹{selectedLot.totalAmount.toLocaleString('en-IN')} (100%)</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep('REJECT_FEEDBACK')}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3.5 rounded-xl text-xs transition shadow-md">
                  Claim Refund & Submit Dispute Rating →
                </button>
              </div>
            </div>
          )}

          {/* REJECT FEEDBACK */}
          {step === 'REJECT_FEEDBACK' && (
            <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl space-y-5">
              <div className="text-center space-y-1">
                <span className="text-2xl">⚠️</span>
                <h2 className="text-lg font-black text-slate-900">Dispute & Disapproval Report</h2>
                <p className="text-xs text-slate-500">Record penalty against {selectedLot.farmerName}'s profile.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setStep('REJECTED_COMPLETED'); }} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-2">Quality Rating (Low)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`w-10 h-10 rounded-xl font-black text-sm border transition ${
                          rating >= star ? 'bg-rose-500 text-white border-rose-600' : 'bg-slate-50 text-slate-400'
                        }`}>
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rejection Reason</label>
                  <select 
                    value={rejectReason} 
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-semibold">
                    <option value="High Moisture & Discoloration">High Moisture & Discoloration</option>
                    <option value="Foreign Matter & Dust Exceeds 2%">Foreign Matter & Dust Exceeds 2%</option>
                    <option value="Packaging Torn & Shortage">Packaging Torn & Shortage</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Notes</label>
                  <textarea
                    rows="3"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-rose-500 outline-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3.5 rounded-xl text-xs transition shadow-md">
                  Submit Dispute Feedback & Close Contract
                </button>
              </form>
            </div>
          )}

          {/* POSITIVE FEEDBACK */}
          {step === 'FEEDBACK' && (
            <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl space-y-5">
              <div className="text-center space-y-1">
                <span className="text-2xl">⭐</span>
                <h2 className="text-lg font-black text-slate-900">Farmer Quality Feedback</h2>
                <p className="text-xs text-slate-500">
                  ₹{selectedLot.totalAmount.toLocaleString('en-IN')} transferred to {selectedLot.farmerName}. Share community review.
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setStep('COMPLETED'); }} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-2">Quality Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`w-10 h-10 rounded-xl font-black text-sm border transition ${
                          rating >= star ? 'bg-amber-400 text-slate-950 border-amber-500' : 'bg-slate-50 text-slate-400'
                        }`}>
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Comments</label>
                  <textarea
                    rows="3"
                    defaultValue="Excellent Grade A produce, moisture levels within 9.2% specs, highly recommended!"
                    className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs transition shadow-md">
                  Submit 5-Star Feedback & Complete Trade
                </button>
              </form>
            </div>
          )}

          {/* COMPLETED (ACCEPTED) */}
          {step === 'COMPLETED' && (
            <div className="max-w-md mx-auto text-center space-y-4 bg-emerald-50 border border-emerald-300 rounded-3xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto">✓</div>
              <h2 className="text-xl font-black text-emerald-950">Trade Completed Successfully!</h2>
              <p className="text-xs text-emerald-800">
                ₹{selectedLot.totalAmount.toLocaleString('en-IN')} disbursed to farmer, GPS log saved, and 5-Star review published.
              </p>
              <button
                onClick={() => { setStep('SELECT_LOT'); setTruckProgress(0); }}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition">
                Start New Demo Order
              </button>
            </div>
          )}

          {/* COMPLETED (REJECTED & REFUNDED) */}
          {step === 'REJECTED_COMPLETED' && (
            <div className="max-w-md mx-auto text-center space-y-4 bg-rose-50 border border-rose-300 rounded-3xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-rose-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto">✗</div>
              <h2 className="text-xl font-black text-rose-950">Lot Rejected & Escrow Refunded!</h2>
              <p className="text-xs text-rose-800">
                100% refund of ₹{selectedLot.totalAmount.toLocaleString('en-IN')} returned to Buyer. Farmer Trust Score penalized with 1-Star rating.
              </p>
              <button
                onClick={() => { setStep('SELECT_LOT'); setTruckProgress(0); }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition">
                Reset Demo
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default BuyerBody;