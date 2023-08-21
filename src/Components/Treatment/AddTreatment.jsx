import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {toast} from 'react-toastify'

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

  const notify =()=> toast.success("New treatment Added", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  
  const handleSubmit=(e)=>{
    if (treatment.name) {
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
    .then(setTreatment({
      id:"",
      name: ""
    }))
    .then(setValidated(false))
    .then(notify)
  }
  
  return (
    <div>
        <div className="d-flex justify-content-center">
      <Form noValidate validated={validated}>
          <Form.Group>
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
      </Form>
          <Button className='ms-2' type="submit" onClick={handleSubmit}>Add</Button>
        </div>

    </div>
  )
}

export default AddTreatment