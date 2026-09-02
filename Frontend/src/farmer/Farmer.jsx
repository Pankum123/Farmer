import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import FarmerBody from "../components/FarmerBody";


function Farmer() {
  // const [show, setShow] = useState(false);
  return (

     <div className="min-h-screen flex flex-col">
      <Navbar/>

      {/* Main content area grows to fill remaining height */}
      <FarmerBody/>

      <Footer />
    </div>

  );
}

export default Farmer;
