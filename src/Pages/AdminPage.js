import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from 'react-redux';
import '../App.css';
import { EnrollModal } from '../Components/Modal';
import Button from 'react-bootstrap/Button';
import '../Utils/css/Adminpage.css'
//let slideIndex = 1;

export const AdminPage = (props) => {

    const user = useSelector(state => state.user.user)

    const [showCreate, setShowCreate] = useState(false)

    
    return (

        <div className="w3-light-grey">
            <EnrollModal 
            onClose={() => setShowCreate(false)}
            show={showCreate}/>
            {/* <!-- Navbar (sit on top) --> */}
            <div className="w3-top">
                <div className="w3-bar w3-white w3-padding w3-card" style={{ letterSpacing: "4px" }}>
                    <a href="#home" className="w3-bar-item w3-button">Trece Martires National Highschool</a>
                    {/* <!-- Right-sided navbar links. Hide them on small screens --> */}
                    <div className="w3-right w3-hide-small">
                        <a href="#contact" className="w3-bar-item w3-button">Contact Us</a>
                    </div>
                </div>
            </div>

            {/*<!-- Page content -->*/}
            <div className="w3-content w3-margin-top w3-padding-top-64" style={{ maxWidth: "1400px" }}>

                {/*<!-- User Info -->*/}
                {/*<!-- The Grid -->*/}
                <div className="w3-row-padding">


                    {/*<!-- Left Column -->*/}
                    <div className="w3-third">

                        <div className="w3-white w3-text-grey w3-card-4">
                            <div className="w3-display-container">

                                <img src="https://www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg" alt="Avatar"
                                    style={{ width: "100%" }} />

                                <div className="w3-display-bottomleft w3-container w3-text-black">
                                    <h2>{user.first_name} {user.last_name}</h2>
                                </div>
                            </div>
                            <br />
                            <div className="w3-container">
                                <p><i className="fa fa-certificate fa-fw w3-margin-right w3-large w3-text-teal"></i>ID No: {user.teacher_id_no}</p>
                                <p><i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>Home Address: {user.address}</p>
                                <p><i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>Email Address: {user.schoolEmail}</p>
                                <p><i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>Contact Number: {user.contact_no}</p>
                            
                            </div>
                        </div><br />


                        {/*<!-- End Left Column -->*/}
                    </div>


                    {/*<!-- Right Column -->*/}
                    <div className="w3-twothird">

                        <div class="w3-container w3-card w3-white w3-margin-bottom">
                            <h2 class="w3-text-grey w3-padding-16"><i
                                class="fa fa-bullhorn fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Announcement</h2>

                            <div class="w3-content w3-display-container w3-margin-bottom">

                                <Carousel>
                                    <Carousel.Item>
                                        <div
                                            className="d-block w-100"
                                            style={{ backgroundColor: "#c5c5c5", height: "300px" }}
                                        />
                                        <Carousel.Caption>
                                            <h3>First slide label</h3>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div
                                            className="d-block w-100"
                                            style={{ backgroundColor: "#c5c5c5", height: "300px" }}
                                        />

                                        <Carousel.Caption>
                                            <h3>Second slide label</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div
                                            className="d-block w-100"
                                            style={{ backgroundColor: "#c5c5c5", height: "300px" }}
                                        />

                                        <Carousel.Caption>
                                            <h3>Third slide label</h3>
                                            <p>
                                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                            </p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>

                            </div>

                        </div>

                        <div className="w3-container w3-card w3-white">
                            <h2 className="w3-text-grey w3-padding-16"><i
                                className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Grade Level 
                                <div className='col-12 levelContainer'>
                                    <Button variant="primary" onClick={() => setShowCreate(true)}>New Student</Button>
                                    <Button variant="secondary" style={{marginLeft:"10px"}}>Enroll Student</Button>
                                </div>
                                </h2>
                            <div className="w3-container">
                                <div className="w3-card">
                                    <table className="w3-table w3-bordered" name="tblSched">
                                        <thead>

                                            <tr>
                                                <th>Subjects</th>
                                                <th>1st</th>
                                                <th>2nd</th>
                                                <th>3rd</th>
                                                <th>4th</th>
                                                <th>Final Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>MAPEH</td>
                                            </tr>
                                            <tr>
                                                <td>ENGLISH</td>
                                            </tr>
                                            <tr>
                                                <td>MATHEMATICS</td>
                                            </tr>
                                            <tr>
                                                <td>AP</td>
                                            </tr>
                                            <tr>
                                                <td>ESP</td>
                                            </tr>
                                            <tr>
                                                <td>FILIPINO</td>
                                            </tr>
                                            <tr>
                                                <td>TLE</td>
                                            </tr>
                                            <tr>
                                                <td>SCIENCE</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br />
                        </div>


                        {/*<!-- End Right Column -->*/}
                    </div>


                    {/*<!-- End Grid -->*/}
                </div>


                {/*<!-- End page content -->*/}
            </div>


        </div>

    )
}