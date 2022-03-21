import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../App';
import axios from "axios";
import './PostList.scss';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'  //'application/x-www-form-urlencoded';

function PostList(props) {
  const context = useContext(AuthContext);
  const [userWalletAddress] = context;
  const [postList, setPostList] = useState(props.userPosts);

  const postComment = (e, userWalletAddress, postDataCid) => {
    const commentText = e.target.elements[0].value
    axios.post("/postComment", { userWalletAddress, postDataCid, commentText })
    .then((res) => {
      console.log(res);
    })
  }

  return (
    <ul className='postList'>
      {postList.map((post) => {
        const fileUrl = `https://ipfs.io/ipfs/${post.fileCid}`;
        return (
          <li key={postList.indexOf(post)} className="post">
            <h3>{post.postTitle}</h3>
            <p>Owner: {post.postOwner}</p>
            {post.fileCid ? <img src={fileUrl} alt="" /> : ""}
            <p>{post.postBody}</p>
            <a href={fileUrl}>IPFS link</a><br />

            <ul className='commentList'>
              {post.comments.map((comment) => {
                console.log(comment);
                return (
                  <li key={comment.commentId} className="comment">
                    Comment from: {comment.commentOwner}<br/>
                    Body: {comment.commentBody}
                  </li>
                )
              })}
            </ul>
            <form onSubmit={(e) => postComment(e, userWalletAddress, post.postDataCid)}>
              <input type="text"></input>
              <input type="submit" value="Post Comment"></input>
            </form>
          </li>
        )
      })}
    </ul>
  )
}

export default PostList