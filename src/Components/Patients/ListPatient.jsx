import {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link, useNavigate} from 'react-router-dom'; 
import {toast} from'react-toastify';

function ListPatient(){
    const [patient, setPatient]=useState([]); 
    const [show, setShow] = useState(false);
    const [deleteid, setDeleteid] = useState();
    const navigate= useNavigate();

    const handleClose=()=>{setShow(false)};
    const handleShow=()=> {setShow(true)};

    const url=`http://localhost:3500/patients`;

    useEffect(()=>{  
        fetch(url)
        .then(response => response.json())
        .then(data=> setPatient(data))
    },[deleteid]);

    const notify =()=> toast.success("Patient Deleted Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
        
    const handleDelete=()=>{
        
        const requestOptions={
            method : "DELETE"
        };

        fetch(`http://localhost:3500/patients/${deleteid}`, requestOptions)
        .then(res=> res.json)
        .then(console.log(deleteid))
        .then(handleClose) 
        .then(notify)
        .then(setDeleteid())
    }


    return(
        <>
            {/* <Alert variant="primary">
                Patient list
            </Alert> */}
            <div className='text-start m-4'>
                {/* <Link to="/patient/addpatient"> */}
                    <Button variant="secondary"
                    onClick={()=>{navigate('/patient/addpatient', {replace:true})}}
                    >Add Patient</Button>
                {/* </Link> */}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete patient?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>No</Button>
                </Modal.Footer>
            </Modal>
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
                                    <Link to={`/EditPatient/${id}`} >
                                        <Button className="m-1" variant="success">
                                            Edit
                                        </Button>
                                    </Link>
                                <Button variant="danger" onClick={()=>{handleShow(); setDeleteid(id)}}>
                                    Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            {/* <Outlet /> */}
         
        </>
    )
}

export default ListPatient;