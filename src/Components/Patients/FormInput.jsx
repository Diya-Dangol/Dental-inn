// import {useState} from 'react';

const FormInput=(props)=>{
    const {errorMessage, handleChange, ...inputProps} = props;

    return(
        <div className="formInput">
            <input 
                {...inputProps}
                onChange={handleChange}
             />
             <span>{errorMessage}</span>
        </div>
    )
}


export default FormInput;