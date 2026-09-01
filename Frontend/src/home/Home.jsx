import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import HomeBody from "../components/HomeBody";


function Home() {
  // const [show, setShow] = useState(false);
  return (

     <div className="min-h-screen flex flex-col">
      <Navbar/>

      {/* Main content area grows to fill remaining height */}
      <HomeBody/>

      <Footer />
    </div>

  );
}

export default Home;
