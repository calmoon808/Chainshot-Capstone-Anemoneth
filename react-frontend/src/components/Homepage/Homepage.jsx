import React, { useState, useContext, useEffect } from 'react'
import './homepage.scss';
import axios from 'axios';
import { AuthContext } from "../../App";
import PostList from "../PostList/PostList";
import Navbar from "../Navbar/Navbar";
import AddPostComponent from "../AddPostComponent/AddPostComponent";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'  //'application/x-www-form-urlencoded';

function Homepage() {
  const context = useContext(AuthContext);
  const [userWalletAddress, setUserWalletAddress] = context;
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await axios.get("/userPosts", { params: { userWalletAddress }});
      setUserPosts(response.data);
    }
    getUserPosts();
  }, [userWalletAddress])
  

  const handleLogout = (e) => {
    localStorage.setItem("address", null);
    setUserWalletAddress(null);
    window.location.reload();
  }

  return (
    <>
    <div className='formsContainer'>
      <Navbar />
      <button onClick={handleLogout}>ClearLocalStorage</button>
      {userPosts.length > 0 ? <PostList key={userPosts} userPosts={userPosts} /> : "" }
    </div>
    </>
  )
}

export default Homepage;
