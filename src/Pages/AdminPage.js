import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from 'react-redux';
import '../App.css';
import { EnrollModal } from '../Components/Modal';
import Button from 'react-bootstrap/Button';
import { useDropzone } from 'react-dropzone';
import '../Utils/css/Adminpage.css'
import * as xlsx from 'xlsx'
import { url } from '../Utils/url';
import axios from 'axios'
//let slideIndex = 1;

export const AdminPage = (props) => {

    const user = useSelector(state => state.user.user)
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const [file, setFile] = useState('')
    const [showCreate, setShowCreate] = useState(false)



    const files = acceptedFiles.map(file => {

        
      
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
            
                setFile(json)
            };
            
            reader.readAsArrayBuffer(file);


            
           
        

        
    });


    const importExcel = () => {
        console.log(file)

      
        axios.post(url + "addschedule", null, {
            params:{
                file
            }
        }).then(res => {
            console.log(res, "--> check now")
            alert("Import success")
        }).catch(err => {
            console.log(err)
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
                                    <button onClick={() => document.getElementById('id01').style.display = 'block'} class="w3-button w3-teal w3-round-large " style={{ width: "95%" }}>Manage Announcement</button>
                                </div>

                            </div>

                            <br />

                        </div>

                        <div className="w3-container w3-card w3-white w3-margin-bottom">
                            <h2 className="w3-text-grey w3-padding-16"><i
                                className="fa fa-user fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>User Management
                            </h2>

                            <div className='w3-container w3-card '>
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
                            <div className='w3-container w3-card '>
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


                            <br />
                            <div className='w3-container w3-card '>
                                <div className='w3-row w3-center w3-margin-bottom'>
                                    <h3>Excel</h3>
                                    <div class="col-lg-12">
                                        <button onClick={() => importExcel()} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>Import</button>
                                    </div>

                                </div>

                                <section className="container">
                                    <div {...getRootProps()} className="dropzone">
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop your excel file here, or click to select files</p>
                                    </div>
                                    <aside>
                                        <h4>Files</h4>
                                        <ul>{files}</ul>
                                    </aside>
                                </section>
                            </div>



                            


                         
                            <br />
                        </div>

                        <div className='w3-container w3-card w3-white w3-margin-bottom'>
                            <h2 className="w3-text-grey w3-padding-16"><i
                                className="fa fa-calendar fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Grading Schedule
                            </h2>

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
                            <h4>Grading Period : </h4>
                        </div>
                        <div className='w3-rest'>
                            <select class="w3-select w3-border" name="option" style={{ width: "60%" }}>
                                <option value="" disabled selected>Choose your grading period</option>
                                <option value="1">1st</option>
                                <option value="2">2nd</option>
                                <option value="3">3rd</option>
                                <option value="3">4th</option>
                            </select>
                        </div>
                    </div>

                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>Grade: </h4>
                        </div>
                        <div className='w3-rest'>
                            <input class="w3-input w3-border" type="text" style={{ width: "60%" }} />
                        </div>
                    </div>

                    <div class="w3-container w3-light-grey w3-padding">
                        <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => document.getElementById('id01').style.display = 'none'}>Close</button>
                    </div>
                </div>
            </div>
            {/*<!-- End Modal content -->*/}
        </div>

    )
}