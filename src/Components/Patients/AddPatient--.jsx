import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import FormInput from './FormInput';

function AddPatient() {
  const [patient, setPatient] = useState({
    id:'',
    name:'',
    age:'',
    gender:'',
    address:'',
    contact_no:''
  });

  const inputs=[
    {
      id: 1,
      name: 'name',
      type:'text',
      placeholder: 'Name',
      errorMessage: "Username should not contain any numbers or special characters",
      pattern: "^[A-Za-z]$",
      required: true,
    },
    {
      id: 2,
      name: 'age',
      type: 'number',
      placeholder: 'Age',
      maxLength: 3,
      errorMessage: 'Age should not exceed 3 character',
      required: true,
    },
    {
      id: 3,
      name: 'gender',
      type: 'radio',
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Address",
    },
    {
      id: 5,
      name: "contact_no",
      type: 'number',
      placeholder: "Contact Number",
      errorMessage: "Not a phone number?",
      required: true,
    }
  ]

  const handleChange=(e)=>{
    const name=e.target.name;
    const value= e.target.value;
    setPatient({...patient, [name]:value})
  }

  const navigate =useNavigate();

  const notify =()=> toast.success("New Patient Added", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions ={
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(patient)
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/patients`, requestOptions)
    .then(res => res.json())
    .then(notify)
    .then(navigate('/patient'))
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        {inputs.map((input)=>(
          <FormInput key={input.id} {...input} value={patient[input.name]} onChange={handleChange} errorMessage={patient[input.errorMessage]} />
        ))}
      </form>
    </>
  );
}

export default AddPatient;