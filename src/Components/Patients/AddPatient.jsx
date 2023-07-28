import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function AddPatient() {
    const [patient, setPatient] = useState({
        name:'',
        age: '',
        gender:"",
        address: '',
        contact:""
    });

    const handleChange=(e)=>{
        const name=e.target.name;
        const value= e.target.value;
        setPatient({...patient, [name]:value})
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(patient.)
    console.log(patient);

    // setValidated(true);
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
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
            value={patient.value}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Gender</Form.Label>
          <Form.Control
        
            type="text"
            placeholder="Gender"
            name="gender"
            value={patient.gender}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Address" name="address" value={patient.address} onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Contact No.</Form.Label>
          <Form.Control type="text" placeholder="Contact Number" name="contact" value={patient.contact} onChange={handleChange} />
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default AddPatient;