import React from "react"
import {Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./home/Home"
import { Toaster } from "react-hot-toast"
import { useAuth } from "./context/AuthProvider"
import Mandi from "./mandi/Mandi"
import Farmer from "./farmer/Farmer"
import Buyer from "./buyer/Buyer"
import Livetransit from "./livetransit/Livetransit"



function App() {

  const [authUser, setAuthUser] = useAuth();
  console.log("app.jsx mai hai authuser : ",authUser);

  return (
    <>
      <Routes>

        <Route
          path="/"
          element={<Home/>}
        />

         {/* <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/signup" />} /> */}

        
        <Route
          path="/mandi"
          element={<Mandi/>}
        />

        <Route
          path="/farmer"
          element={<Farmer/>}
        />

        <Route
          path="/buyer"
          element={<Buyer/>}
        />

        <Route
          path="/live-transit"
          element={<Livetransit/>}
        />

        <Route
          path="/login"
          element={<Login />}
        />

         <Route
          path="/signup"
          element={<Signup />}
        />

      </Routes>
      <Toaster/>
    </>
  )
}

export default App
