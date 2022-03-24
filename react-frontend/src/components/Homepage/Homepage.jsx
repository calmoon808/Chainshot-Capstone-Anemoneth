import React, { useState, useContext, useEffect } from 'react'
import './Homepage.scss';
import axios from 'axios';
import { AuthContext } from "../../App";
import PostList from "../PostList/PostList";
import Navbar from "../Navbar/Navbar";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'  //'application/x-www-form-urlencoded';

function Homepage() {
  const context = useContext(AuthContext);
  const [userWalletAddress, setUserWalletAddress] = context;
  const [feedPosts, setFeedPosts] = useState([]);

  useEffect(() => {
    const getFeedPosts = async () => {
      const response = await axios.get("/feedPosts");
      setFeedPosts(response.data);
    }
    getFeedPosts();
  }, [userWalletAddress, setUserWalletAddress])

  return (
    <div className='homePage'>
      <Navbar />
      {feedPosts.length > 0 ? <PostList key={feedPosts} userPosts={feedPosts} /> : "" }
    </div>
  )
}

export default Homepage;
