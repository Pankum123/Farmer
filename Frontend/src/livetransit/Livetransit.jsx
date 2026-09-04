import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import LivetransitBody from "../components/LivetransitBody";



function Livetransit() {
  // const [show, setShow] = useState(false);
  return (

     <div className="min-h-screen flex flex-col">
      <Navbar/>

      {/* Main content area grows to fill remaining height */}
      <LivetransitBody/>

      <Footer />
    </div>

  );
}

export default Livetransit;
