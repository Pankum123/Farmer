// import React from 'react';

// function BuyerBody() {
//   return (
//     <div className="pt-20 max-w-screen-2xl container mx-auto md:px-20 bg-gray-100 min-h-screen font-sans">
//       <main className="bg-white rounded-xl shadow-lg mt-20 py-20 px-4 flex items-center justify-center">
//         <h1 className="text-4xl font-bold text-gray-800">
//           Buyer
//         </h1>
//       </main>
//     </div>
    
//   );
// }

// export default BuyerBody;


import React, { useState } from 'react';

function BuyerBody() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [buyerDemands] = useState([
    {
      id: "DEMAND-MH-2026-801",
      companyName: "Sahyadri Agro Processing Ltd",
      buyerType: "Solvent & Oil Mill",
      location: "Bhosari MIDC, Pune",
      crop: "Soybean",
      variety: "Grade A (Yellow Bold)",
      category: "Oilseeds",
      icon: "🏭",
      requiredQty: 240,
      unit: "Quintals",
      offeredPrice: 4650,
      totalBudget: 1116000,
      maxMoisture: "Max 9.5%",
      minPurity: "Min 97.0%",
      maxForeignMatter: "Max 1.0%",
      procurementType: "Cluster Pooling (3 Trucks)",
      deliveryDeadline: "02 Mar 2026",
      trustScore: "4.9 ★ (140+ Orders)",
      tag: "100% Escrow Funded",
      verified: true
    },
    {
      id: "DEMAND-MH-2026-802",
      companyName: "Panchganga Food Processors",
      buyerType: "Pulse & Dal Mill",
      location: "Shiroli MIDC, Kolhapur",
      crop: "Tur (Pigeon Pea)",
      variety: "Maruti Grade A",
      category: "Pulses",
      icon: "🥣",
      requiredQty: 180,
      unit: "Quintals",
      offeredPrice: 9600,
      totalBudget: 1728000,
      maxMoisture: "Max 9.0%",
      minPurity: "Min 98.0%",
      maxForeignMatter: "Max 0.8%",
      procurementType: "FPO Direct / Bulk",
      deliveryDeadline: "05 Mar 2026",
      trustScore: "4.8 ★ (95 Orders)",
      tag: "Instant Payout",
      verified: true
    },
    {
      id: "DEMAND-MH-2026-803",
      companyName: "Maharshi Cotton Ginning Mills",
      buyerType: "Textile Spinning Plant",
      location: "MIDC Phase 2, Nagpur",
      crop: "Cotton",
      variety: "Bt-Cotton Long Staple",
      category: "Fiber",
      icon: "☁️",
      requiredQty: 150,
      unit: "Quintals",
      offeredPrice: 7350,
      totalBudget: 1102500,
      maxMoisture: "Max 8.0%",
      minPurity: "Min 98.5%",
      maxForeignMatter: "Max 1.2%",
      procurementType: "Warehouse Intake",
      deliveryDeadline: "10 Mar 2026",
      trustScore: "4.7 ★ (62 Orders)",
      tag: "WDRA Backed",
      verified: true
    },
    {
      id: "DEMAND-MH-2026-804",
      companyName: "Global Fresh Export Consortium",
      buyerType: "International Exporter",
      location: "JNPT Logistics Park, Navi Mumbai",
      crop: "Onion",
      variety: "Garwa Red (45mm+)",
      category: "Vegetables",
      icon: "🧅",
      requiredQty: 300,
      unit: "Quintals",
      offeredPrice: 1950,
      totalBudget: 585000,
      maxMoisture: "Max 11.5%",
      minPurity: "Min 99.0%",
      maxForeignMatter: "Max 0.5%",
      procurementType: "Container Transit",
      deliveryDeadline: "28 Feb 2026",
      trustScore: "4.9 ★ (210+ Orders)",
      tag: "Export Certified",
      verified: true
    },
    {
      id: "DEMAND-MH-2026-805",
      companyName: "KisanSetu Institutional Hub",
      buyerType: "State Reserve Sourcing",
      location: "Gultekdi Mandi Complex, Pune",
      crop: "Soybean",
      variety: "Phule Sangam",
      category: "Oilseeds",
      icon: "🌱",
      requiredQty: 100,
      unit: "Quintals",
      offeredPrice: 4700,
      totalBudget: 470000,
      maxMoisture: "Max 9.2%",
      minPurity: "Min 98.0%",
      maxForeignMatter: "Max 0.7%",
      procurementType: "Direct Single Farm",
      deliveryDeadline: "01 Mar 2026",
      trustScore: "5.0 ★ (Govt Linked)",
      tag: "Priority Intake",
      verified: true
    },
    {
      id: "DEMAND-MH-2026-806",
      companyName: "Deccan Bio-Refineries Corp",
      buyerType: "Agro Bio-Fuel Plant",
      location: "Chhatrapati Sambhajinagar",
      crop: "Maize (Corn)",
      variety: "Yellow Feed Grade",
      category: "Cereals",
      icon: "🌽",
      requiredQty: 400,
      unit: "Quintals",
      offeredPrice: 2280,
      totalBudget: 912000,
      maxMoisture: "Max 12.0%",
      minPurity: "Min 96.5%",
      maxForeignMatter: "Max 1.5%",
      procurementType: "Multi-Truck Convoy",
      deliveryDeadline: "08 Mar 2026",
      trustScore: "4.6 ★ (48 Orders)",
      tag: "Bulk Ready",
      verified: true
    }
  ]);

  const filteredDemands = buyerDemands.filter(demand => {
    const matchesCategory = selectedCategory === 'All' || demand.category === selectedCategory;
    const matchesSearch = demand.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          demand.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          demand.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20 max-w-screen-2xl container mx-auto md:px-20 bg-gradient-to-b from-slate-100 via-emerald-50/20 to-slate-100 min-h-screen font-sans pb-16">
      <main className="bg-white rounded-3xl shadow-2xl mt-8 overflow-hidden border border-slate-200/80">
        
        {/* Header */}
        <section className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 rounded-full text-emerald-300">
              Institutional Demand • Verified Buyers
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">
              Buyer Procurement Orders
            </h1>
            <p className="text-xs md:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Institutional buyers, dal mills, and food processors with pre-deposited Escrow balances. Directly match your farm lot or join a cluster pool to fulfill institutional demand[cite: 1].
            </p>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="p-6 md:p-8 bg-slate-50/80 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search by Crop, Buyer, or Destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {['All', 'Oilseeds', 'Pulses', 'Fiber', 'Vegetables', 'Cereals'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* CARDS GRID */}
        <section className="p-6 md:p-10 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Procurement Demands ({filteredDemands.length})
            </h2>
            <span className="text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
              🛡️ 100% Escrow Backed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDemands.map((demand) => (
              /* BUYER CARD WITH REFINED FINTECH STYLING */
              <div 
                key={demand.id} 
                className="group relative bg-white rounded-3xl p-6 border-2 border-slate-200/90 hover:border-emerald-500 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between space-y-5 overflow-hidden"
              >
                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="space-y-4">
                  {/* Badge & Demand ID */}
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] font-black tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                      {demand.id}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                      {demand.tag}
                    </span>
                  </div>

                  {/* Crop & Buyer Entity */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform duration-300">
                      {demand.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition truncate">
                        {demand.crop}
                      </h3>
                      <p className="text-xs font-bold text-emerald-800 tracking-tight">{demand.variety}</p>
                      <p className="text-xs text-slate-700 font-black mt-1 truncate">🏢 {demand.companyName}</p>
                      <p className="text-[11px] text-slate-500 truncate">⚙️ {demand.buyerType}</p>
                      <p className="text-[11px] text-slate-500 truncate">📍 Delivery: {demand.location}</p>
                    </div>
                  </div>

                  {/* Quality Acceptance Limits Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-gradient-to-b from-slate-50 to-slate-100/70 p-3 rounded-2xl border border-slate-200 shadow-inner">
                    <div className="text-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-bold">Moisture Limit</span>
                      <span className="text-xs font-black text-emerald-700 mt-0.5 block">{demand.maxMoisture}</span>
                    </div>
                    <div className="text-center border-x border-slate-200">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-bold">Min Purity</span>
                      <span className="text-xs font-black text-slate-900 mt-0.5 block">{demand.minPurity}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-bold">Foreign Matter</span>
                      <span className="text-xs font-black text-slate-900 mt-0.5 block">{demand.maxForeignMatter}</span>
                    </div>
                  </div>

                  {/* Logistics and Credibility Details */}
                  <div className="flex justify-between items-center text-[11px] text-slate-500 px-1 border-t border-slate-100 pt-2 font-medium">
                    <span>🚛 Logistics: <strong className="text-slate-700">{demand.procurementType}</strong></span>
                    <span>🏅 Trust: <strong className="text-emerald-700 font-bold">{demand.trustScore}</strong></span>
                  </div>
                </div>

                {/* Card Commercials & Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Escrow Locked Budget</span>
                    <span className="text-2xl font-black text-slate-950 font-mono tracking-tight block">
                      ₹{demand.totalBudget.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-600 font-semibold">
                      Need: <b>{demand.requiredQty} {demand.unit}</b> • <span className="text-emerald-700 font-bold">₹{demand.offeredPrice}/qtl</span>
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:text-white group-hover:border-transparent flex items-center justify-center font-black text-sm shadow-xs transition-all duration-300 group-hover:scale-105">
                    →
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default BuyerBody;