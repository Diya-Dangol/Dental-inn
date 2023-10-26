import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AddAppointment() {
    
    const {pid}=useParams();

    const [appointment, setAppointment] = useState({
        id:"",
        pid:pid,
        name:"",
        address:"",
        contact_no:"",
        gender:"",
        booked_date: new Date(), 
        booked_time:"",
        created_on:"",
        treatment:""
    })
    
    const [treatmentList, setTreatmentList] = useState([]);
    const [selecttedOptions, SetSelectedOptions]= useState(null)

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
        const name=e.target.name;
        const value= e.target.value;
        setAppointment({...appointment, [name]: value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const newAppointment={...appointment, selecttedOptions}
        const requestOptions = {
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newAppointment)
        }
        
        fetch(`${import.meta.env.VITE_BASE_URL}/appointment`, requestOptions)
        .then(res => res.json())
        .then(data=>console.log(data))
        .then(notify())
        .then(navigate('/appointment'))
    }

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/treatment`)
        .then(res=>res.json())
        .then(data=>setTreatmentList(data))
    },[])

    const options= treatmentList.map((item)=>{
        return(
            {value:item.name, label:item.name}
        )
    })
    
    
  return (
    <div>
        <div className="d-flex justify-content-center">
            <Form>
                <Form.Group>
                    <Form.Control
                    maxLength={25}
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={appointment.name}
                    onChange={handleChange}
                    required
                    />
                    <Form.Control.Feedback type="invalid">Name is Required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                    maxLength={25}
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={appointment.address}
                    onChange={handleChange}
                    required
                    />
                    <Form.Control.Feedback type="invalid">Address is Required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    {['Male', "Female", "Other"].map((type)=>{
                        return(
                            <div key={type} className="mb-3">
                                <Form.Check type="radio" name="gender" id={type} label={type} value={type} onChange={handleChange} aria-errormessage="Please Choose gender." required /> 
                            </div>
                        )
                    })}
                </Form.Group>
                <Form.Group>
                    <Form.Control
                    maxLength={15}
                    type="phone"
                    placeholder="Contact"
                    name="contact_no"
                    value={appointment.contact_no}
                    onChange={handleChange}
                    required
                    />
                    <Form.Control.Feedback type="invalid">Address is Required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Calendar onChange={(val)=>setAppointment({...appointment, booked_date:val})} value={appointment.booked_date} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="time" name="booked_time" placeholder="Appointment Time" value={appointment.booked_time} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select Treatment</Form.Label>
                    <Select isMulti={true} onChange={SetSelectedOptions} options={options} />
                </Form.Group>
            </Form>
        </div>
          <Button className='ms-2' type="submit" onClick={handleSubmit}>Add</Button>
    </div>
  )
}

export default AddAppointment