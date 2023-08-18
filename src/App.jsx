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
import CheckupList from "./Components/Checkup/CheckupList";
import AddCheckup from "./Components/Checkup/AddCheckup";
import EditCheckup from './Components/Checkup/EditCheckup';

function App() {
  return (
    <>
      <ToastContainer />
      {/* <TopNav /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='patient' element={<TopNav/>}>
            <Route path="list" element={<ListPatient/>} />
            <Route index element={<ListPatient/>} />
            <Route path="add" element ={<AddPatient/>} />
            <Route path ="edit/:id" element ={<EditPatient/>} />
          </Route>
          <Route path='/checkup/:pid' element={<CheckupList />} />
          <Route path='/checkup/:pid/add' element={<AddCheckup />} />
          <Route path='/checkup/:pid/edit/:id' element={<EditCheckup />} />
        </Routes>
      </Router>
    </>
  )
}


// nested routing
export default App
