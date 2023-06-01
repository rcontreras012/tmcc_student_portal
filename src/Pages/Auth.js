import React, { useEffect, useState } from 'react'
import '../Utils/css/Auth.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { url } from '../Utils/url';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../redux/actionType';
import { ForgotModal } from '../Components/Modal';

export const AuthPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showForgot, setForgot] = useState(false)


    const logMe = () => {


        axios.post(url + 'login', null, {
            params: {
                email,
                password
            }
        }).then(res => {
            // console.log(res.data.user[0], '--> check')
            console.log(res,"--> inanf s")
            if (res.data.failed) {
                alert("Credentials not fouund, please try again.")
            } else {

                dispatch({
                    type: LOGIN,
                    data: res.data.user[0]
                })


                if (res.data.role == 0) {
                    navigate('/admin', {
                        replace: true
                    })
                }
                else if (res.data.role == 1) {
                    navigate('/teacher', {
                        replace: true
                    })
                }
                if (res.data.role == 2) {
                    navigate('/student', {
                        replace: true
                    })
                }
            }

        }).catch(err => {
            console.log(err)
        })


    }

    console.log(showForgot)
    return (


        <div class="w3-light-grey center">

            <ForgotModal
                onClose={() => setForgot(false)}
                show={showForgot}
                success={() => {
                    console.log('not called?')
                    setForgot(false)
                }}
            />


            <div className='appname'>
                <img style={{ height: "150px", width: "150px"
                           }} src={require("../Utils/img/TMCNHS LOGO.png")}>
                Trece Martires National Highschool
            </div>



            <div className='cardContainer'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} type="email" placeholder="Enter email" onChange={(v) => {

                        setEmail(v.target.value)
                    }} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label >Password</Form.Label>
                    <Form.Control value={password} onChange={(v) => {

                        setPassword(v.target.value)
                    }} type="password" placeholder="Password" />
                </Form.Group>

                <div className='forgot w3-margin-bottom' onClick={() => setForgot(true)}>
                    Forgot password?
                </div>

                <Button className='loginButton w3-teal' onClick={() => logMe()} variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </div>
    )

}
