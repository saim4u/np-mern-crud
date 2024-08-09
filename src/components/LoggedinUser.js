import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import courseContext from '../context/courses/courseContext';

const LoggedinUser = (props) => {
    const context = useContext(courseContext);
    const { loginUser, getLoggedinUser} = context;
    
    const navigate =useNavigate();

    useEffect(() => {
        if(localStorage.getItem('loginToken')) {
          getLoggedinUser();
        } else if (localStorage.getItem('loginToken') === "undefined") {
            navigate("/login");
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

  return (
    <div className='container my-5'>
        <h2>Profile</h2>
      <p><strong>Name: </strong>{loginUser.name}</p>
      <p><strong>Email: </strong>{loginUser.email}</p>
      <p><strong>Role: </strong>{loginUser.role}</p>
    </div>
  )
}

export default LoggedinUser
