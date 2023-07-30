import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function EditPatient() {
    const [patient, setPatient] = useState({
        name: "",
        age: "",
        gender: '',
        address: '',
        contact_no:''
    });

    const handleChange=()=>{

    }

    useEffect(()=>{
        fetch('http://localhost:3500/patients/1')
        .then(res => res.json())
        .then(data=> setPatient(data))
    },[])
  return (
    <div>
        <Form noValidate>
            <Row className="mb-3">
            <Form.Group as={Col} md="4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={patient.name}
                onChange={handleChange}
                />
            </Form.Group>
            <Form.Group as={Col} md="4">
                <Form.Label>Age</Form.Label>
                <Form.Control
                type="number"
                placeholder="Age"
                name="age"
                value={patient.age}
                onChange={handleChange}
                />
            </Form.Group>
            <Form.Group as={Col} md="4">
                <Form.Label>Gender</Form.Label>
                {['Male', 'Female', 'Other'].map((type)=>{
                return(
                    <div key={type} className="mb-3" >
                    <Form.Check type="radio" name="gender" id={type} label={type} value={type} onChange={handleChange} checked={type==patient.gender} />
                    </div>
                )
                })}
            </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="6">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address" name="address" value={patient.address} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} md="6">
                <Form.Label>Contact No.</Form.Label>
                <Form.Control type="text" placeholder="Contact Number" name="contact_no" value={patient.contact_no} onChange={handleChange} />
            </Form.Group>
            </Row>
            <Button type="submit">Submit form</Button>
        </Form>
    </div>
  )
}

export default EditPatient