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

// export default BuyerBody;



import React, { useState, useEffect, useRef } from 'react';

const GOOGLE_MAPS_API_KEY = "AIzaSyDHX3Rt8GtAzTfOQOmp1g_bzY8W37HO56c";

// Latur (Farmer) & Pune (Buyer) coordinates
const ORIGIN = { lat: 18.4088, lng: 76.5604 };
const DESTINATION = { lat: 18.5204, lng: 73.8567 };

// SVG Custom Truck Icon (Taaki image load fail na ho)
const TRUCK_ICON_SVG = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#059669" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5" fill="#1e293b"></circle>
    <circle cx="18.5" cy="18.5" r="2.5" fill="#1e293b"></circle>
  </svg>
`);

function BuyerBody() {
  const [step, setStep] = useState('SELECT_LOT');
  const [truckProgress, setTruckProgress] = useState(0);

  const [selectedLot, setSelectedLot] = useState({
    id: "LOT-MH-2026-101",
    crop: "Soybean (Grade A)",
    qty: "50 Quintals",
    farmerName: "Ramesh Patil (Shivaji FPO)",
    farmerLocation: "Latur Hub",
    buyerLocation: "Pune Processing Plant",
    pricePerQtl: 4650,
    totalAmount: 232500
  });

  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const animationIntervalRef = useRef(null);

  // Dynamic Google Maps Script Loader
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  // Smooth route coordinates generator (Interpolation)
  const generateSmoothRoute = (start, end, steps = 300) => {
    const points = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      // Thoda natural curve dene ke liye quadratic offset
      const curveOffset = Math.sin(t * Math.PI) * 0.15;
      points.push({
        lat: start.lat + (end.lat - start.lat) * t + curveOffset,
        lng: start.lng + (end.lng - start.lng) * t
      });
    }
    return points;
  };

  const initGoogleMap = () => {
    if (!window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 18.4646, lng: 75.2086 },
      zoom: 7,
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoomControl: true,
    });

    // Farmer Origin Marker
    new window.google.maps.Marker({
      position: ORIGIN,
      map: map,
      title: "Farmer: Latur Hub",
      label: { text: "Farmer", color: "#ffffff", fontWeight: "bold", fontSize: "11px" }
    });

    // Buyer Destination Marker
    new window.google.maps.Marker({
      position: DESTINATION,
      map: map,
      title: "Buyer: Pune Processing Plant",
      label: { text: "Buyer", color: "#ffffff", fontWeight: "bold", fontSize: "11px" }
    });

    // Generate 300 continuous road points for 15s animation
    const fullPath = generateSmoothRoute(ORIGIN, DESTINATION, 300);

    // Green Highway Line
    new window.google.maps.Polyline({
      path: fullPath,
      geodesic: true,
      strokeColor: "#10b981",
      strokeOpacity: 0.9,
      strokeWeight: 6,
      map: map
    });

    // Real Truck Marker on Map
    markerRef.current = new window.google.maps.Marker({
      position: fullPath[0],
      map: map,
      icon: {
        url: TRUCK_ICON_SVG,
        scaledSize: new window.google.maps.Size(42, 42),
        anchor: new window.google.maps.Point(21, 21)
      },
      title: "Vehicle MH-12-Q-4091"
    });

    // Start 15 Second Moving Loop (300 steps * 50ms = 15,000ms = 15 seconds)
    let stepIndex = 0;
    if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);

    animationIntervalRef.current = setInterval(() => {
      stepIndex++;

      if (stepIndex >= fullPath.length) {
        clearInterval(animationIntervalRef.current);
        setTruckProgress(100);
        setTimeout(() => {
          setStep('DELIVERED_NOTIFICATION');
        }, 600);
        return;
      }

      const nextCoord = fullPath[stepIndex];
      const newPos = new window.google.maps.LatLng(nextCoord.lat, nextCoord.lng);

      if (markerRef.current) {
        markerRef.current.setPosition(newPos);
      }

      const currentPercent = Math.round((stepIndex / (fullPath.length - 1)) * 100);
      setTruckProgress(currentPercent);
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, []);

  const handleRazorpayPayment = () => {
    setStep('ESCROW_PAID');
  };

  const startTruckMovement = () => {
    setTruckProgress(0);
    setStep('IN_TRANSIT');
    setTimeout(() => {
      initGoogleMap();
    }, 250);
  };

  const handlePayFarmer = () => {
    setStep('FEEDBACK');
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setStep('COMPLETED');
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 bg-gradient-to-b from-slate-100 via-emerald-50/20 to-slate-100 min-h-screen font-sans pb-16">
      <main className="bg-white rounded-3xl shadow-2xl mt-15 overflow-hidden border border-slate-200/80">
        
        {/* Top Header */}
        <section className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-8 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 rounded-full text-emerald-300">
              Buyer Portal & Escrow Settlement Demo
            </span>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">
              Farm-to-Buyer Order & Guaranteed Settlement
            </h1>
            <p className="text-xs text-emerald-100/90 max-w-xl">
              Order produce, deposit funds securely via Razorpay dummy escrow, track vehicle dispatch, confirm physical receipt, disburse farmer payout, and leave feedback.
            </p>
          </div>
        </section>

        {/* Stepper Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[650px] text-xs font-bold px-4">
            <span className={step === 'SELECT_LOT' ? 'text-emerald-700 font-black' : 'text-slate-500'}>1. Select Lot</span>
            <span>→</span>
            <span className={['RAZORPAY_MODAL', 'ESCROW_PAID'].includes(step) ? 'text-emerald-700 font-black' : 'text-slate-500'}>2. Razorpay Escrow</span>
            <span>→</span>
            <span className={step === 'IN_TRANSIT' ? 'text-emerald-700 font-black' : 'text-slate-500'}>3. Live GPS Transit (15s)</span>
            <span>→</span>
            <span className={['DELIVERED_NOTIFICATION', 'PAY_FARMER'].includes(step) ? 'text-emerald-700 font-black' : 'text-slate-500'}>4. Deliver & Payout</span>
            <span>→</span>
            <span className={['FEEDBACK', 'COMPLETED'].includes(step) ? 'text-emerald-700 font-black' : 'text-slate-500'}>5. Rating & Review</span>
          </div>
        </div>

        {/* Dynamic Workflow Area */}
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
                    <p className="text-xs text-slate-500">Origin: <b>{selectedLot.farmerLocation}</b> → Destination: <b>{selectedLot.buyerLocation}</b></p>
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
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3 rounded-xl text-xs transition shadow-md">
                    Order Now & Deposit into Escrow →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DUMMY RAZORPAY GATEWAY MODAL */}
          {step === 'RAZORPAY_MODAL' && (
            <div className="max-w-md mx-auto bg-white border-2 border-indigo-500 rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded">Razorpay</span>
                  <span className="text-xs font-bold text-slate-800">Demo Escrow Checkout</span>
                </div>
                <span className="text-xs font-mono font-black text-slate-900">₹{selectedLot.totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-slate-600">Merchant: <b>KisanSetu Escrow Vault</b></p>
                <p className="text-slate-600">Lot: <b>{selectedLot.crop}</b> ({selectedLot.qty})</p>
                <div className="p-2.5 bg-blue-50 text-blue-900 rounded-lg text-[11px] font-medium border border-blue-200">
                  ℹ️ Money will stay locked in Escrow. Farmer will receive funds ONLY when truck reaches destination.
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-700">UPI / Card Simulated Mode</label>
                <div className="p-3 border rounded-xl bg-slate-100 font-mono text-xs text-slate-600 flex justify-between">
                  <span>buyer@okhdfcbank</span>
                  <span className="text-emerald-600 font-bold">Verified</span>
                </div>
              </div>

              <button
                onClick={handleRazorpayPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-xs transition shadow-lg flex justify-center items-center gap-2">
                Simulate Payment: ₹{selectedLot.totalAmount.toLocaleString('en-IN')}
              </button>
            </div>
          )}

          {/* STEP 3: ESCROW SUCCESS & DISPATCH TRIGGER */}
          {step === 'ESCROW_PAID' && (
            <div className="max-w-xl mx-auto text-center space-y-4 bg-emerald-50 border border-emerald-300 rounded-2xl p-8">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-black mx-auto">
                ✓
              </div>
              <h2 className="text-xl font-black text-emerald-900">Escrow Payment Locked Successfully!</h2>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Buyer deposited <b>₹{selectedLot.totalAmount.toLocaleString('en-IN')}</b> into protected escrow vault. Driver MH-12-Q-4091 is allocated for transit.
              </p>
              <button
                onClick={startTruckMovement}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition shadow-md">
                Launch 15-Second Google Map GPS Transit →
              </button>
            </div>
          )}

          {/* STEP 4: MOVING TRUCK ON GOOGLE MAP (EXACTLY 15 SECONDS) */}
          {step === 'IN_TRANSIT' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-black text-slate-900">Live GPS Highway Telemetry (Google Maps)</h2>
                  <p className="text-xs text-slate-500">Latur (Farmer Hub) → Pune (Buyer Hub) via NH-65 (15s Real Movement)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300 animate-pulse">
                    Live Progress: {truckProgress}%
                  </span>
                </div>
              </div>

              {/* Highway Progress Bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full transition-all duration-75 ease-linear"
                  style={{ width: `${truckProgress}%` }}
                ></div>
              </div>

              {/* REAL GOOGLE MAP CONTAINER */}
              <div className="rounded-3xl overflow-hidden border-2 border-slate-300 shadow-2xl relative">
                <div ref={mapRef} style={{ width: '100%', height: '460px' }}></div>
              </div>

              <div className="flex justify-between items-center pt-1 text-[11px] text-slate-500 font-mono bg-slate-100 p-2.5 rounded-xl border">
                <span>Vehicle: MH-12-Q-4091</span>
                <span>Speed: ~68 km/h</span>
                <span>Moisture Sensor: 9.2% (Optimal)</span>
                <span className="text-emerald-700 font-bold">Escrow Vault: Funded</span>
              </div>
            </div>
          )}

          {/* STEP 5: DESTINATION ARRIVED NOTIFICATION & PAY FARMER */}
          {step === 'DELIVERED_NOTIFICATION' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="bg-sky-50 border-2 border-sky-400 rounded-2xl p-5 shadow-lg flex items-start gap-3 animate-bounce">
                <span className="text-2xl">🔔</span>
                <div>
                  <h3 className="text-sm font-black text-sky-900">Notification: Produce Has Arrived!</h3>
                  <p className="text-xs text-sky-800 mt-1">
                    Truck MH-12-Q-4091 has arrived at Pune Processing Plant. Weight (50 Quintals) and Grade A quality verified via weighment receipt.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
                <h3 className="text-base font-black text-slate-900">Release Funds to Farmer</h3>
                <div className="text-xs bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Beneficiary:</span>
                    <span className="font-bold text-slate-800">{selectedLot.farmerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payable Amount:</span>
                    <span className="font-black text-emerald-700 text-sm">₹{selectedLot.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Disbursement Route:</span>
                    <span className="font-mono text-slate-700">Instant Escrow IMPS / Bank Account</span>
                  </div>
                </div>

                <button
                  onClick={handlePayFarmer}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs transition shadow-lg">
                  Release ₹{selectedLot.totalAmount.toLocaleString('en-IN')} To Farmer →
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: FEEDBACK & RATING */}
          {step === 'FEEDBACK' && (
            <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl space-y-5">
              <div className="text-center space-y-1">
                <span className="text-2xl">⭐</span>
                <h2 className="text-lg font-black text-slate-900">Farmer Quality & Trade Feedback</h2>
                <p className="text-xs text-slate-500">
                  Payment released to {selectedLot.farmerName}. Please rate the lot quality and fulfillment for community trust score.
                </p>
              </div>

              <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-2">Quality & Moisture Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`w-10 h-10 rounded-xl font-black text-sm transition border ${
                          rating >= star
                            ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm'
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}>
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Feedback Comments</label>
                  <textarea
                    rows="3"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="e.g. Excellent Grade A produce, exactly matched 9.2% moisture specs, timely packaging!"
                    className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3 rounded-xl text-xs transition shadow-md">
                  Submit Feedback & Complete Transaction
                </button>
              </form>
            </div>
          )}

          {/* STEP 7: COMPLETED SUMMARY */}
          {step === 'COMPLETED' && (
            <div className="max-w-md mx-auto text-center space-y-4 bg-emerald-50 border border-emerald-300 rounded-3xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto shadow-md">
                ✓
              </div>
              <h2 className="text-xl font-black text-emerald-950">Trade Lifecycle Completed!</h2>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Escrow disbursed to farmer, GPS log archived, and feedback score recorded on the Maharashtra Farmer Trust Registry.
              </p>
              <div className="bg-white p-3 rounded-xl border border-emerald-200 text-left text-[11px] font-mono text-slate-700 space-y-1">
                <div>Order: <b>{selectedLot.id}</b></div>
                <div>Disbursed: <b>₹{selectedLot.totalAmount.toLocaleString('en-IN')}</b></div>
                <div>Rating Recorded: <b>{rating} / 5 Stars</b></div>
              </div>
              <button
                onClick={() => { setStep('SELECT_LOT'); setTruckProgress(0); setFeedbackText(''); }}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition">
                Start New Demo Order
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default BuyerBody;