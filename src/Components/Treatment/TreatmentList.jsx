import {useState, useEffect} from 'react';
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
    },[])

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

        fetch(`${import.meta.env.VITE_BASE_URL}/treatment/${deleteid}`, requestOptions)
        .then(res=> res.json)
        .then(console.log(deleteid))
        .then(handleClose) 
        .then(notify)
        .then(setDeleteid())
    }

    
  return (
    <div>
        treatment
        {console.log(treatment)}
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
        {treatment.map((item)=>{
            const {id, name}=item;
            return(
                <div key={id}>
                    {name}
                    <button onClick={()=>{navigate(`/treatment/edit/${id}`)}}>Edit</button>
                    <button onClick={()=>{setDeleteid(id); handleShow()}}> Delete</button>
                </div>
            )
        })}
    </div>
  )
}

export default TreatmentList