
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import LessonsBody from "../components/LessonsBody";



function Lessons() {
  return (

     <div className="min-h-screen flex flex-col">
      <Navbar/>

      {/* Main content area grows to fill remaining height */}
      <LessonsBody/>

      <Footer />
    </div>

  );
}

export default Lessons;
