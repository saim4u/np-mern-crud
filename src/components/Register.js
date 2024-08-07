import React, { useState } from 'react'

const Register = () => {
    
    const [registerDetails, setRegisterDetails] = useState({name: "", email: "", password: "", confPass: ""});

    const hangleCreateAccount = async (e) => {
        e.preventDefault();
        const {name, email, password} = registerDetails;

        const fetchAddResponse = await fetch("http://localhost:5000/api/auth/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: registerDetails.name, email: registerDetails.email, password: registerDetails.password})
        });
        const resp = await fetchAddResponse.json();
        console.log(resp);
    }
    const onChange = (e) => {
        setRegisterDetails({...registerDetails, [e.target.name]: e.target.value})
    }
  return (
    <div className='container my-3'>
        <div className="row">
            <div className="col-sm-6">

            
        <h1>Create account</h1>
        <form>
        <div className="mb-3">
            <input type="text" placeholder='Name' onChange={onChange} className="form-control" name="name" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <input type="email" placeholder='Email' onChange={onChange}  className="form-control" name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <input type="password" onChange={onChange} placeholder='Password' className="form-control" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={hangleCreateAccount}>Create account</button>
        </form>
        </div>
        </div>
      
    </div>
  )
}

export default Register
