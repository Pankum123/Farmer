// import React from 'react';

// function MandiBody() {
//   return (
//     <div className="max-w-screen-2xl container mx-auto md:px-20 bg-gray-100 min-h-screen font-sans">
//       <main className="bg-white rounded-xl shadow-lg mt-20 py-20 px-4 flex items-center justify-center">
//         <h1 className="text-4xl font-bold text-gray-800">
//           Mandi Prices
//         </h1>
//       </main>
//     </div>
    
//   );
// }

// export default MandiBody;



import React, { useState } from 'react';

function MandiBody() {
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const mandiData = [
    {
      id: 1,
      crop: "Soybean (Yellow)",
      category: "Oilseeds",
      icon: "🌱",
      mandi: "Latur APMC",
      district: "Latur",
      minPrice: 4450,
      maxPrice: 4780,
      modalPrice: 4650,
      change: "+3.8%",
      isPositive: true,
      arrivals: "14,200 Qtl",
      arrivalTrend: "Down 12%",
      recommendation: "Hold 3-5 Days",
      adviceBadge: "bg-emerald-500/10 text-emerald-700 border-emerald-400/40",
      accentGrad: "from-emerald-500 to-teal-600",
      reason: "Local oil extraction plants increasing procurement; lower arrivals expected this week."
    },
    {
      id: 2,
      crop: "Onion (Red)",
      category: "Vegetables",
      icon: "🧅",
      mandi: "Lasalgaon APMC",
      district: "Nashik",
      minPrice: 1650,
      maxPrice: 2050,
      modalPrice: 1850,
      change: "-2.4%",
      isPositive: false,
      arrivals: "28,500 Qtl",
      arrivalTrend: "Up 22%",
      recommendation: "Sell Now",
      adviceBadge: "bg-rose-500/10 text-rose-700 border-rose-400/40",
      accentGrad: "from-rose-500 to-orange-500",
      reason: "Heavy influx from Ahmednagar and Niphad belts. Glut expected to soften rates by 4-6%."
    },
    {
      id: 3,
      crop: "Cotton (Medium)",
      category: "Fiber Crops",
      icon: "☁️",
      mandi: "Akola Mandi",
      district: "Akola",
      minPrice: 6850,
      maxPrice: 7350,
      modalPrice: 7150,
      change: "+2.1%",
      isPositive: true,
      arrivals: "8,900 Qtl",
      arrivalTrend: "Stable",
      recommendation: "Hold 4 Days",
      adviceBadge: "bg-cyan-500/10 text-cyan-700 border-cyan-400/40",
      accentGrad: "from-cyan-500 to-blue-600",
      reason: "Spinning mills from Gujarat placing direct off-take orders. Upward momentum steady."
    },
    {
      id: 4,
      crop: "Pigeon Pea (Tur)",
      category: "Pulses",
      icon: "🌾",
      mandi: "Amravati Yard",
      district: "Amravati",
      minPrice: 9100,
      maxPrice: 9750,
      modalPrice: 9480,
      change: "+0.9%",
      isPositive: true,
      arrivals: "5,400 Qtl",
      arrivalTrend: "Down 5%",
      recommendation: "Sell Now",
      adviceBadge: "bg-amber-500/10 text-amber-800 border-amber-400/40",
      accentGrad: "from-amber-500 to-orange-600",
      reason: "Prices near peak threshold. Central buffer stocking bids provide assured liquidation."
    },
    {
      id: 5,
      crop: "Wheat (Lokwan)",
      category: "Cereals",
      icon: "🍞",
      mandi: "Jalgaon APMC",
      district: "Jalgaon",
      minPrice: 2550,
      maxPrice: 2850,
      modalPrice: 2720,
      change: "+1.2%",
      isPositive: true,
      arrivals: "11,100 Qtl",
      arrivalTrend: "Stable",
      recommendation: "Hold 2 Days",
      adviceBadge: "bg-purple-500/10 text-purple-700 border-purple-400/40",
      accentGrad: "from-purple-500 to-indigo-600",
      reason: "Regional flour mill demand consistent. Minor uptick expected before festival season."
    },
    {
      id: 6,
      crop: "Gram (Chana)",
      category: "Pulses",
      icon: "🥣",
      mandi: "Solapur APMC",
      district: "Solapur",
      minPrice: 5600,
      maxPrice: 6100,
      modalPrice: 5920,
      change: "-0.8%",
      isPositive: false,
      arrivals: "7,200 Qtl",
      arrivalTrend: "Up 8%",
      recommendation: "Sell Window Open",
      adviceBadge: "bg-rose-500/10 text-rose-700 border-rose-400/40",
      accentGrad: "from-orange-500 to-rose-500",
      reason: "Arrivals growing from Karnataka borders. Liquidate stock if storage facility lacks aeration."
    }
  ];

  const filteredData = mandiData.filter((item) => {
    const matchesCrop = selectedCrop === 'All' || item.crop.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesSearch = item.mandi.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 bg-gradient-to-b from-slate-100 via-emerald-50/20 to-slate-100 min-h-screen font-sans pb-16">
      <main className="bg-white rounded-3xl shadow-2xl mt-12 overflow-hidden border border-slate-200/80">
        
        {/* 1. Header Section */}
        <section className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-8 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 -mb-10 w-80 h-80 rounded-full bg-teal-400/10 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/40 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-300 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live Mandi Price Stream • Maharashtra APMCs
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">
              Mandi Prices & AI Selling Windows
            </h1>
            <p className="text-emerald-100/90 text-xs md:text-sm max-w-2xl leading-relaxed">
              Transparent spot prices, arrival trends, and data-driven sales advisory to maximize realization for smallholders and FPOs.
            </p>
          </div>
        </section>

        {/* 2. Search & Crop Pill Navigation */}
        <section className="p-6 md:p-8 bg-slate-50/70 border-b border-slate-200">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            
            <div className="relative w-full lg:w-96">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search Mandi, District, or Crop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold shadow-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end">
              {['All', 'Soybean', 'Onion', 'Cotton', 'Tur'].map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide transition shadow-sm ${
                    selectedCrop === crop
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-emerald-500/30 scale-105'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* 3. Modern Data Table */}
        <section className="p-6 md:p-8 overflow-x-auto">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live APMC Market Tickers ({filteredData.length})
            </h2>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Updated: Today 11:30 AM
            </span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gradient-to-r from-slate-100 via-teal-50/50 to-slate-100 text-slate-700 border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="p-4 font-black">Commodity</th>
                  <th className="p-4 font-black">Mandi Yard</th>
                  <th className="p-4 font-black text-right">Min / Max Range</th>
                  <th className="p-4 font-black text-right">Modal Rate</th>
                  <th className="p-4 font-black text-center">24h Shift</th>
                  <th className="p-4 font-black text-center">Arrival Volume</th>
                  <th className="p-4 font-black text-center">AI Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-teal-50/30 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl p-1.5 bg-slate-100 rounded-xl border border-slate-200">{item.icon}</span>
                        <div>
                          <p className="font-extrabold text-slate-900">{item.crop}</p>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-800">{item.mandi}</p>
                      <span className="text-[11px] text-slate-500 font-medium">📍 {item.district}</span>
                    </td>
                    <td className="p-4 text-right">
                      <p className="font-mono text-slate-600 font-bold">₹{item.minPrice} - ₹{item.maxPrice}</p>
                      <span className="text-[10px] text-slate-400">per qtl</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-base font-black text-slate-950 font-mono">₹{item.modalPrice}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full font-black text-[10px] shadow-sm ${
                        item.isPositive ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {item.change}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <p className="font-extrabold text-slate-800">{item.arrivals}</p>
                      <span className="text-[10px] text-slate-500">({item.arrivalTrend})</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-3 py-1.5 rounded-xl font-extrabold text-[11px] border backdrop-blur-sm shadow-xs ${item.adviceBadge}`}>
                        {item.recommendation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Strategic Sale Window Cards */}
        <section className="p-6 md:p-8 bg-slate-50/70 border-t border-slate-200">
          <div className="mb-6">
            <span className="text-xs font-black text-teal-800 uppercase tracking-widest bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
              AI Decision Engine
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-2">Market Dynamics & Advisory Summary</h2>
            <p className="text-xs text-slate-500">Real-time supply and demand analysis helping farmers make informed sales decisions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredData.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition relative overflow-hidden flex flex-col justify-between">
                <div className={`h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r ${item.accentGrad}`}></div>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <h3 className="text-sm font-black text-slate-900">{item.crop}</h3>
                        <p className="text-[11px] text-slate-500 font-medium">{item.mandi}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${item.adviceBadge}`}>
                      {item.recommendation}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 font-medium">
                    {item.reason}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 flex justify-between text-xs font-bold text-slate-600">
                  <span>Modal: <b className="text-slate-900 font-black">₹{item.modalPrice}</b></span>
                  <span>Arrival: <b className="text-slate-900">{item.arrivals}</b></span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default MandiBody;