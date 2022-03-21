import React, { useState, useEffect } from 'react'
import './PostList.scss';
const { create } = require('ipfs-http-client');
const ipfs = create('/ip4/127.0.0.1/tcp/5001');

function PostList(props) {
  const [postList, setPostList] = useState(props.userPosts);
  // const [preloadedPosts, setPreloadedPosts] = useState([]);

  useEffect(() => {
    // console.log(props);
    // const recentPost = postList[postList.length - 1];
    // const postName = Object.keys(recentPost)[0];
    // const cid = recentPost[postName][0];
  }, [props])

  const postComment = () => {
    return (<div>idk</div>)
  }

  const mapPosts = () => {
    postList.map(async post => {
      console.log(post);
      const fileUrl = `https://ipfs.io/ipfs/${post.postCid}`;
      const postData = await ipfs.get(`https://ipfs.io/ipfs/${post.postDataCid}`);
      console.log(postData);
      return (
        <h1>IDK</h1>
      )
    })
  }

  return (
    <div className='postList'>
      <ul>
        {postList.map((post) => {
          const fileUrl = `https://ipfs.io/ipfs/${post.postCid}`;
          return (
            <li key={postList.indexOf(post)} className="posts">
              <img src={fileUrl} alt="" />
              <p>Owner: {post.owner}</p>
              <p>link: {fileUrl}</p>
              <button onClick={postComment}>Post Comment</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PostList