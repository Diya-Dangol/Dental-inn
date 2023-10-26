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
import TreatmentList from "./Components/Treatment/TreatmentList";
import AddTreatment from "./Components/Treatment/AddTreatment";
import EditTreatment from "./Components/Treatment/EditTreatment";
import Register from './Components/Admin/Register';
import Sidebar from "./Components/Sidebar/Sidebar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './assets/css/main.css';
import AddAppointment from "./Components/Appointment/AddAppointment";
import AppointmentList from "./Components/Appointment/AppointmentList";

function App() {
  return (
    <>
      <ToastContainer />
      <TopNav />
      <Row>
        <Col xs md lg={2}>
          <Sidebar/>
        </Col>
        <Col xs md lg={10}>
          <Router className="bg-img">
            <Routes>
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/' element={<ListPatient/>} />
              <Route path='patient'> 
              {/* element={<TopNav/>} yo narakhe pani hunxa? Route ma? */}
                <Route path="list" element={<ListPatient/>} />
                <Route index element={<ListPatient/>} />
                <Route path="add" element ={<AddPatient/>} />
                <Route path ="edit/:id" element ={<EditPatient/>} />
              </Route>
              <Route path='/checkup/:pid' element={<CheckupList />} />
              <Route path='/checkup/:pid/add' element={<AddCheckup />} />
              <Route path='/checkup/:pid/edit/:id' element={<EditCheckup />} />

              <Route path="treatment" element ={<TreatmentList />}/>
              <Route path="treatment/add" element={<AddTreatment />} />
              <Route path="treatment/edit/:id" element={<EditTreatment />} />
              {/* </Route> */}
              <Route path="appointment">
                <Route index element={<AppointmentList/>} />
                <Route path="add" element={<AddAppointment/>} />
              </Route>
            </Routes>
          </Router>
        </Col>
      </Row>
    </>
  )
}


// nested routing
export default App
