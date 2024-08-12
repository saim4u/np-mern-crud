import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import CourseState from "./context/courses/CourseState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import LoggedinUser from "./components/LoggedinUser";
import Test from "./components/Test";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=> {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(()=>{
      setAlert(null);
    }, 2000);
  }
  return (
    <>
    <CourseState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/createAccount" element={<Register showAlert={showAlert} />} />
            <Route exact path="/loggedinUser" element={<LoggedinUser showAlert={showAlert} />} />
            <Route exact path="/test" element={<Test />}/>
            <Route exact path="/*" element={<div className="container my-5"><h3>Page not found!</h3></div> }/>
          </Routes>
        </Router>
    </CourseState>
    </>
  );
}

export default App;