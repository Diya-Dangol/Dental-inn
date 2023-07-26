// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import ListPatient from "./Components/Patients/ListPatient";
import Login from "./Components/Admin/Login";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/admin' element={<Login/>} />
          <Route path='/patient' element={<ListPatient/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
