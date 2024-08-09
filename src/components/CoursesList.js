import React, { useContext, useEffect } from "react";
import courseContext from '../context/courses/courseContext';

function CoursesList(props) {

  useEffect(()=>{
    getLoggedinUser();
    // eslint-disable-next-line
  }, [])
  //get course from props by destructuring
  const { course, updateCourse} = props;
  const context = useContext(courseContext)
  const {loginUser, getLoggedinUser, deleteCourse} = context;
  return (
    <div className="col-sm-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{course.name}</h5>
          <p className="card-text">{course.code}</p>
          {loginUser.role === "student" ? "" : <i className="fa-solid fa-trash mx-2" onClick={ () => { deleteCourse(course._id); props.showAlert("Deleted successfully", "success") } }></i>}
          {loginUser.role === "student" ? "" : <i className="fa-solid fa-pencil mx-2" onClick={() => { updateCourse(course) }}></i> }
        </div>
      </div>
    </div>
  );
}

export default CoursesList;
