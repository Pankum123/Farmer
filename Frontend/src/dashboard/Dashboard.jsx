import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import DashboardBody from "../components/DashboardBody"



function Dashboard() {
  return (

     <div className="min-h-screen flex flex-col">
      <Navbar/>

      {/* Main content area grows to fill remaining height */}
      <DashboardBody/>
      

      <Footer />
    </div>

  );
}

export default Dashboard;
