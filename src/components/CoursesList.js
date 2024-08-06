import React from "react";

function CoursesList(props) {
  const { course } = props;
  return (
    <div className="col-sm-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{course.name}</h5>
          <p className="card-text">{course.code}</p>
          <i className="fa-solid fa-trash mx-2"></i>
          <i className="fa-solid fa-pencil mx-2"></i>
        </div>
      </div>
    </div>
  );
}

export default CoursesList;
