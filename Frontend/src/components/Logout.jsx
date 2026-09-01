import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    // await axios.post("/api/user/logout") //url ->  http://localhost:6002/user/signup
    await axios.post(`${import.meta.env.VITE_API_URL}/api/user/logout`, {}, {withCredentials: true,})
      .then((response) => {
        if (response.data) {
          setAuthUser({
            ...authUser,
            user: null,
          });
          localStorage.removeItem("Gamified");
          toast.success("Logout successful");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        // setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };
  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
