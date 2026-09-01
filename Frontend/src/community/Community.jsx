import React, { useState } from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import CommunityBody from "../components/CommunityBody"


function Community() {
  // const [show, setShow] = useState(false);
  return (

     <div className="min-h-screen flex flex-col">
      <Navbar/>

      {/* Main content area grows to fill remaining height */}
      <CommunityBody/>

      <Footer />
    </div>

  );
}

export default Community;
