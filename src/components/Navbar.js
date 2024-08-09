import React, { useContext } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import courseContext from '../context/courses/courseContext';

function Navbar(props) {
  const context = useContext(courseContext);
  const { loginUser} = context;
  const navigate = useNavigate();

  const handleLogout = () => {
    if(localStorage.getItem('loginToken')) {
      localStorage.removeItem('loginToken');
      props.showAlert("Logout successful", "success");
      navigate("/login");
    }

  }
  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Courses</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/about" aria-disabled="true">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>
      </ul>
        {loginUser.role === "student" ? <Link></Link> : <Link className=' btn btn-outline-primary mx-3' to="/createAccount">Create User</Link> }
        {localStorage.getItem('loginToken') ? <Link className='btn btn-outline-primary mx-3' to="/loggedinUser">Profile</Link> : <div></div>}
      { !localStorage.getItem('loginToken') ? <form className="d-flex" role="search">
        <Link className="btn btn-primary mx-3" to="/login">Login</Link> 
      </form>  
      : <button className="btn btn-outline-primary mx-3" onClick={handleLogout}>Logout</button>
      }
    </div>
  </div>
</nav>
  )
}

export default Navbar
