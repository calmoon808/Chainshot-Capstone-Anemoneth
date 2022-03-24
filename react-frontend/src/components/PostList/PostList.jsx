import React, { useState, useContext } from 'react'
import { AuthContext } from '../../App';
import {Button} from 'react-bootstrap';
import axios from "axios";
import './PostList.scss';
import PostVoteComponent from "../PostVoteComponent/PostVoteComponent";
import AddCommentComponent from "../AddCommentComponent/AddCommentComponent";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'  //'application/x-www-form-urlencoded';

function PostList(props) {
  const context = useContext(AuthContext);
  const [userWalletAddress] = context;
  const [postList] = useState(props.userPosts);
  const [addCommentModalShow, setCommentModalShow] = useState(false);
  const [currPostData, setCurrPostData] = useState({});

  const handleButtonClick = async (post) => {
    await setCurrPostData(post);
  }

  return (
    <ul className='postList'>
      {postList.map((post) => {
        const fileUrl = `https://ipfs.io/ipfs/${post.fileCid}`;
        return (

          <li key={postList.indexOf(post)} className="postContainer">
            <PostVoteComponent />
            <div className="post">
              <div className="postTitle">{post.postTitle}</div>
              <div className="postOwner">Posted by: {post.username ? post.username : post.postOwner}</div>
              {post.fileCid ? <img src={fileUrl} alt="" /> : ""}
              <div className="postBody">{post.postBody}</div>
              <ul className='commentList'>
                {post.comments.map((comment) => {
                  return (
                    <li key={comment.commentId} className="comment">
                      <div className="commentInfoContainer">
                        from: <div className="commentOwner"> {comment.username ? comment.username : comment.commentOwner} </div>
                      </div>
                      <div className="commentInfoContainer">
                        <div className="commentBody"> {comment.commentBody}</div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <Button className="buttons" variant="primary" onClick={async () => {
                setCommentModalShow(true);
                await handleButtonClick(post);
                }}>
                Add a Comment
              </Button>
            </div>
          </li>
        )
      })}
      <AddCommentComponent 
        userwalletaddress={userWalletAddress}
        postdata={currPostData}
        show={addCommentModalShow}
        onHide={() => setCommentModalShow(false)}
      />
    </ul>
  )
}

export default PostList