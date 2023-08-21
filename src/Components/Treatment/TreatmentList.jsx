import {useState, useEffect} from 'react';
import AddTreatment from './AddTreatment';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'; 
import Modal from 'react-bootstrap/Modal';
import {toast} from 'react-toastify';

function TreatmentList() {
    const [treatment, setTreatment] = useState([])
    const [show, setShow] = useState(false);
    const [deleteid, setDeleteid] = useState();
    const navigate= useNavigate();

    const handleClose=()=>{setShow(false)};
    const handleShow=()=> {setShow(true)};

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/treatment`)
        .then(res => res.json())
        .then(data => setTreatment(data))
    },[deleteid, treatment])

    const notify =()=> toast.success("Treatment Deleted Successfully", {
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

        fetch(`${import.meta.env.VITE_BASE_URL}/treatment/${deleteid}`, requestOptions)
        .then(console.log(deleteid))
        .then(handleClose) 
        .then(notify)
        .then(setDeleteid())
    }

    
  return (
    <div>
        <h2 className='ms-0'>Treatment</h2>
        <AddTreatment/>        
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
                    <th>SN</th>
                    <th>Treatment Names</th>
                </tr>
            </thead>
            <tbody>
                {treatment.map((item, index)=>{
                    const {id, name}=item;
                    return(
                        <tr key={id}>
                            <td>{index+1}</td>
                            <td>{name}</td>
                            <td>
                                <Button variant="primary" onClick={()=>{navigate(`/treatment/edit/${id}`)}}>Edit</Button>
                                <Button variant="danger" onClick={()=>{setDeleteid(id); handleShow()}}> Delete</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </div>
  )
}

export default TreatmentList