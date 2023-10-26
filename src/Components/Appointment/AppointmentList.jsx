import {useState, useEffect} from 'react';
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";

function AppointmentList() {
    const [appointment, setAppointment]= useState([]);

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/appointment`)
        .then(res=>res.json())
        .then(data=>setAppointment(data))
    },[])
    
  return (
    <div>
        <Button variant="primary" href="appointment/add">Add New Appointment</Button>
        <Button variant="primary">Search</Button>
        <div>
            <Table striped bordered hover responsive>
            <thead >
                <tr>
                <th>SN</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Gender</th>
                <th>Booked Date</th>
                <th>Booked Time</th>
                <th>Treatment</th>
                </tr>
            </thead>
            <tbody>
                {appointment.map((val, index)=>{
                    const {id, name,address,contact_no,gender, booked_date, booked_time, selectedOption}=val;
                    return(
                    <tr key={id} > 
                        <td>{index+1}</td>
                        <td>{name}</td>
                        <td>{address}</td>
                        <td>{contact_no}</td>
                        <td>{gender}</td>
                        <td>{booked_date}</td>
                        <td>{booked_time}</td>
                        <td>{selectedOption? selectedOption.map((item)=>item.value).toString() : null}</td>
                        <td>
                        <Button variant="primary" >EDIT</Button>
                        <Button variant="danger" >DELETE</Button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
            </Table>
      </div>
    </div>
  )
}

export default AppointmentList