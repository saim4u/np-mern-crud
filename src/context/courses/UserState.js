// import React, { useState } from "react";
// import UserContext from "./userContext";

// const UserState = (props) => {
//   const host = "http://localhost:5000";
//   const initialCourse = [];
//   const [users, setUsers] = useState(initialCourse);

//   // Fetch Loggedin User Detail
//   const getLoggedinUser = async () => {
//     // API Call
//     const response = await fetch(`${host}/api/auth/getloginuser`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "login-token": localStorage.getItem("loginToken"),
//       },
//     });
//     const resJson = await response.json();
//     console.log(resJson);
//     setUsers(resJson);
//   }

//   return (
//     <UserContext.Provider value={{ getLoggedinUser, users }}>
//       {props.children}
//     </UserContext.Provider>
//   );
// };

// export default UserState;
