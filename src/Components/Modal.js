import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const EnrollModal = (props) => {

    return(
        <Modal show={props.show} >
            <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div>
                    <Form.Label htmlFor="inputPassword5">First name</Form.Label>
                    <Form.Control
                        
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                </div>
                <div style={{marginTop: "10px"}}>
                    <Form.Label htmlFor="inputPassword5">Last name</Form.Label>
                    <Form.Control
                        
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Form.Label htmlFor="inputPassword5">Address</Form.Label>
                    <Form.Control
                        
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Form.Label htmlFor="inputPassword5">Email</Form.Label>
                    <Form.Control
                        
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Form.Label htmlFor="inputPassword5">Last name</Form.Label>
                    <Form.Control
                        
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Form.Label htmlFor="inputPassword5">LRN Number</Form.Label>
                    <Form.Control
                        
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">
                    Close
                </Button>
                <Button variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}