import React from 'react'

function Signup() {
  return (
    <div className="container my-3">
        <h1>Register new user</h1>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    
  )
}

export default Signup
