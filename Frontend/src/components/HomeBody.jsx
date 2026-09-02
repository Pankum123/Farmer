// import React from 'react';

// function HomeBody() {
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

// export default HomeBody;


import React from 'react';

function HomeBody() {
  const platformStats = [
    { 
      label: "Active Farmer Producer Groups (FPOs)", 
      value: "520+", 
      subtext: "Across 14 Maharashtra Districts", 
      highlight: "Verified",
      bgGradient: "from-emerald-500 to-teal-600",
      accentBadge: "bg-emerald-100 text-emerald-800"
    },
    { 
      label: "Average Farmer Price Realization", 
      value: "+14.8%", 
      subtext: "Higher than traditional APMC yard sale", 
      highlight: "Margin Gain",
      bgGradient: "from-amber-500 to-orange-600",
      accentBadge: "bg-amber-100 text-amber-900"
    },
    { 
      label: "Transit Waste Reduction", 
      value: "18.5%", 
      subtext: "Direct farm-to-factory pooling", 
      highlight: "Post-Harvest",
      bgGradient: "from-cyan-500 to-blue-600",
      accentBadge: "bg-blue-100 text-blue-900"
    },
    { 
      label: "Total Escrow Protected Volume", 
      value: "₹3.40 Cr", 
      subtext: "Zero payment default track record", 
      highlight: "100% Safe",
      bgGradient: "from-purple-500 to-indigo-600",
      accentBadge: "bg-purple-100 text-purple-900"
    }
  ];

  const pillars = [
    {
      title: "Real-Time Mandi Intelligence",
      desc: "Aggregates daily modal prices across key Maharashtra APMCs with AI recommendations on whether to sell immediately or hold for price surges.",
      tag: "Price Discovery",
      cardBorder: "border-emerald-200 hover:border-emerald-500",
      tagBg: "bg-emerald-100 text-emerald-800",
      numBg: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
    },
    {
      title: "Digital Lot Creation & Grading",
      desc: "Standardize produce directly at the farm-gate with verifiable grade classifications, moisture parameters, and QR-coded digital passports.",
      tag: "Traceability",
      cardBorder: "border-amber-200 hover:border-amber-500",
      tagBg: "bg-amber-100 text-amber-800",
      numBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white"
    },
    {
      title: "Reverse Demand Matching",
      desc: "Connects FPOs directly with verified bulk institutional processors, modern retail chains, and exporters to secure guaranteed off-take.",
      tag: "Direct Market",
      cardBorder: "border-cyan-200 hover:border-cyan-500",
      tagBg: "bg-cyan-100 text-cyan-800",
      numBg: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
    },
    {
      title: "Tracked Logistics & Escrow Payout",
      desc: "Eliminate payment risk with pre-funded buyer escrow accounts that automatically disburse to farmers once destination weighment is verified.",
      tag: "Trust & Safety",
      cardBorder: "border-purple-200 hover:border-purple-500",
      tagBg: "bg-purple-100 text-purple-800",
      numBg: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
    }
  ];

  const marketTickers = [
    { crop: "Soybean", market: "Latur Mandi", price: "₹4,650/qtl", change: "+3.8%", window: "Hold (3 Days)", bg: "bg-gradient-to-br from-emerald-50 to-teal-50/50", border: "border-emerald-300" },
    { crop: "Onion", market: "Lasalgaon (Nashik)", price: "₹1,820/qtl", change: "-1.5%", window: "Sell Now", bg: "bg-gradient-to-br from-rose-50 to-orange-50/50", border: "border-rose-300" },
    { crop: "Cotton", market: "Akola Mandi", price: "₹7,150/qtl", change: "+2.2%", window: "Hold (5 Days)", bg: "bg-gradient-to-br from-sky-50 to-indigo-50/50", border: "border-sky-300" },
    { crop: "Tur (Pigeon Pea)", market: "Amravati APMC", price: "₹9,480/qtl", change: "+0.9%", window: "Sell Now", bg: "bg-gradient-to-br from-purple-50 to-fuchsia-50/50", border: "border-purple-300" }
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 bg-gradient-to-b from-slate-100 via-emerald-50/30 to-slate-100 min-h-screen font-sans pb-16">
      <main className="bg-white rounded-3xl shadow-2xl mt-12 overflow-hidden border border-slate-200/80">
        
        {/* 1. Hero Section - Deep Multi-Tone Gradient */}
        <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-indigo-950 text-white p-8 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/40 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-300 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              Govt. of Maharashtra Innovation Society • Problem ID 26132
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">
              Strengthening Market Linkages & Transparent Price Discovery
            </h1>
            <p className="text-emerald-100/90 text-sm md:text-base max-w-3xl leading-relaxed">
              Empowering farmers and FPOs with farm-gate grading, predictive sale windows, verified bulk buyer matchmaking, and guaranteed escrow payouts.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-3">
              <span className="bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-xs px-3.5 py-1.5 rounded-xl font-bold backdrop-blur-md">
                🌾 Agmarknet Integrated
              </span>
              <span className="bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 text-xs px-3.5 py-1.5 rounded-xl font-bold backdrop-blur-md">
                🏷️ Smart Lot Traceability
              </span>
              <span className="bg-indigo-500/20 border border-indigo-400/50 text-indigo-200 text-xs px-3.5 py-1.5 rounded-xl font-bold backdrop-blur-md">
                🛡️ Escrow Protection
              </span>
            </div>
          </div>
        </section>

        {/* 2. Platform Metrics Bar - Gradient Accent Cards */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-slate-50 via-teal-50/20 to-slate-50 border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {platformStats.map((item, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition relative overflow-hidden">
                <div className={`h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r ${item.bgGradient}`}></div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${item.accentBadge}`}>
                    {item.highlight}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black flex items-center justify-center border border-emerald-200">✓</span>
                </div>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{item.value}</p>
                <h3 className="text-xs font-bold text-slate-800 mt-1">{item.label}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{item.subtext}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Live Mandi Market Ticker - Dynamic Vibrant Cards */}
        <section className="p-6 md:p-8 border-b border-gray-200 bg-white">
          <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live APMC Market Ticker
            </h2>
            <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              AI Optimal Sale Windows Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketTickers.map((ticker, index) => (
              <div key={index} className={`border rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow transition ${ticker.bg} ${ticker.border}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{ticker.crop}</h3>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">{ticker.market}</p>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm ${
                    ticker.change.startsWith('+') ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    {ticker.change}
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/70 flex justify-between items-baseline">
                  <span className="text-lg font-black text-slate-900">{ticker.price}</span>
                  <span className="text-xs font-bold text-emerald-800 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200/50">
                    {ticker.window}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Core Solution Architecture - Distinct Colorful Steps */}
        <section className="p-6 md:p-10 bg-slate-50/70">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <span className="text-xs font-extrabold text-teal-700 uppercase tracking-widest bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
              End-to-End Workflow
            </span>
            <h2 className="text-2xl font-black text-slate-900 pt-2">Platform Core Capabilities</h2>
            <p className="text-xs text-slate-500">From farm-gate aggregation to confirmed bank settlement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar, index) => (
              <div key={index} className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition flex flex-col justify-between ${pillar.cardBorder}`}>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`w-9 h-9 rounded-xl font-black text-xs flex items-center justify-center shadow-md ${pillar.numBg}`}>
                      0{index + 1}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${pillar.tagBg}`}>
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{pillar.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Phase 0{index + 1}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Ready</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Support Helpline Banner - Gradient Accent */}
        <section className="p-6 md:p-8 bg-white border-t border-gray-200">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-4 shadow-xl border border-indigo-900/50">
            <div className="space-y-1 max-w-md">
              <h3 className="text-base font-extrabold text-indigo-200">FPO Onboarding & Agronomist Helpline</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assistance available for standardizing lots and linking with verified buyers across Maharashtra.
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black px-5 py-3 rounded-xl text-xs font-mono tracking-wider shadow-lg flex items-center gap-2">
              <span>📞</span> 1800-XXX-MAHA (Toll Free)
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default HomeBody;