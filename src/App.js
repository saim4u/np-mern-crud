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

function App() {
  return (
    <>
    <CourseState>
        <Router>
          <Navbar />
          <Alert message="Alert components is here"/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createAccount" element={<Register />} />
          </Routes>
        </Router>
    </CourseState>
    </>
  );
}

export default App;