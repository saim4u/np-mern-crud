import React, { useState } from 'react';
import { useNavigate, json } from 'react-router-dom';


const Login = () => {
    
    const[loginDetails, setloginDetails] = useState({email: "", password: ""});
    //Redirect to other component
    const navigate = useNavigate();

    
    const hangleLogin = async (e) => {
        e.preventDefault();
        const fetchAddResponse = await fetch("http://localhost:5000/api/auth/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: loginDetails.email, password: loginDetails.password})
        });
        const resp = await fetchAddResponse.json();
        // console.log(resp);


        if(resp.success) {
            //Save token
            localStorage.setItem('loginToken', json.loginToken);
            //Now redirect using History hoor
            navigate("/");
        } else {
            alert("Enter valid details")
        }
    }

    const onChange = (e) => {
        setloginDetails({...loginDetails, [e.target.name]: e.target.value})
    }



  return (
    <div className='container my-3'>
        <div className="row">
            <div className="col-sm-6">

            
        <h1>Login</h1>
        <form>
        <div className="mb-3">
            <input type="email" placeholder='Email' onChange={onChange} value={loginDetails.email} className="form-control" name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <input type="password" onChange={onChange} value={loginDetails.password} placeholder='Password' className="form-control" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={hangleLogin}>Login</button>
        </form>
        </div>
        </div>
      
    </div>
  )
}

export default Login
