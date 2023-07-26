import {useState, useEffect} from 'react';

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
         {patient.map((item)=>{
            console.log({item});
            const {id, name, address, age, gender, contact_no}=item;
            return(
                <div key={id}>
                    <h1>Name: {name}</h1>
                    <h2>Address: {address}</h2>
                    <h2>Age: {age}</h2>
                    <h2>Gender: {gender}</h2>
                    <h2>Contact no: {contact_no}</h2>
                </div>
            )
         })}
        </>
    )
}

export default ListPatient;