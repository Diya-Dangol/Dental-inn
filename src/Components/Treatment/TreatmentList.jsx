import {useState, useEffect} from 'react'

function TreatmentList() {
    const [treatment, setTreatment] = useState({
        id:"",
        name: ""
    })

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/treatment`)
        .then(res => res.json())
        .then(data => setTreatment(data))
    })
    
  return (
    <div>
        treatment
        {treatment.map((val)=>{
            console.log(val);
            // const {id, name}=val;
            // return(
            //     <div key={id}>
            //         {name}
            //     </div>
            // )
        })}
    </div>
  )
}

export default TreatmentList