import { useState , useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {toast} from 'react-toastify';

function EditPatient() {
    const [treatment, setTreatment] = useState({
        id:"",
        name: ""
    })
    const param=useParams();
    const navigate = useNavigate();

    const notify =()=> toast.success("Treatment Edited Successfully", {
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
        setTreatment({...treatment, [name]:value})
    }

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/treatment/${param.id}`)
        .then(res => res.json())
        .then(data=> setTreatment(data))
    },[])

    const handleEdit=(e)=>{
        e.preventDefault();

        const requestOptions={
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(treatment)
        }

        fetch(`${import.meta.env.VITE_BASE_URL}/treatment/${param.id}`, requestOptions)
        .then(res=>res.json())
        .then(notify)
        .then(navigate('/treatment'))
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
                value={treatment.name}
                onChange={handleChange}
                />
            </Form.Group>
            </Row>
            <Button type="submit" onClick={handleEdit}>Update</Button>
        </Form>
    </div>
  )
}

export default EditPatient