// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import ListPatient from "./Components/Patients/ListPatient";
import Login from "./Components/Admin/Login";
import TopNav from "./Components/Header/Navbar";
import AddPatient from "./Components/Patients/AddPatient";

function App() {

  return (
    <>
      <TopNav />
      <Router>
        <Routes>
          <Route path='/admin' element={<Login/>} />
          <Route path='/patient' element={<ListPatient/>} />
          <Route path='/form' element={<AddPatient/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
