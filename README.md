# Ghost Squad • Intelligent Agricultural Market Linkage & Escrow Settlement Platform

**Smart India Hackathon 2026**  
**Problem Statement ID:** 26132  
**Title:** Strengthening market linkages and price discovery for farmers  
**Organization:** Government of Maharashtra  
**Theme:** Agriculture, FoodTech & Rural Development


---

## 📌 Problem Overview

Smallholder farmers and FPOs often face difficulties in accessing reliable market prices, finding suitable buyers, managing transportation, and ensuring secure payments. Limited market information and high transportation costs can lead to distress sales at local mandis.

At the same time, institutional buyers face challenges in sourcing verified, quality-assured agricultural produce in bulk quantities directly from farmers.

GhostSquad aims to bridge this gap by creating a transparent digital marketplace connecting farmers with suitable buyers while supporting **price discovery, quality assessment, transportation, live delivery tracking, secure payments, and dispute resolution**.

---

## 💡 Solution Overview

GhostSquad is a digital agricultural market linkage platform that connects farmers with verified buyers while making crop selling, transportation, quality verification, and payments more transparent.

The platform provides:

* **Smart Price Discovery:** Helps farmers compare market prices and make better selling decisions.
* **Smart Buyer Matching:** Connects farmers with suitable buyers based on crop, quantity, location, and price.
* **Smart Order & Live Delivery:** Enables secure order processing with live vehicle tracking from farmer to buyer.
* **Smart Bulk Fulfillment:** Connects multiple nearby farmers to fulfill large buyer requirements through independent transactions.
* **Crop Quality Assessment:** Uses ML-based image analysis along with physical verification for reliable quality assessment.
* **Verified Dispute Resolution:** Handles quality disputes through evidence collection, AI-assisted assessment, and physical verification when required.
* **Smart Transportation:** Assigns suitable vehicles based on distance, availability, and transportation cost.
* **Smart Selling & Crop Recommendations:** Uses market trends and future demand to recommend when to sell and what to grow.
* **Future Crop Agreements:** Enables buyers and farmers to enter into digital pre-harvest agreements with security deposits.

---

## 🏗️ Technical Architecture & Modules

### 1. 🚚 Smart Order & Live Delivery

* Buyers can select the most suitable crop based on **price, location, and availability** and place an order.

   <img width="1761" height="537" alt="image" src="https://github.com/user-attachments/assets/bb3dd583-8ee2-4da4-8856-494f95587664" />

* The buyer's payment is securely held by the **Admin** until successful delivery and verification.

   <img width="1742" height="557" alt="image" src="https://github.com/user-attachments/assets/f25f5d8b-c514-41cd-bd18-e47f792fec57" />

* Once the order is confirmed, a suitable vehicle is assigned to the farmer.
* The crop is loaded and transported toward the buyer.
* Both the **farmer and buyer can track the vehicle live on the map**.


  <img width="1727" height="602" alt="image" src="https://github.com/user-attachments/assets/9469653b-96af-4684-9f4c-433347ec9070" />


**After Delivery:**

* ✅ **Accepted:** Admin releases the payment to the farmer.

  <img width="1731" height="680" alt="image" src="https://github.com/user-attachments/assets/2e5c19ae-6b33-41bf-ad3b-f6f221443c83" />

* ❌ **Rejected:** The vehicle returns the crop to the farmer and Admin refunds the buyer.


  <img width="1752" height="646" alt="image" src="https://github.com/user-attachments/assets/7daa7740-9f5d-4a52-88d3-d9696b6e9bbf" />


  <img width="1767" height="626" alt="image" src="https://github.com/user-attachments/assets/5e7a9a94-75be-4a15-8999-648be12dd4fb" />


Finally, both farmer and buyer can provide **ratings and feedback**, helping build trust scores for future transactions.


   <img width="1741" height="691" alt="image" src="https://github.com/user-attachments/assets/ef8e68f2-1d29-40b3-b696-7c2b34bd9be6" />


   <img width="1757" height="746" alt="image" src="https://github.com/user-attachments/assets/57764124-d859-4f50-b1b7-af7c9de94f3f" />


---

### 2. 📦 Smart Bulk Order Fulfillment

* For large orders, the platform connects multiple nearby farmers within a **20 km cluster**.
* For example, a buyer requiring **240 quintals** can source the required quantity from multiple farmers.
* Each farmer gets a **separate truck and independent transaction**.
* Every farmer's lot is inspected separately at delivery.
* Accepted lots receive individual payments.
* Rejected lots are returned without affecting other farmers' transactions.


   <img width="1757" height="751" alt="image" src="https://github.com/user-attachments/assets/7b7d6926-65c0-4a21-8a62-c8a13f07703d" />


---

### 3. 🚛 Smart Transportation

* Transporters can register on the platform with their **vehicle details and availability**.
* After an order is confirmed, the system assigns a suitable vehicle based on:

  * 📍 Distance
  * 🚛 Vehicle availability
  * 💰 Transportation cost
