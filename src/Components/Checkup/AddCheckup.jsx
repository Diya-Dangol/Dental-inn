import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import Select from 'react-select';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AddCheckup() {
  const [treatmentlist, setTreatmentlist] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const {pid}=useParams();
  const [checkup, setCheckup] = useState({
    id:"",
    pid: pid,
    name:"",
    treatment:"",
    price:""
  })

  const navigate= useNavigate();

  const notify =()=> toast.success("New Checkup Added", {
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
    const name= e.target.name;
    const value= e.target.value;
    setCheckup({...checkup, [name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    const newCheckup= {...checkup, selectedOption}
    const requestOptions={
      method: "POST",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify(newCheckup)
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/checkup`, requestOptions)
    .then(res=> res.json())
    .then(notify)
    .then(navigate(`/checkup/${pid}`))
  }

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_BASE_URL}/treatment`)
    .then(res=> res.json())
    .then(data => setTreatmentlist(data))
  },[treatmentlist])

  const options = treatmentlist.map((item)=>{
    return(
      {value: item.name, label: item.name}
    )
  })

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
        <Form.Group as={Col} md='6'>
          <Form.Label>Checkup Name</Form.Label>
          <Form.Control type="text" name="name" value={checkup.name} placeholder='Name' onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} md='6'>
          <Form.Label>Treatment</Form.Label>
          <Select isMulti={true} onChange={setSelectedOption} options={options}/>
        </Form.Group>
        <Form.Group as={Col} md='6'>
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={checkup.price} placeholder='Price' onChange={handleChange} />
        </Form.Group>
        </Row>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default AddCheckup