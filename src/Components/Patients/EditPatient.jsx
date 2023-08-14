import { useState , useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {toast} from 'react-toastify';

function EditPatient() {
    const [patient, setPatient] = useState({
        id: "",
        name: "",
        age: "",
        gender: '',
        address: '',
        contact_no:''
    });

    const param=useParams();
    const navigate = useNavigate();

    const notify =()=> toast.success("Patient Edited Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setPatient({...patient, [name]:value})
    }

    useEffect(()=>{
        fetch(`http://localhost:3500/patients/${param.id}`)
        .then(res => res.json())
        .then(data=> setPatient(data))
    },[])

    const handleEdit=(e)=>{
        e.preventDefault();

        const requestOptions={
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(patient)
        }

        fetch(`http://localhost:3500/patients/${param.id}`, requestOptions)
        .then(res=>res.json())
        .then(notify)
        .then(navigate('/patient'))
    }

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
            <Button type="submit" onClick={handleEdit}>Upadate</Button>
        </Form>
    </div>
  )
}

export default EditPatient