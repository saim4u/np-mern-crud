import React, { useState } from "react";
import CourseContext from "./courseContext";

const CourseState = (props) => {
    const host = "http://localhost:5000";
    const initialCourse = [];
    const [courses, setCourses] = useState(initialCourse);

    //Fetch all courses
    const fetchAllCourses = async() => {
        // API Call
        const fetchAllCoursesResponse = await fetch(`${host}/api/courses/fetchallcourses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "login-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMGM4ZjRkNGZkYzkzZmVhNGQ0MDQyIn0sImlhdCI6MTcyMjg2NTgwOX0.03z7mkjH2ucKTZWe3VrF-ldHH-O5aaeEsceRlCB4MR4"
            }   
        });

        const resJson = await fetchAllCoursesResponse.json();
        setCourses(resJson)
    }
    // Add a new course to database
    const AddNewCourse = async(name, code) => {
         // API Call
         const fetchAddResponse = await fetch(`${host}/api/courses/addcourse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "login-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMGM4ZjRkNGZkYzkzZmVhNGQ0MDQyIn0sImlhdCI6MTcyMjg2NTgwOX0.03z7mkjH2ucKTZWe3VrF-ldHH-O5aaeEsceRlCB4MR4"
            },
            body: JSON.stringify({name, code})
        });

        const adCours = {
            "_id": "66b1cd66506ed87deb24b48e",
            "user": "66b0c8f4d4fdc93fea4d4042",
            "name": name,
            "code": code,
            "date": "2024-08-06T07:14:46.194Z",
            "__v": 0
          }
        setCourses(courses.concat(adCours));
        const jres = await fetchAddResponse.json();
        // console.log(jres);
    }

    // Edit the course
    const editCourseFunc = async(id, name, code) => {

        const fetchEditResponse = await fetch(`${host}/api/courses/updatecourse/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "login-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMGM4ZjRkNGZkYzkzZmVhNGQ0MDQyIn0sImlhdCI6MTcyMjg2NTgwOX0.03z7mkjH2ucKTZWe3VrF-ldHH-O5aaeEsceRlCB4MR4"
            },
            body: JSON.stringify({name, code})
        });

        const json = fetchEditResponse.json();
        console.log(json);

        //To udpate course, need new course state because of not directly updating
        const newCourses = JSON.parse(JSON.stringify(courses));

        for(let index=0; index < newCourses.length; index++) {
            const elem = newCourses[index];
            if(elem._id === id ) {
                newCourses[index].name = name;
                newCourses[index].code = code;
                break;
            }
        }
        setCourses(newCourses);
    }



    // Delete course API CALL
    const deleteCourse = async (id) => {
        // console.log(id);
        // API Call
        const delCoursesResponse = await fetch(`${host}/api/courses/deletecourse/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "login-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMGM4ZjRkNGZkYzkzZmVhNGQ0MDQyIn0sImlhdCI6MTcyMjg2NTgwOX0.03z7mkjH2ucKTZWe3VrF-ldHH-O5aaeEsceRlCB4MR4"
            }
        });

        const resp = delCoursesResponse.json();
        console.log(resp);

        const newCourses = courses.filter((adCours) => { return adCours._id !== id  })
        setCourses(newCourses);

    }

    return (
        <CourseContext.Provider value={{courses, AddNewCourse, fetchAllCourses, editCourseFunc,  deleteCourse}}>
            {props.children}
        </CourseContext.Provider>
    )
}

export default CourseState;