import {useState, useEffect} from 'react'

function AddTreatment() {
    const [treatment, setTreatment] = useState({
        id:"",
        name: ""
    })
    
  return (
    <div>
        Add Treatment form
    </div>
  )
}

export default AddTreatment