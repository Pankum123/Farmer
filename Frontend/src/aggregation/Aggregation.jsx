import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import ClusterAggregationBody from "../components/ClusterAggregationBody";


function Aggregation() {
  // const [show, setShow] = useState(false);
  return (

     <div className="min-h-screen flex flex-col">
      <Navbar/>

      {/* Main content area grows to fill remaining height */}
      <ClusterAggregationBody/>

      <Footer />
    </div>

  );
}

export default Aggregation;
