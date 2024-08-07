import React, { useContext } from "react";
import courseContext from "../context/courses/courseContext";

function CoursesList(props) {
  //get course from props by destructuring
  const { course, updateCourse} = props;
  const context = useContext(courseContext)
  const {deleteCourse} = context;
  return (
    <div className="col-sm-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{course.name}</h5>
          <p className="card-text">{course.code}</p>
          <i className="fa-solid fa-trash mx-2" onClick={ () => { deleteCourse(course._id) } }></i>
          <i className="fa-solid fa-pencil mx-2" onClick={() => { updateCourse(course) }}></i>
        </div>
      </div>
    </div>
  );
}

export default CoursesList;
