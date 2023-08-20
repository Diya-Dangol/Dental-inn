import {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {toast} from 'react-toastify';

function CheckupList() {
  const [checkup, setCheckup]=useState([]);
  const [show, setShow] = useState(false);
  const [deleteid, setDeleteid] = useState();

  const {pid} = useParams();
  const navigate = useNavigate();

  const handleClose=()=>{setShow(false)};
  const handleShow=()=> {setShow(true)};


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
    
  
  useEffect(()=>{
    fetch(`http://localhost:3500/checkup?pid=${pid}`) 
    .then(res=> res.json())
    .then(data => setCheckup(data))
  },[deleteid])

  const handleDelete=()=>{
    const requestOptions={
      method:"DELETE"
    }
    
    fetch(`${import.meta.env.VITE_BASE_URL}/checkup/${deleteid}`, requestOptions)
    .then(res=>res.json())
    .then(handleClose) 
    .then(notify)
    .then(setDeleteid())
  }
  return (
    <>
      <h2>History of Patient no. {`${pid}`}</h2>
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
      <button onClick={()=>navigate(`/checkup/${pid}/add`, {replace: true})}>ADD</button>
      <div>
        <Table striped bordered hover responsive>
          <thead >
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
              {checkup.map((val, index)=>{
                const {id, name, treatment,price}=val;
                return(
                  <tr key={id} > 
                    <td>{index+1}</td>
                    <td>{name}</td>
                    <td>{treatment}</td>
                    <td>{price}</td>
                    <td>
                      <Button variant="primary" onClick={()=>navigate(`/checkup/${pid}/edit/${id}`)}>EDIT</Button>
                      <Button variant="danger" onClick={()=>{setDeleteid(id); handleShow();}}>DELETE</Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default CheckupList