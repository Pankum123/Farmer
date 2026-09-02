import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import BuyerBody from "../components/BuyerBody";


function Buyer() {
  // const [show, setShow] = useState(false);
  return (

     <div className="min-h-screen flex flex-col">
      <Navbar/>

      {/* Main content area grows to fill remaining height */}
      <BuyerBody/>

      <Footer />
    </div>

  );
}

export default Buyer;
