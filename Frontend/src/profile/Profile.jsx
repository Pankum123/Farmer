
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import ProfileBody from "../components/ProfileBody";



function Profile() {
  return (

     <div className="min-h-screen flex flex-col">
      <Navbar/>

      {/* Main content area grows to fill remaining height */}
        <ProfileBody/>

      <Footer />
    </div>

  );
}

export default Profile;
