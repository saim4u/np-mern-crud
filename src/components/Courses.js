import CourseContext from "../context/courses/courseContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import CoursesList from "./CoursesList";
import AddCourse from "./AddCourse";
import { useNavigate } from "react-router-dom";

function Courses(props) {
  const navigate = useNavigate();
  const context = useContext(CourseContext);
  const { courses, fetchAllCourses, editCourseFunc, fetchAllCoursesAdmin, loginUser } = context;

  useEffect(() => {
    const getToken = localStorage.getItem('loginToken');
    if( getToken ){
      fetchAllCoursesAdmin();
    } else if (loginUser.role === "instructor"){
      fetchAllCourses();
    }    else if (getToken === "undefined" ){
      navigate("/login");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refHide = useRef(null);
  const [course, setCourse] = useState({ id: "", ename: "", ecode: "" });

  const updateCourse = (currCourse) => {
    ref.current.click();
    setCourse({
      id: currCourse._id,
      ename: currCourse.name,
      ecode: currCourse.code,
    });
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    // console.log("Update button clicked", course);
    editCourseFunc(course.id, course.ename, course.ecode);
    refHide.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };


  return (
    <div className="container my-5">
     {loginUser.role === "student" ? <div></div> : <AddCourse showAlert={props.showAlert} />}

      {/* Modal to edit view */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Course
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    onChange={onChange}
                    value={course.ename}
                    className="form-control"
                    name="ename"
                    placeholder="Course Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    onChange={onChange}
                    value={course.ecode}
                    className="form-control"
                    placeholder="Course Code"
                    name="ecode"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refHide}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleUpdateClick}
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Courses</h2>
      <div className="container row">
        {courses.length === 0 && "No record found"}
        {courses.map((cr) => {
          return (
            <CoursesList
              updateCourse={updateCourse}
              key={cr._id}
              course={cr}
              loginUser={loginUser}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
