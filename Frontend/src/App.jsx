import React from "react"
import {Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./home/Home"
import { Toaster } from "react-hot-toast"
import { useAuth } from "./context/AuthProvider"
import Dashboard from "./dashboard/Dashboard"
import Lessons from "./lessons/Lessons"


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
          path="/dashboard"
          element={<Dashboard/>}
        />
        <Route
          path="/lessons"
          element={<Lessons/>}
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
