// import React from 'react';

// function FarmerBody() {
//   return (
//     <div className="pt-20 max-w-screen-2xl container mx-auto md:px-20 bg-gray-100 min-h-screen font-sans">
//       <main className="bg-white rounded-xl shadow-lg mt-20 py-20 px-4 flex items-center justify-center">
//         <h1 className="text-4xl font-bold text-gray-800">
//           Farmer
//         </h1>
//       </main>
//     </div>
    
//   );
// }

// export default FarmerBody;




import React, { useState } from 'react';

function FarmerBody() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [farmerLots] = useState([
    {
      id: "LOT-MH-2026-101",
      farmerName: "Ramesh Patil",
      fpoName: "Shivaji Shetkari FPO",
      location: "Ausa, Latur",
      crop: "Soybean",
      variety: "JS-335 (Grade A)",
      category: "Oilseeds",
      icon: "🌱",
      qty: 90,
      unit: "Quintals",
      expectedPrice: 4650,
      totalValuation: 418500,
      moisture: "9.1%",
      purity: "98.5%",
      foreignMatter: "0.5%",
      harvestDate: "15 Feb 2026",
      storageType: "Dry Shed",
      tag: "Lab Tested",
      verified: true
    },
    {
      id: "LOT-MH-2026-102",
      farmerName: "Suresh Deshmukh",
      fpoName: "Marathwada Agro Cluster",
      location: "Murud, Latur",
      crop: "Soybean",
      variety: "Phule Sangam",
      category: "Oilseeds",
      icon: "🌱",
      qty: 80,
      unit: "Quintals",
      expectedPrice: 4650,
      totalValuation: 372000,
      moisture: "9.4%",
      purity: "97.8%",
      foreignMatter: "0.8%",
      harvestDate: "18 Feb 2026",
      storageType: "Cold Storage",
      tag: "High Protein",
      verified: true
    },
    {
      id: "LOT-MH-2026-103",
      farmerName: "Ganesh Jadhav",
      fpoName: "Nilanga Krishak Sangha",
      location: "Nilanga, Latur",
      crop: "Soybean",
      variety: "JS-9305",
      category: "Oilseeds",
      icon: "🌱",
      qty: 70,
      unit: "Quintals",
      expectedPrice: 4600,
      totalValuation: 322000,
      moisture: "9.6%",
      purity: "96.5%",
      foreignMatter: "1.0%",
      harvestDate: "20 Feb 2026",
      storageType: "Farm Gate",
      tag: "Direct Farm",
      verified: true
    },
    {
      id: "LOT-MH-2026-104",
      farmerName: "Kishor Shinde",
      fpoName: "Godavari Valley Farmers",
      location: "Lasalgaon, Nashik",
      crop: "Onion",
      variety: "Garwa Red (Export Grade)",
      category: "Vegetables",
      icon: "🧅",
      qty: 120,
      unit: "Quintals",
      expectedPrice: 1850,
      totalValuation: 222000,
      moisture: "11.2%",
      purity: "99.0%",
      foreignMatter: "0.3%",
      harvestDate: "10 Feb 2026",
      storageType: "Chawl",
      tag: "Export Ready",
      verified: true
    },
    {
      id: "LOT-MH-2026-105",
      farmerName: "Balasaheb Deshmukh",
      fpoName: "Vidarbha Cotton Co.",
      location: "Akola Hub",
      crop: "Cotton",
      variety: "Bt-Cotton (Long Staple)",
      category: "Fiber",
      icon: "☁️",
      qty: 55,
      unit: "Quintals",
      expectedPrice: 7200,
      totalValuation: 396000,
      moisture: "7.5%",
      purity: "98.0%",
      foreignMatter: "1.2%",
      harvestDate: "05 Feb 2026",
      storageType: "Warehouse",
      tag: "WDRA Certified",
      verified: true
    },
    {
      id: "LOT-MH-2026-106",
      farmerName: "Vinod Ghate",
      fpoName: "Amravati Pulse Producers",
      location: "Chandur, Amravati",
      crop: "Tur (Arhar)",
      variety: "Maruti (Grade A Bold)",
      category: "Pulses",
      icon: "🌾",
      qty: 60,
      unit: "Quintals",
      expectedPrice: 9500,
      totalValuation: 570000,
      moisture: "8.8%",
      purity: "98.2%",
      foreignMatter: "0.6%",
      harvestDate: "12 Feb 2026",
      storageType: "FPO Godown",
      tag: "Bold Seed",
      verified: true
    }
  ]);

  const filteredLots = farmerLots.filter(lot => {
    const matchesCategory = selectedCategory === 'All' || lot.category === selectedCategory;
    const matchesSearch = lot.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lot.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lot.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20 max-w-screen-2xl container mx-auto md:px-20 bg-gradient-to-b from-slate-100 via-emerald-50/20 to-slate-100 min-h-screen font-sans pb-16">
      <main className="bg-white rounded-3xl shadow-2xl mt-8 overflow-hidden border border-slate-200/80">
        
        {/* Header */}
        <section className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 rounded-full text-emerald-300">
              Farmer Gate • Digital Lot Passports
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">
              Registered Produce Listings
            </h1>
            <p className="text-xs md:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Transparent digital lots created directly by farmers and FPOs. Quality specifications, moisture assays, and farm-gate valuations verified before dispatch.
            </p>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="p-6 md:p-8 bg-slate-50/80 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search by Crop, Farmer, or Location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {['All', 'Oilseeds', 'Pulses', 'Vegetables', 'Fiber'].map(cat => (
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
              Verified Farm Lots ({filteredLots.length})
            </h2>
            <span className="text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
              🛡️ Escrow Protected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLots.map((lot) => (
              /* CARD CONTAINER WITH ULTRA MODERN CSS */
              <div 
                key={lot.id} 
                className="group relative bg-white rounded-3xl p-6 border-2 border-slate-200/90 hover:border-emerald-500 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between space-y-5 overflow-hidden"
              >
                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="space-y-4">
                  {/* Badge & Lot ID */}
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] font-black tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                      {lot.id}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                      {lot.tag}
                    </span>
                  </div>

                  {/* Crop Header */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform duration-300">
                      {lot.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition truncate">
                        {lot.crop}
                      </h3>
                      <p className="text-xs font-bold text-emerald-800 tracking-tight">{lot.variety}</p>
                      <p className="text-xs text-slate-700 font-black mt-1">👨‍🌾 {lot.farmerName}</p>
                      <p className="text-[11px] text-slate-500 truncate">🏢 {lot.fpoName}</p>
                      <p className="text-[11px] text-slate-500 truncate">📍 {lot.location}</p>
                    </div>
                  </div>

                  {/* High-Tech Quality Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-gradient-to-b from-slate-50 to-slate-100/70 p-3 rounded-2xl border border-slate-200 shadow-inner">
                    <div className="text-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-bold">Moisture</span>
                      <span className="text-xs font-black text-emerald-700 mt-0.5 block">{lot.moisture}</span>
                    </div>
                    <div className="text-center border-x border-slate-200">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-bold">Purity</span>
                      <span className="text-xs font-black text-slate-900 mt-0.5 block">{lot.purity}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-bold">Foreign Mtr</span>
                      <span className="text-xs font-black text-slate-900 mt-0.5 block">{lot.foreignMatter}</span>
                    </div>
                  </div>

                  {/* Additional Lot Specs */}
                  <div className="flex justify-between items-center text-[11px] text-slate-500 px-1 border-t border-slate-100 pt-2 font-medium">
                    <span>📅 Harvest: <strong className="text-slate-700">{lot.harvestDate}</strong></span>
                    <span>📦 Storage: <strong className="text-slate-700">{lot.storageType}</strong></span>
                  </div>
                </div>

                {/* Card Commercials & Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Lot Valuation</span>
                    <span className="text-2xl font-black text-slate-950 font-mono tracking-tight block">
                      ₹{lot.totalValuation.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-600 font-semibold">
                      {lot.qty} {lot.unit} • <span className="text-emerald-700 font-bold">₹{lot.expectedPrice}/qtl</span>
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

export default FarmerBody;