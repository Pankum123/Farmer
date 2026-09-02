import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import MandiBody from "../components/MandiBody";


function Mandi() {
  // const [show, setShow] = useState(false);
  return (

     <div className="min-h-screen flex flex-col">
      <Navbar/>

      {/* Main content area grows to fill remaining height */}
      <MandiBody/>

      <Footer />
    </div>

  );
}

export default Mandi;
