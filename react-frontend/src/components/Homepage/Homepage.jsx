import React, { useState, useContext } from 'react'
import './homepage.scss';
import axios from 'axios';
import { AuthContext } from "../../App";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'  //'application/x-www-form-urlencoded';

function Homepage() {
  const context = useContext(AuthContext);
  const setUserWalletAddress = context[1];

  const handleFileSubmit = (e) => {
    e.preventDefault();
    const file = e.target.elements[0].files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios.post("/fileUpload", formData)
    .then((res) => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleStringSubmit = (e) => {
    e.preventDefault();
    const string = e.target.elements[0].value;
    axios.post("/stringUpload", { string })
    .then((res) => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleLogout = (e) => {
    localStorage.setItem("address", null);
    setUserWalletAddress(null);
    window.location.reload();
  }

  return (
    <div className='formsContainer'>
      <h1>HOMEPAGE</h1>
      <form onSubmit={handleFileSubmit}>
        <label>
          File Upload:
          <input type="file" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <br />
      <form onSubmit={handleStringSubmit}>
        <label>
          String Upload:
          <input type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={handleLogout}>ClearLocalStorage</button>
    </div>
  )
}

export default Homepage;
