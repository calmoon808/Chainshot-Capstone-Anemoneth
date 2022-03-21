import React, { useState, useEffect } from 'react'
import './AddPostComponent.scss';
import axios from 'axios';

function AddPostComponent(props) {
    const handleFileSubmit = async (e) => {
        e.preventDefault();
        if (!(e.target.elements.title.value)) {
            alert("Post needs a title!");
            return;
        }
        if (!(e.target.elements.body.value)) {
            alert("Post needs a body!");
            return;
        }
        const formData = new FormData();
        formData.append("userAddress", props.userWalletAddress);
        formData.append("postTitle", e.target.elements.title.value);
        formData.append("postBody", e.target.elements.body.value);
        if (e.target.elements[2].files.length) {
            const file = e.target.elements[2].files[0];
            formData.append("postFile", file);
        }
        axios.post("/postUpload", formData)
        .then((res) => {
            // props.setUserPosts(userPosts => [...userPosts, res.data]);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

  return (
    <div className='addPostComponent'>
      <form onSubmit={handleFileSubmit}>
        <label>
          Make a Post: <br />
          Title: <input name="title" type="text" /><br />
          Body: <input name="body" type="text" /><br />
          Upload a File: <input name="file" type="file" /><br />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default AddPostComponent