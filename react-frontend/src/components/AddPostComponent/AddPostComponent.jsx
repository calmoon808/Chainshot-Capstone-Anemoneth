import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'; 
import './AddPostComponent.scss';
import axios from 'axios';

function AddPostComponent(props) {
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const postTitle = e.target.elements[0].value;
    const postBody = e.target.elements[1].value;
    if (!(postTitle)) {
        alert("Post needs a title!");
        return;
    }
    if (!(postBody)) {
        alert("Post needs a body!");
        return;
      }
    const formData = new FormData();
    formData.append("userAddress", props.userwalletaddress);
    formData.append("postTitle", postTitle);
    formData.append("postBody", postBody);
    if (e.target.elements[2].files.length) {
      const file = e.target.elements[2].files[0];
      formData.append("postFile", file);
    }
    axios.post("/postUpload", formData)
    .then(async (res) => {
      console.log(res.data);
      // delay to avoid searching for initial post folder
      await setTimeout(() => { window.location.reload(false); }, 1);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Modal 
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Make a Post
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
        <Form id="addPostForm" onSubmit={handlePostSubmit}>
          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Enter post title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postBody">
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" placeholder="Enter post body" />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload an image (optional)</Form.Label>
            <Form.Control type="file" size="sm" />
          </Form.Group>
        </Form>
        </Modal.Body>
      <Modal.Footer>
        <Button form="addPostForm" type="submit">Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddPostComponent