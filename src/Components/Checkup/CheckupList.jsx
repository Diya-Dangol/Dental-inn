import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

function CheckupList() {
  const [checkup, setCheckup]=useState([]);

  const {pid} = useParams();

  useEffect(()=>{
    fetch(`http://localhost:3500/checkup?pid=${pid}`) 
    .then(res=> res.json())
    .then(data => setCheckup(data))
  },[])

  return (
    <>
      {checkup.map((val)=>{
        return(
          <div key={val.id} > 
            {val.name}
            {val.treatment}
            {val.price}
          </div>
        )
      })}
    </>
  )
}

export default CheckupList