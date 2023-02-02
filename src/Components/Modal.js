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
    const [success, setShowSuccess] = useState(false)

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

            setShowSuccess(true)
            setTimeout(() => {
                setFname('')
                setLname('')
                setShowSuccess(false)
                setAdress('')
                setEmail('')
                setLRN('')
                setContact('')
                props.onClose()

            }, 2000)

        }).catch(err => {


            if (err.response.status == 400) {
                setError(err.response.data.error)
                setShowError(true)


                setTimeout(() => {
                    setShowError(false)
                }, 2000)


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

            {
                success && <Alert key={'danger'} variant={'success'}>
                    Successfully adding new student to the database
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


export const AddTeacherModal = (props) => {

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [address, setAdress] = useState('')
    const [email, setEmail] = useState('')
    const [lrn, setLRN] = useState('')
    const [contact, setContact] = useState('')
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)
    const [success, setShowSuccess] = useState(false)

    const addStudent = () => {
        axios.post(url + "addTeacher", null, {
            params: {
                first_name: fname,
                last_name: lname,
                email: email,
                address: address,
                contact_no: contact,
                teachernum: lrn
            }
        }).then(res => {

            setShowSuccess(true)
            setTimeout(() => {
                setFname('')
                setLname('')
                setShowSuccess(false)
                setAdress('')
                setEmail('')
                setLRN('')
                setContact('')
                props.onClose()

            }, 2000)

        }).catch(err => {


            if (err.response.status == 400) {
                setError(err.response.data.error)
                setShowError(true)


                setTimeout(() => {
                    setShowError(false)
                }, 2000)


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

            {
                success && <Alert key={'danger'} variant={'success'}>
                    Successfully adding new student to the database
                </Alert>
            }

            <Modal.Header closeButton>
                <Modal.Title>Add Teacher</Modal.Title>
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
                    <Form.Label htmlFor="inputPassword5">Teacher ID Number</Form.Label>
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

export const ForgotModal = (props) => {

    const [code, setCode] = useState('')
    const [inputText, setInputText] = useState('')
    const [success, setSuccess] = useState({
        type: "success",
        message: 'Successfully changing password you may now process login in.',
        show: false
    })
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [errorConfirm, setErrorConfirm] = useState('')



    const requestCode = () => {

        axios.post(url + 'forgetpass', '', {
            params: {
                email: inputText
            }
        }).then(res => {
            
            if (res.data.failed) {
                setSuccess({
                    type: "danger",
                    message: "Try again, Please check your email.",
                    show: true
                })
            }
            else if (!res.data.failed) {
                setSuccess({
                    type: "danger",
                    message: "Try again, Please check your email.",
                    show: false
                })
                setCode(true)
                setInputText('')
                // setSuccess({
                //     type: "success",
                //     message: "Successfully changing password you may now process login in.",
                //     show: true
                // })
            }
        })
            .catch(err => {
                
            })
    }

    const changePass = () => {


        if (newPass != confirmPass) {
            setErrorConfirm(true)
        }
        else {
            axios.post(url + 'changepass', '', {
                params: {
                    code: inputText,
                    newpassword: newPass
                }
            }).then(res => {
                
                if (res.data.failed) {
                    setSuccess({
                        type: "danger",
                        message: "Something went wrong",
                        show: true
                    })
                }
                else if (!res.data.failed) {
                    setSuccess({
                        type: "success",
                        message: "Successfully changing password you may now process login in.",
                        show: false
                    })
                    setCode('')
                    setInputText('')
                    setNewPass('')
                    setConfirmPass('')
                    
                    props.success()
                }
            })
                .catch(err => {
                    
                })
        }

    }

    return (
        <Modal show={props.show} onHide={props.onClose} >

            {
                success.show && <Alert key={"success"} variant={success.type}>
                    {success.message}
                </Alert>

            }

            <Modal.Header closeButton>
                <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>


            <Modal.Body>

                <div>
                    <Form.Label htmlFor="inputPassword5">{code == "" ? "Email address" : "Enter recovery code"}</Form.Label>
                    <Form.Control

                        value={inputText}
                        onChange={(v) => setInputText(v.target.value)}

                    />
                </div>

                {
                    code != "" &&

                    <div>
                        <div style={{ marginTop: "20px" }}>
                            <Form.Label htmlFor="inputPassword5">New password</Form.Label>
                            <Form.Control

                                value={newPass}
                                type="password"
                                onChange={(v) => setNewPass(v.target.value)}

                            />
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <Form.Label htmlFor="inputPassword5">Confirm new password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPass}
                                onChange={(v) => {
                                    setConfirmPass(v.target.value)
                                    if (v.target.value == newPass) {
                                        setErrorConfirm(false)

                                    }
                                    else {
                                        setErrorConfirm(true)
                                    }

                                }}

                            />
                            {
                                errorConfirm &&
                                <div style={{ color: "red", fontSize: "13px" }}>
                                    Password does not match
                                </div>
                            }
                        </div>
                    </div>
                }

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Close
                </Button>
                {
                    code == "" ? <Button onClick={() => { requestCode() }} variant="primary">
                        Send code
                    </Button> :

                        <Button onClick={() => { changePass() }} variant="primary">
                            Change password
                        </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}