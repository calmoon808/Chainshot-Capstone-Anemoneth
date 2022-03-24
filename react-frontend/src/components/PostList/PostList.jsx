import React, { useState } from 'react'
import axios from "axios";
import './PostList.scss';
import PostComponent from "../PostComponent/PostComponent";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'  //'application/x-www-form-urlencoded';

function PostList(props) {
  const [postList] = useState(props.userPosts);

  return (
    <ul className='postList'>
      {postList.map((post) => {
        return (
          <PostComponent key={post.postDataCid} post={post} />
        )
      })}
    </ul>
  )
}

export default PostList