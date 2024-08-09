import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, json } from 'react-router-dom';
import courseContext from '../context/courses/courseContext';

const Register = (props) => {
    const context = useContext(courseContext);
    const { loginUser, getLoggedinUser} = context;

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('loginToken') && loginUser.role === "admin") { 
            getLoggedinUser();
        } else if(localStorage.getItem('loginToken') && loginUser.role === "student") {
            navigate("/");
        } else if (localStorage.getItem('loginToken') === "undefined") {
            navigate("/login");
        } else {
            navigate("/");
        }
        // eslint-disable-next-line
    }, [])
    
    const [registerDetails, setRegisterDetails] = useState({name: "", email: "", password: "", role: ""});
    const navig = useNavigate();

    const hangleCreateAccount = async (e) => {
        e.preventDefault();
        const {name, email, password, role} = registerDetails;
        //Calling create user API
        const fetchAddResponse = await fetch("http://localhost:5000/api/auth/registeruser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password, role})
        });
        //Response from API
        const resp = await fetchAddResponse.json();
        // console.log(resp);
        if(resp.success) {
            //if use is ok
            localStorage.setItem('loginToken', json.loginToken);
            props.showAlert("User created successfully!", "success");
            //redirect now
            navig("/login");
        } else {
            props.showAlert("Please enter valid credentials!", "danger");
            navig("/createAccount");
        }
    }
    //On change function to get values
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
                <div className="mb-3">
                    <input type="text" onChange={onChange} placeholder='Admin , Instructor or Student' className="form-control" name="role"/>
                </div>
            
                <button type="submit" className="btn btn-primary" onClick={hangleCreateAccount}>Create account</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
