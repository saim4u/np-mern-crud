import CourseContext from "../context/courses/courseContext";
import React, { useContext, useState } from "react";

function AddCourse(props) {
    const context = useContext(CourseContext);
    const { AddNewCourse} = context;

    const [course, setCourse] = useState({name: "", code: ""});

    const handleAddClick = (e) => {
        e.preventDefault();
        AddNewCourse(course.name, course.code);
        setCourse({name: "", code: ""});
        props.showAlert("Record added successfully", "success")
    }

    const onChange = (e) => {
        setCourse({...course, [e.target.name]: e.target.value})
    }

  return (
    <>
      <div className="container my-3">
        <h1>Add Course</h1>
        <form onSubmit={handleAddClick}>
          <div className="mb-3">
            <input type="text" onChange={onChange} className="form-control" name="name" placeholder="Course Name" required minLength={3}/>
          </div>
          <div className="mb-3">
            <input type="text" onChange={onChange} className="form-control" placeholder="Course Code" name="code" required minLength={3}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
}

export default AddCourse;
