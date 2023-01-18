import React, { useEffect, useState } from 'react'
import '../Utils/css/Auth.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { url } from '../Utils/url';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../redux/actionType';

export const AuthPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('Admin.Admin@tmcc.admin.com')
    const [password, setPassword] = useState('ZWBp)D!aty^Ga')



    const logMe = () => {


        axios.post(url + 'login', null, {
            params: {
                email,
                password
            }
        }).then(res => {
            console.log(res.data.user[0], '--> check')

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
                if (res.data.role == 3) {
                    navigate('/student', {
                        replace: true
                    })
                }
            }

        }).catch(err => {

        })


    }

    return (


        <div class="w3-light-grey center">


            <div className='appname'>
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

                <Button onClick={() => logMe()} variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </div>
    )

}