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
        <form>
          <div className="mb-3">
            <input
              type="text" onChange={onChange}
              className="form-control"
              name="name"
              placeholder="Course Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="text" onChange={onChange}
              className="form-control"
              placeholder="Course Code"
              name="code"
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleAddClick}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCourse;
