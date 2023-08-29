import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import Select from 'react-select'

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
    // console.log(newCheckup)
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
        <Form.Control type="text" name="name" value={checkup.name} placeholder='Name' onChange={handleChange} />
        <Form.Control type="text" name="treatment" value={checkup.treatment} placeholder='Treatment' onChange={handleChange} />
        <Form.Control type="number" name="price" value={checkup.price} placeholder='Price' onChange={handleChange} />
        <Select isMulti={true} onChange={setSelectedOption} options={options}/>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default AddCheckup