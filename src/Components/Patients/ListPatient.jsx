import {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function ListPatient(){
    const [patient, setPatient]=useState([]); 

    const url=`http://localhost:3500/patients`;

    useEffect(()=>{  
        console.log("hello from use Effect")      
        fetch(url)
        .then(response => response.json())
        .then(data=> setPatient(data))
    },[])

    return(
        <>
            <Alert variant="primary">
                Patient list
            </Alert>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>S.N.</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Contact No.</th>
                    </tr>
                </thead>
                <tbody>
                    {patient.map((item, index)=>{
                        console.log({item});
                        const {id, name, address, age, gender, contact_no}=item;
                        return(
                            <tr key={id}> 
                                <td>{index+1}</td>                                   
                                <td>{name}</td>
                                <td>{address}</td>
                                <td>{age}</td>
                                <td>{gender}</td>
                                <td>{contact_no}</td>
                                <td>
                                    <Button className="m-1" variant="success">Edit</Button>
                                <Button variant="danger">Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
         
        </>
    )
}

export default ListPatient;