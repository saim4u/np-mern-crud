import CourseContext from "../context/courses/courseContext";
import React, { useContext, useEffect } from "react";
import CoursesList from "./CoursesList";
import AddCourse from "./AddCourse";

function Courses() {
    const context = useContext(CourseContext);
    const { courses , fetchAllCourses} = context;
    useEffect(()=>{
        fetchAllCourses();
    }, [])
  return (
    <div className="container my-5">
        <AddCourse />
        <h2>Your Courses</h2>
        <div className="row">
            {courses.map((cr) => {
              return <CoursesList key={cr._id} course={cr}/>
            })}
        </div>
      </div>
  )
}

export default Courses
