// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import ListPatient from "./Components/Patients/ListPatient";
import Login from "./Components/Admin/Login";
import TopNav from "./Components/Header/Navbar";
import AddPatient from "./Components/Patients/AddPatient";
import EditPatient from "./Components/Patients/EditPatient";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <TopNav />
      <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='patient' element={<ListPatient/>}>
            <Route path="addpatient" element ={<AddPatient/>} />
            <Route path ="editpatient/:id" element ={<EditPatient/>} />
          </Route>
          {/* <Route path='/patient' element={<ListPatient/>} />
          <Route path='/addpatient' element={<AddPatient/>} />
          <Route path='/editpatient/:id' element={<EditPatient/>} /> */}
        </Routes>
      </Router>
    </>
  )
}


// nested routing
export default App
