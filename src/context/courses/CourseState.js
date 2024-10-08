import React, { useState } from "react";
import CourseContext from "./courseContext";

const CourseState = (props) => {
  const host = "http://localhost:4000";
  const [courses, setCourses] = useState([]);
  const [loginUser, setLoginUser] = useState([]);

    // Fetch Loggedin User Detail
    const getLoggedinUser = async () => {
        // API Call
        const response = await fetch(`${host}/api/auth/getloginuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "login-token": localStorage.getItem("loginToken"),
          },
        });
        const resJson = await response.json();
        setLoginUser(resJson);
      };

  //Fetch all courses
  const fetchAllCourses = async () => {
    //API
    const fetchAllCoursesResponse = await fetch(`${host}/api/courses/fetchallcourses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "login-token": localStorage.getItem("loginToken"),
        },
      });
      const resJson = await fetchAllCoursesResponse.json();
    setCourses(resJson);
  };
    //Fetch all courses
    const fetchAllCoursesAdmin = async () => {
        //API
        const fetchAllCoursesResponse = await fetch(`${host}/api/courses/fetchallcoursesadmin`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
          const NewresJson = await fetchAllCoursesResponse.json();
          // console.log(NewresJson);
        setCourses(NewresJson);
        
      }
  // Add a new course to database
  const AddNewCourse = async (name, code) => {
    // API Call
    const fetchAddResponse = await fetch(`${host}/api/courses/addcourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "login-token": localStorage.getItem("loginToken"),
      },
      body: JSON.stringify({ name, code }),
    });
    const addCourseRes = await fetchAddResponse.json();
    setCourses(courses.concat(addCourseRes));
  };
  // Edit the course
  const editCourseFunc = async (id, name, code) => {
    const fetchEditResponse = await fetch(`${host}/api/courses/updatecourse/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "login-token": localStorage.getItem("loginToken"),
        },
        body: JSON.stringify({ name, code }),
      }
    );
    const json = fetchEditResponse.json();
    console.log(json);

    //To udpate course, need new course state because of not directly updating
    const newCourses = JSON.parse(JSON.stringify(courses));

    for (let index = 0; index < newCourses.length; index++) {
      const elem = newCourses[index];
      if (elem._id === id) {
        newCourses[index].name = name;
        newCourses[index].code = code;
        break;
      }
    }
    setCourses(newCourses);
  };
  // Delete course API CALL
  const deleteCourse = async (id) => {
    // console.log(id);
    // API Call
    const delCoursesResponse = await fetch(`${host}/api/courses/deletecourse/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "login-token": localStorage.getItem("loginToken"),
        },
      }
    );

    const resp = delCoursesResponse.json();
    console.log(resp);

    const newCourses = courses.filter((adCours) => {
      return adCours._id !== id;
    });
    setCourses(newCourses);
  };

  return (
    <CourseContext.Provider
      value={{courses, loginUser, AddNewCourse, fetchAllCourses, editCourseFunc, deleteCourse, getLoggedinUser,
        fetchAllCoursesAdmin }}
    >
      {props.children}
    </CourseContext.Provider>
  );

};

export default CourseState;
