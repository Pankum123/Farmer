# GhostSquad • Intelligent Agricultural Market Linkage & Escrow Settlement Platform

> **Smart India Hackathon 2026**  
> **Problem Statement ID:** 26132  
> **Title:** Strengthening market linkages and price discovery for farmers  
> **Organization:** Government of Maharashtra
> **Theme:** Agriculture, FoodTech & Rural Development  

---

## 📌 Problem Overview
Smallholder farmers and FPOs face severe information asymmetry regarding market demand, price trends, and buyer credentials. Due to liquidity constraints and high transportation costs, farmers often resort to distress sales at local mandis. Concurrently, institutional buyers struggle to source verified, uniform-quality produce in bulk volumes directly from farm gates.

---

## 💡 Solution Overview
GhostSquad has engineered a full-stack digital transaction enablement and market linkage engine. The platform bridges farm gates to verified institutional buyers with:
- **Net-Return Price Discovery:** Optimizes selling decisions by factoring in mandi rates, buyer bids, and real transport costs.
- **Digital Lot Passports:** Verified crop specifications (moisture, purity index, and harvest metadata).
- **Live GPS Telemetry (15s Simulation):** Real-time transit monitoring via Google Maps API from farm-gate to processing plant.
- **Automated Escrow Vault:** Pre-funded buyer escrow ensuring guaranteed payment upon gate pass approval or instant refund on rejection.
- **Cluster Aggregation Fleet Model:** Aggregates multi-farmer consignments in independent vehicles to eliminate cross-contamination risk.

---

## 🏗️ Technical Architecture & Modules

### 1. `Home` (Platform Gateway & Command Center)
- Central landing and onboarding portal for farmers, FPOs, and institutional buyers.
- Visual workflow breakdown, platform security protocols, and live trading insights.

### 2. `Mandi Prices` (Smart Price Discovery & Net-Return Engine)
- Real-time mandi rate aggregations sourced from Agmarknet and e-NAM data feeds.
- **Net-Return Optimization:** Deducts localized transportation and logistics costs to recommend the most profitable market destination.
- Dynamic sale-window recommendations and multi-market rate comparisons.

### 3. `Farmer` (Digital Lot Creation)
- Produce registration with moisture %, foreign matter %, and volume.
- Instant lot valuation and certified digital passports.

### 4. `Buyer` (Institutional Procurement)
- Bulk procurement demand matching with quality cutoff limits.
- 100% Escrow-funded contract validation.

### 5. `Livetransit` (GPS Telemetry & Escrow Lifecycle)
- 15-second highway simulation between Latur Farm Gate and Pune Processing Plant via NH-65.
- Direction-aware SVG vehicle markers (auto-adjusted for Westward/Eastward transit).
- Gate QC verification triggering instant IMPS bank transfer or return transit with 100% escrow refund.

### 6. `ClusterAggregation` (Multi-Farmer Fleet)
- Sourcing 240+ Quintals across 3 independent farmer consignments.
- Individual truck tracking and isolated gate inspections with granular split disbursements.

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **APIs & Telemetry:** Google Maps JavaScript API, Geometry Library
- **State & Routing:** Context API / Modular Page-Wrapper Architecture
- **Data Protocols:** Agmarknet / e-NAM price feed structure, Escrow transaction lifecycle simulation

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Pankum123/Farmer.git

2. Navigate to the frontend directory:
   ```Bash
   cd Farmer/Frontend

3. Run the development server:
   ```Bash
   npm run dev

## 👥 Team: GhostSquad

**Developed for Smart India Hackathon 2026**  
*Dedicated to building transparent, high-trust digital infrastructure for Indian agriculture.*
