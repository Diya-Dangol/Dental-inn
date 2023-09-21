import {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


const Login =()=>{
    const [userlogin, setUserlogin] = useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        const name= e.target.name;
        const value= e.target.value;
        setUserlogin({...userlogin, [name]: value})
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        // if(userlogin.email && userlogin.email && userlogin.password=== userlogin.confirmPassword){
            console.log(userlogin);
        // }
        const requestOptions ={
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userlogin)
        }
        fetch(`${import.meta.env.VITE_BASE_URL}/login`, requestOptions)
        .then(res=> res.json())
        // .then(data=>console.log(data))
    }
    return(
        <div className="form">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your email </Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" name="email" value={userlogin.email} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your Password" name="password" value={userlogin.password} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    login
                </Button>
            </Form>
            <Button variant="secondary">
                <Link to="/register" variant="secondary">
                    Register
                </Link>
            </Button>
        </div>
    )
}

export default Login;