* The Admin manages the transportation payment.
* Live vehicle tracking provides transparency throughout the delivery process.

---

### 4. 🌾 Crop Quality Assessment

* Farmers can upload **crop images** to the platform.
* Our **ML model** analyzes the image and provides an estimated quality grade.
* For accurate verification, farmers can visit the nearest **registered quality testing center**.
* The crop is physically tested and assigned an **official quality grade**.

---

### 5. ⚖️ Verified Dispute Resolution System

* The platform protects both farmers and buyers during **quality-related disputes**.
* Only the **disputed amount** is temporarily secured instead of blocking the entire transaction.
* The system collects relevant evidence such as:

  * 📷 Crop images
  * 📄 Quality reports
  * 🧾 Transaction details
* **AI-assisted assessment** helps analyze the available evidence.
* Unresolved disputes are escalated to **physical quality verification** at a registered testing center.

---

### 6. 🤝 Price Negotiation

* Farmers and buyers can **directly negotiate** the crop price through the platform.
* The price can be adjusted **per quintal** during negotiation.
* This helps both parties reach a **fair and mutually beneficial price**.

---

### 7. 📈 Smart Selling Recommendation

* After harvesting, the system analyzes **market prices and price trends**.
* It predicts short-term market movement and recommends the most suitable selling time.
* If prices are expected to rise in the next **2–3 days**, the system may recommend holding the crop.
* Otherwise, it recommends selling immediately.
* This helps farmers make **data-driven selling decisions and maximize returns**.

---

### 8. 🌱 Future Crop Recommendation

* The system analyzes **historical market data and future demand trends**.
* It recommends suitable crops for the next cultivation season based on potential profitability.
* For example, if soybean demand is expected to increase over the coming months, the system may recommend **soybean cultivation** for better future returns.

---

### 9. 📑 Future Crop Agreement

* Buyers can place **future purchase orders** with groups of farmers before the harvesting season.
* For example, a buyer can agree to purchase **400 quintals of soybean at a fixed price after harvest**.
* Both parties enter into a **digital agreement** and deposit a security amount.

**Agreement Rules:**

* ✅ If the deal is successfully completed, the security amount is returned to both parties.
* ❌ If either party backs out without a valid reason, the respective security amount is forfeited.

---

## 🔄 Overall Solution Flow

```text
Farmer
   ↓
Crop Registration
   ↓
Quality Assessment
   ↓
Price Discovery & Negotiation
   ↓
Buyer Matching
   ↓
Order Confirmation
   ↓
Smart Transportation
   ↓
Live Delivery Tracking
   ↓
Quality Verification
   ↓
┌─────────────────────┐
│  Accepted / Rejected │
└─────────────────────┘
       ↓
Payment / Refund
       ↓
Rating & Trust Score
```

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **APIs & Maps:** Google Maps JavaScript API, Geometry Library
* **State Management:** Context API
* **Routing:** React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **ML:** Crop Image-Based Quality Assessment
* **Data Sources:** Agmarknet / e-NAM market price data structure
* **Real-Time Tracking:** GPS-based live vehicle tracking simulation
* **Transaction Management:** Escrow-based payment lifecycle

---

## 🚀 Getting Started

### Prerequisites

* Node.js **v18+**
* npm
* MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Pankum123/Farmer.git
```

2. Navigate to the frontend directory:

```bash
cd Farmer/Frontend
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

---
## 📂 Project Structure

```text
Farmer/
└── Frontend/
    ├── public/
    │
    ├── src/
    │   ├── aggregation/
    │   │   └── Aggregation.jsx
    │   │
    │   ├── assets/
    │   │
    │   ├── buyer/
    │   │   └── Buyer.jsx
    │   │
    │   ├── components/
    │   │   ├── BuyerBody.jsx
    │   │   ├── ClusterAggregationBody.jsx
    │   │   ├── FarmerBody.jsx
    │   │   ├── Footer.jsx
    │   │   ├── HomeBody.jsx
    │   │   ├── LivetransitBody.jsx
    │   │   ├── Login.jsx
    │   │   ├── Logout.jsx
    │   │   ├── MandiBody.jsx
    │   │   ├── Navbar.jsx
    │   │   └── Signup.jsx
    │   │
    │   ├── context/
    │   │   └── AuthProvider.jsx
    │   │
    │   ├── farmer/
    │   │   └── Farmer.jsx
    │   │
    │   ├── home/
    │   │   └── Home.jsx
    │   │
    │   ├── livetransit/
    │   │   └── Livetransit.jsx
    │   │
    │   ├── mandi/
    │   │   └── Mandi.jsx
    │   │
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    │
    ├── .env
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js
```

## 🚀 Live Demo

[🔗 View Live Application](https://farmer-gysa.onrender.com/)

## 🚀 YouTube Video

[🔗 YouTube Video Link](https://youtu.be/qafjkrSRKo0)

## 👥 Team: Ghost Squad

**Developed for Smart India Hackathon 2026**

> *Building transparent, secure, and high-trust digital infrastructure for Indian agriculture.*

---
