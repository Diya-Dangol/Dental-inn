import {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login =()=>{
    const [login, setLogin] = useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        const name= e.target.name;
        const value= e.target.value;
        setLogin({...login, [name]: value})
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        // if(login.email && login.email && login.password=== login.confirmPassword){
            console.log(login);
        // }
        const requestOptions ={
            method: "POST",
            headers: {"Authorization": "secret_token"},
            body: JSON.stringify(login)
        }
        // aba run hunxa?
        fetch(`${import.meta.env.VITE_BASE_URL}/login`, requestOptions)
        .then(res=> res.json())
        .then(data=>console.log(data))
    }
    return(
        <div>
            <Form className="form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your email </Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" name="email" value={login.email} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your Password" name="password" value={login.password} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    login
                </Button>
            </Form>
        </div>
    )
}

export default Login;