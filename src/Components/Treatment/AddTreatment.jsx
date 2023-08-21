import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'

function AddTreatment() {
  const [treatment, setTreatment] = useState({
    id:"",
    name: ""
  })

  const handleChange=(e)=>{
    const name= e.target.name;
    const value= e.target.value;
    setTreatment({...treatment, [name]:value})
  }
  const [validated, setValidated] = useState(false);
  const navigate= useNavigate();
  
  const handleSubmit=(e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    
    const requestOptions = {
      method:"POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(treatment)
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/treatment`, requestOptions)
    .then(res => res.json())
    .then(navigate('/treatment'))
  }
  
  return (
    <div>
        Add Treatment form
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              maxLength={25}
              type="text"
              placeholder="Name"
              name="name"
              value={treatment.name}
              onChange={handleChange}
              required
            />
             <Form.Control.Feedback type="invalid">Name is Required</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  )
}

export default AddTreatment