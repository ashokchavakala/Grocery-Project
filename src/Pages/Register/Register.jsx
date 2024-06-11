

import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

import styles from './register.module.css';


function Register() {

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  }

  const handleSignup = (event) => {
    event.preventDefault();
    console.log(userDetails);
    axios.post("http://localhost:5000/api/users/register", userDetails).then((response) => {
      console.log(response);
      toast("Register Sucessfully, Please Login...!");
      setUserDetails({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      })
      navigate('./login');
    }).catch(err => {
      console.log();
    })

  }

  return (
    <>
      <div className={styles.bg_color}>
        <div><h2 className={styles.logo1}>Grocery</h2><h2 className={styles.logo2}> Mart</h2></div>
        <div className="container">
          <div className="row justify-content-center mt-2">
            <div className="col-lg-6">
              <div className="card shadow">
                <div className="card-header w-100 text-center"><h2>Sign Up</h2></div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input type="text" className="form-control" id="firstName" required
                        name="firstName"
                        value={userDetails.firstName}
                        onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input type="text" className="form-control" id="lastName" required
                        name="lastName"
                        value={userDetails.lastName}
                        onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" required
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" required
                        name="password"
                        value={userDetails.password}
                        onChange={handleInputChange} />
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary" onClick={handleSignup}
                        disabled={!userDetails.firstName || !userDetails.lastName || !userDetails.email || !userDetails.password}>Sign Up</button>
                    </div>
                    <p><Link to={'/login'} className={styles.alreadyAcc}>Already have an account?</Link></p>
                  </form>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
