import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from 'react-redux';
import '../App.css';
import { EnrollModal } from '../Components/Modal';
import Button from 'react-bootstrap/Button';
import Dropzone, { useDropzone } from 'react-dropzone';
import '../Utils/css/Adminpage.css'
import * as xlsx from 'xlsx'
import { url } from '../Utils/url';
import axios from 'axios'
//let slideIndex = 1;

export const AdminPage = (props) => {

    const user = useSelector(state => state.user.user)
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const [f, setFile] = useState('')
    const [fname, setFname] = useState('')
    const [showCreate, setShowCreate] = useState(false)




    const fileSelect = (v) => {

        const file = v[0]

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);

            setFile(json)
            setFname(file.name)
        };

        reader.readAsArrayBuffer(file);

    }


    const importExcel = () => {

        axios.post(url + "addschedule", null, {
            params: {
                file: f
            }
        }).then(res => {

            alert("Import success")
            setFile('')
            setFname('')
        }).catch(err => {
            
        })
    }

    return (

        <div className="w3-light-grey">
            <EnrollModal
                onClose={() => setShowCreate(false)}
                show={showCreate} />
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

                        {/*<!-- Announcement -->*/}
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

                            <div className='w3-row w3-center'>
                                <div class="w3-half w3-padding-small">
                                    <button onClick={() => document.getElementById('id01').style.display = 'block'} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>New Announcement</button>
                                </div>

                                <div class="w3-half w3-padding-small">
                                    <button onClick={() => document.getElementById('id02').style.display = 'block'} class="w3-button w3-teal w3-round-large " style={{ width: "95%" }}>Manage Announcement</button>
                                </div>

                            </div>

                            <br />

                        </div>

                        {/*<!-- User Management -->*/}
                        <div className="w3-container w3-card w3-white w3-margin-bottom">
                            <h2 className="w3-text-grey w3-padding-16"><i
                                className="fa fa-user fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>User Management
                            </h2>

                            <div className='w3-container w3-card w3-margin-bottom'>
                                <div className='w3-row w3-center w3-margin-bottom'>
                                    <h3>Student</h3>
                                    <div class="w3-half w3-padding-small">
                                        <button onClick={() => setShowCreate(true)} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>New Student</button>
                                    </div>

                                    <div class="w3-half w3-padding-small">
                                        <button onClick={() => document.getElementById('id01').style.display = 'block'} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>Enroll Student</button>
                                    </div>

                                </div>
                            </div>
                            <br />
                            <div className='w3-container w3-card w3-margin-bottom'>
                                <div className='w3-row w3-center w3-margin-bottom'>
                                    <h3>Teacher</h3>
                                    <div class="w3-half w3-padding-small">
                                        <button onClick={() => document.getElementById('id01').style.display = 'block'} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>New Teacher</button>
                                    </div>

                                    <div class="w3-half w3-padding-small">
                                        <button onClick={() => document.getElementById('id01').style.display = 'block'} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>Enroll Teacher</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/*<!-- Gradring Schedule -->*/}
                        <div className='w3-container w3-card w3-white w3-margin-bottom'>
                            <h2 className="w3-text-grey w3-padding-16"><i
                                className="fa fa-calendar fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Schedule
                            </h2>

                            <h3>Grading Schedule Management</h3>
                            <div className="w3-card w3-margin-bottom">
                                <table className="w3-table w3-bordered" name="tblSched">
                                    <thead>

                                        <tr>
                                            <th>Grading Period</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1st Grading</td>
                                            <td>
                                                <label class="switch">
                                                    <input type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2nd Grading</td>
                                            <td>
                                                <label class="switch">
                                                    <input type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3rd Grading</td>
                                            <td>
                                                <label class="switch">
                                                    <input type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4th Grading</td>
                                            <td>
                                                <label class="switch">
                                                    <input type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <h3>Student Schedule Management</h3>
                            <div className='w3-container w3-card w3-margin-bottom'>
                                <div className='w3-row w3-center w3-margin-bottom'>
                                    <h3>Excel</h3>
                                    <div class="col-lg-12">
                                        <button onClick={() => importExcel()} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>Import</button>
                                    </div>

                                </div>

                                <section className="container">
                                    <Dropzone onDrop={(v) => fileSelect(v)}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div className='dropzone' {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                            </div>
                                        )}
                                    </Dropzone>
                                    {
                                        fname != "" &&
                                        <aside>
                                            <h4>Files</h4>
                                            <div className='col-lg-12'>
                                                <div className='row'>
                                                    <div className='col-lg-3'>
                                                        {fname}
                                                    </div>

                                                    <div className='col-lg-9'>
                                                        <i
                                                            onClick={() => setFname('')}
                                                            class="bi bi-trash" style={{ color: "red" }}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </aside>
                                    }
                                    <br />
                                </section>
                            </div>
                        </div>


                        {/*<!-- End Right Column -->*/}
                    </div>


                    {/*<!-- End Grid -->*/}
                </div>


                {/*<!-- End page content -->*/}
            </div>


            {/*<!-- Modal content -->*/}
            <div id="id01" class="w3-modal">
                <div class="w3-modal-content w3-card-4 w3-animate-zoom">
                    <header class="w3-container w3-teal">
                        <h2>New Announcement</h2>
                    </header>

                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>Announcement : </h4>
                        </div>
                        <div className='w3-rest'>
                            <textarea id="w3review" name="w3review" rows="4" cols="50" class="w3-input w3-border" style={{ width: "70%" }}></textarea>
                        </div>
                    </div>

                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>Start Date : </h4>
                        </div>
                        <div className='w3-rest'>
                            <input class="w3-input w3-border" type="date" style={{ width: "70%" }} />
                        </div>
                    </div>

                    <div class="w3-container w3-light-grey w3-padding">
                        <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => document.getElementById('id01').style.display = 'none'} style={{ width: "15%" }} >Close</button>
                        <button class="w3-button w3-right w3-teal w3-border"
                            onClick={() => document.getElementById('id01').style.display = 'none'} style={{ width: "15%", marginRight: "5px"}} >Save</button>                        
                    </div>
                </div>
            </div>

            <div id="id02" class="w3-modal">
                <div class="w3-modal-content w3-card-4 w3-animate-zoom">
                    <header class="w3-container w3-teal">
                        <h2>Manage All Announcement</h2>
                    </header>

                    <div className="w3-card w3-margin-bottom">
                                <table className="w3-table w3-bordered" name="tblSched">
                                    <thead>

                                        <tr>
                                            <th>Announcement</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>No class</td>
                                            <td>
                                                <label class="switch">
                                                    <input type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1st Periodic Exam</td>
                                            <td>
                                                <label class="switch">
                                                    <input type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Payments before the exam</td>
                                            <td>
                                                <label class="switch">
                                                    <input type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Start of Enrollment</td>
                                            <td>
                                                <label class="switch">
                                                    <input type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                    <div class="w3-container w3-light-grey w3-padding">
                        <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => document.getElementById('id02').style.display = 'none'} style={{ width: "15%" }} >Close</button>
                        <button class="w3-button w3-right w3-teal w3-border"
                            onClick={() => document.getElementById('id02').style.display = 'none'} style={{ width: "15%", marginRight: "5px"}} >Save</button>                        
                    </div>
                </div>
            </div>

            {/*<!-- End Modal content -->*/}
        </div>

    )
}