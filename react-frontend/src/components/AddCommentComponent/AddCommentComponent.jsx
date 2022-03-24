import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'; 
import './AddCommentComponent.scss';
import axios from "axios";

function AddCommentComponent(props) {
    const [commentBody, setCommentBody] = useState("");

    const handleCommentSubmit = (e) => {
        const userWalletAddress = props.userwalletaddress;
        const postDataCid = props.postdatacid;
        const postOwner = props.postowner;
        axios.post("/postComment", { userWalletAddress, postOwner, postDataCid, commentBody })
        .then((res) => {
          console.log(res);
        })
    }

    const handleCommentChange = async (e) => {
        await setCommentBody(e.target.value);
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
                    Post a Comment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addCommentForm">
                    <Form.Group className="mb-3" controlId="postComment">
                        <Form.Label>Add Comment</Form.Label>
                        <Form.Control onChange={handleCommentChange} as="textarea" placeholder="Enter Comment" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCommentSubmit} form="addCommentForm" type="submit">Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddCommentComponent