import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

function EditCheckup() {
  const {pid,id}= useParams();
  const [checkup,setCheckup]= useState({
    id:"",
    pid:pid,
    name:"",
    treatment:"",
    price:""
  })

  const navigate = useNavigate();

  const notify = ()=> toast.success("Checkup Edited successfully",{
    position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  })

  const handleChange=(e)=>{
    const name= e.target.name;
    const value= e.target.value;
    setCheckup({...checkup,[name]:value})
  }

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_BASE_URL}/checkup/${id}`)
    .then(res=>res.json())
    .then(data=>setCheckup(data))
  },[])

  const handleEdit=(e)=>{
    e.preventDefault();

    const requestOptions={
      method: 'PUT',
      headers: {'Content-type':'application/json'},
      body:JSON.stringify(checkup)
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/checkup/${id}`, requestOptions)
    .then(res=> res.json)
    .then(notify)
    .then(navigate(`/checkup/${pid}`))
  }

  return (
    <div> 
      <Form onSubmit={handleEdit}>
        <Form.Control type="number" name="pid" defaultValue={checkup.pid} />
        <Form.Control type="text" name="name" value={checkup.name} placeholder='Name' onChange={handleChange} />
        <Form.Control type="text" name="treatment" value={checkup.treatment} placeholder='Treatment' onChange={handleChange} />
        <Form.Control type="number" name="price" value={checkup.price} placeholder='Price' onChange={handleChange} />
        <Button type="submit">Update</Button>
      </Form>
    </div>
  )
}

export default EditCheckup