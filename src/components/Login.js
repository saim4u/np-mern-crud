import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const[loginDetails, setloginDetails] = useState({email: "", password: ""});
    //Redirect to other component
    const navigate = useNavigate();

    const hangleLogin = async (e) => {
        e.preventDefault();
        const fetchAddResponse = await fetch("http://localhost:4000/api/auth/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: loginDetails.email, password: loginDetails.password})
        });
        const loginJson = await fetchAddResponse.json();
        // console.log(loginJson.success);
        if(loginJson.success) {
            //Save token
            localStorage.setItem('loginToken', loginJson.loginToken);
            //Now redirect using History hoor
            props.showAlert("Login successfully", "success");
            navigate("/");
            // console.log(loginJson);
        } else {
            props.showAlert("Enter valid login details", "warning")
        }
    }
    //onChange
    const onChange = (e) => {
        setloginDetails({...loginDetails, [e.target.name]: e.target.value})
    }

  return (
    <div className='container my-3'>
        <div className="row">
            <div className="col-sm-6">
                <h1>Login</h1>
                <form onSubmit={hangleLogin}>
                <div className="mb-3">
                    <input type="email" placeholder='Email' minLength={6} onChange={onChange} value={loginDetails.email} className="form-control" name="email" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <input type="password" minLength={6} onChange={onChange} value={loginDetails.password} placeholder='Password' className="form-control" name="password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>

               
            </div>
        </div>
    </div>
  )
}

export default Login
