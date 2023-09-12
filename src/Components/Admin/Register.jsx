import {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

function Register(){
    const [register, setRegister] = useState({
        id: "",
        username:'',
        email:'',
        password:'',
        confirmPassword: ''
    })
    const navigate= useNavigate();

    const notify=()=> toast.success("Registered successfully",{
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    })

    const handleChange=(e)=>{
        const name= e.target.name;
        const value= e.target.value;
        setRegister({...register, [name]: value});
        console.log("name:",name,"value:",value);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        // if(register.username && register.email && register.password=== register.confirmPassword){
            console.log(register);
        // }

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(register)
        }
        fetch(`${import.meta.env.VITE_BASE_URL}/register`, requestOptions)
        .then(res=> res.json())
        .then(setRegister({
            id:"",
            username:"",
            email:"",
            password: "",
            confirmPassword: ""
        }))
        .then(notify)
        .then(navigate('/login'))
    }

    
    return(
        <div>
            <Form className="form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Uername </Form.Label>
                    <Form.Control type="name" placeholder="Enter username" name="username" value={register.username} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={register.email} onChange={handleChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={register.password} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="confirmPassword" value={register.confirmPassword} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default Register;