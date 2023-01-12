import React, {useEffect, useState} from 'react'
import '../Utils/css/Auth.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { url } from '../Utils/url';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('renz.castaloni@tmcc.student.com')
    const [password, setPassword] = useState('vKMK)Qhd2y^HN')


    
    const logMe = () => {

        
        axios.post(url +'login',null,{
            params:{
                email,
                password
            }
        }).then(res => {
            console.log(res, '--> check')

            if(res.data.failed){
                alert("Credentials not fouund, please try again.")
            }else{
                navigate('/student', {
                    replace: true
                })
            }

        }).catch(err => {
            
        })


    }

    return(

        
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