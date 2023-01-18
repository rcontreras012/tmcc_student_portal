import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { url } from '../Utils/url';

export const EnrollModal = (props) => {

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [address, setAdress] = useState('')
    const [email, setEmail] = useState('')
    const [lrn, setLRN] = useState('')
    const [contact, setContact] = useState('')
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)

    const addStudent = () => {
        axios.post(url + "addstudent", null, {
            params: {
                first_name: fname,
                last_name: lname,
                email: email,
                address: address,
                contact_no: contact,
                lrnnumbers: lrn
            }
        }).then(res => {
            
            props.onClose()
            
        }).catch(err => {


            if (err.response.status == 400) {
                setError(err.response.data.error)
                setShowError(true)
                

                setTimeout(() => {
                    setShowError(false)
                },2000)


            }


        })
    }


    return (
        <Modal show={props.show} onHide={props.onClose} >

            {
                showError && <Alert key={'danger'} variant={'danger'}>
                    {error}
                </Alert>
            }

            <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
            </Modal.Header>


            <Modal.Body>

                <div>
                    <Form.Label htmlFor="inputPassword5">First name</Form.Label>
                    <Form.Control

                        id="inputPassword5"
                        value={fname}
                        onChange={(v) => setFname(v.target.value)}
                        aria-describedby="passwordHelpBlock"
                    />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <Form.Label htmlFor="inputPassword5">Last name</Form.Label>
                    <Form.Control

                        id="inputPassword5"
                        value={lname}
                        onChange={(v) => setLname(v.target.value)}
                        aria-describedby="passwordHelpBlock"
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Form.Label htmlFor="inputPassword5">Address</Form.Label>
                    <Form.Control

                        id="inputPassword5"
                        value={address}
                        onChange={(v) => setAdress(v.target.value)}
                        aria-describedby="passwordHelpBlock"
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Form.Label htmlFor="inputPassword5">Email</Form.Label>
                    <Form.Control

                        id="inputPassword5"
                        value={email}
                        onChange={(v) => setEmail(v.target.value)}
                        aria-describedby="passwordHelpBlock"
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Form.Label htmlFor="inputPassword5">Contact</Form.Label>
                    <Form.Control

                        id="inputPassword5"
                        value={contact}
                        onChange={(v) => setContact(v.target.value)}
                        aria-describedby="passwordHelpBlock"
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Form.Label htmlFor="inputPassword5">LRN Number</Form.Label>
                    <Form.Control

                        id="inputPassword5"
                        value={lrn}
                        onChange={(v) => setLRN(v.target.value)}
                        aria-describedby="passwordHelpBlock"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Close
                </Button>
                <Button onClick={() => addStudent()} variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}