import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from 'react-redux';
import '../App.css';
import { url } from '../Utils/url';

export const TeacherPage = (props) => {

    const [announcementList, setAnnouncementList] = useState([])
    const user = useSelector(state => state.user.user)
    const [gradeList, setGradeList] = useState([])
    const [gcode, setGcode] = useState(0)
    const  [seccode, setSecCode] = useState('')
    const [sy, setSy] = useState(moment().format('YYYY'))
    const [sectionList, setSectionList] = useState([])
    const [studentList, setStudentList] = useState([])
    const [subjectList, setSubjectList] = useState([])
    const [studentID, setStudentID] = useState('')
    const [subject, setSubject] = useState('')
    const [selectedPeriod, setSelectedPeriod] = useState('')
    const [grade, setGrade] = useState(0)
    const [teacherSched, setTeacherSched] = useState([])

    const [grading, setOpenGrading] = useState({
        sy: moment().format("YYYY"),
        first: false,
        second: false,
        third: false,
        fourth: false
    })


    

    useEffect(() => {
        getAnnouncement()
        getGradeList()
        getSubject()
        getGradingTerm()
        getTeacherSchedule()
    }, [])

    const getAnnouncement = () => {
        axios.post(url + 'getannouncement', null, null).then(res => {
            // 


            // document.getElementById('id01').style.display = 'none'

            setAnnouncementList(res.data.result)

        }).catch(err => {

        })


    }

    const gradeStudent = () => {

        

        axios.post(url + "gradeStudent", null, {
            params: {
                sy: moment().format('YYYY'),
                gcode,
                seccode,
                studentID,
                sy,
                selectedPeriod,
                subject,
                grade

            }
        }).then(res => {

            
            
            setGrade('')
   
        }).catch(err => {
            
        })

    }

    const getTeacherSchedule = () => {

        axios.post(url + "getteacherschedule", null, {
            params: {
                sy: moment().format('YYYY'),
                teacher_id: user.teacher_id_no

            }
        }).then(res => {



            

                setTeacherSched(res.data.list)
        }).catch(err => {

        })
    }

    const getGradingTerm = () => {



        axios.post(url + "getTerm", null, {
            params: {
                sy: moment().format('YYYY')
            }
        }).then(res => {


            

            setOpenGrading(res.data.data)
        }).catch(err => {
            
        })

    }

    const getGradeList = () => {
        
        axios.post(url + 'getteachersection', null, {
            params: {
                gcode: gcode,
                seccode,
                sy,
                teacher_id: user.teacher_id_no
            }
        }).then(res => {
            // 

            

            setSectionList(res.data.list)
      
        }).catch(err => {
            
        })

    }

    const getSubject = () => {
        axios.post(url + 'getSubject', null, {
            params: {
                gcode: gcode,
                seccode,
                sy,
                teacher_id: user.teacher_id_no
            }
        }).then(res => {
            // 

            

            // setStudentList(res.data.list)
            setSubjectList(res.data.list)

        }).catch(err => {

        })
    }

 
    const getStudentList = () => {
        axios.post(url + 'getstudentlist', null, {
            params: {
                gcode: gcode,
                seccode,
            }
        }).then(res => {
            // 


            setStudentList(res.data.list)
            getSubject()

        }).catch(err => {

        })
    }

    
    

  
    
    return (

        <div className="w3-light-grey">

            {/* <!-- Navbar (sit on top) --> */}
            <div className="w3-top">
                <div className="w3-bar w3-white w3-padding w3-card" style={{ letterSpacing: "4px" }}>
                    <a href="#home" className="w3-bar-item w3-button">Trece Martires National Highschool</a>
                    {/* <!-- Right-sided navbar links. Hide them on small screens --> */}
                    <div className="w3-right w3-hide-small">
                        <a href="#about" className="w3-bar-item w3-button">About</a>
                        <a href="#menu" className="w3-bar-item w3-button">Menu</a>
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
                                {/* <p><i className="fa fa-certificate fa-fw w3-margin-right w3-large w3-text-teal"></i>Grade / Section</p> */}
                                <p><i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>Home Address: {user.address}</p>
                                <p><i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>Email Address: {user.schoolEmail}</p>
                                <p><i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>Contact Number: {user.contact_no}</p>
                                <hr />

                                <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>My Schedule</b></p>

                                <div className="w3-card-2">
                                    <table className="w3-table w3-bordered w3-hoverable w3-small" name="tblSched">
                                        <thead>
                                            <tr>
                                                <th>Time</th>
                                                <th>Subjects</th>
                                                <th>Teacher</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                teacherSched.map((i, k) => {
                                                    
                                                    return (
                                                        <tr>
                                                            
                                                            <td>{i.time}1</td>
                                                            <td>{i.subject}</td>
                                                            <td>{i.teacher}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <br />

                                <p className="w3-large w3-text-theme"><b><i
                                    className="fa fa-globe fa-fw w3-margin-right w3-text-teal"></i>School
                                    Map</b></p>
                                <div className="w3-card-2 w3-margin-bottom">
                                    <table className="w3-table w3-bordered w3-hoverable w3-small" name="tblSched">
                                        <thead>
                                            <tr>
                                                <th>Grade</th>
                                                <th>Section</th>
                                                <th>Map links</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                teacherSched.map((i, k) => {

                                                    return (
                                                        <tr>

                                                            <td>{i.time}1</td>
                                                            <td>{i.subject}</td>
                                                            <td>
                                                                <button onClick={() => document.getElementById('id02').style.display = 'block'} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}><i class="fa fa-globe" aria-hidden="true"></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
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
                                    {
                                        announcementList.map((i, k) => {

                                            return (
                                                <Carousel.Item>
                                                    <div
                                                        className="d-block w-100"
                                                        style={{ backgroundColor: "#c5c5c5", height: "300px" }}
                                                    />
                                                    <Carousel.Caption>
                                                        <h3>{i.announcement}</h3>
                                                        <p>{i.DateAnnounce}</p>
                                                    </Carousel.Caption>
                                                </Carousel.Item>
                                            )
                                        })
                                    }
                                </Carousel>

                            </div>

                        </div>

                        <div className="w3-container w3-card w3-white">
                            <h2 className="w3-text-grey w3-padding-16">
                                <i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Grading</h2>
                            <div className="w3-container">

                                <h3>Subject: <label id='SubName'>Subject Name Here</label> </h3>

                                <br />

                                <div className='w3-row'>

                                    <div className='w3-half' style={{ width: "48%", marginRight: "5px" }}>
                                        <select 
                                            onChange={(v) => setGcode(v.target.value)} 
                                            class="w3-select w3-border" name="option">
                                            <option value="" disabled selected>Choose your Grade</option>
                                            <option value="G7">Grade 7</option>
                                            <option value="G8">Grade 8</option>
                                            <option value="G9">Grade 9</option>
                                            <option value="G10">Grade 10</option>
                                            <option value="G11">Grade 11</option>
                                            <option value="G12">Grade 12</option>
                                        </select>
                                    </div>

                                    <div className='w3-half' style={{ width: "48%", marginRight: "5px" }}>
                                        <select onChange={(v) => setSecCode(v.target.value)}  class="w3-select w3-border" name="option">
                                            <option value="" disabled selected>Choose your Sections</option>
                                            {
                                                sectionList.map((i, k) => {
                                                  return  <option value={i.secCode}>{i.secCode}</option>
                                                })
                                            }
                                           
                                        </select>
                                    </div>

                                </div>

                                <br />

                                <button 
                                onClick={() => getStudentList()}
                                className='w3-button w3-teal w3-round-large w3-margin-bottom'>Proceed</button>                                            
                                <div className="w3-card">
                                    <table className="w3-table w3-bordered" name="tblSched">
                                        <thead>

                                            <tr>
                                                <th>Student Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {
                                            studentList.map((i, k) => {

                                                return(
                                                    <tr>
                                                        <td>{i.name}</td>
                                                        <td>
                                                            <button onClick={() => 
                                                                
                                                                {
                                                                    
                                                                    setStudentID(i.LRNNumber)
                                                                document.getElementById('id01').style.display = 'block'
                                                                }
                                                                
                                                                } class="w3-button w3-teal w3-round-large">Add Grade</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                          }
                                            
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

            {/*<!-- Modal content -->*/}
            <div id="id01" class="w3-modal">
                <div class="w3-modal-content w3-card-4 w3-animate-zoom">
                    <header class="w3-container w3-teal">
                        <h2>Add Grade</h2>
                    </header>

                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>Grading Period : </h4>                         
                        </div>
                        <div className='w3-rest'>
                            <select 
                                onChange={(v) => setSelectedPeriod(v.target.value)}
                                class="w3-select w3-border" name="option" style={{ width: "60%" }}>
                                <option 
                                    value="" disabled selected>Choose your grading period</option>
                                <option disabled={grading.first ? false : true} value="1">1st</option>
                                <option disabled={grading.second ? false : true} value="2">2nd</option>
                                <option disabled={grading.third ? false : true} value="3">3rd</option>
                                <option disabled={grading.fourth ? false : true} value="4">4th</option>
                            </select>                            
                        </div>
                    </div>

                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>Grade: </h4>
                        </div>
                        <div className='w3-rest'>
                            <input 
                                value={grade}
                                onChange={(v) => setGrade(v.target.value)}
                                class="w3-input w3-border" type="text" style={{ width: "60%" }} />
                        </div>
                    </div>

                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>Subject: </h4>
                        </div>
                        <div className='w3-rest'>
                            <select 

                                onChange={(v) => setSubject(v.target.value)}
                                class="w3-select w3-border" name="option" style={{ width: "60%" }}>
                                <option 
                                    value="" disabled selected>Choose your subject</option>
                                          {
                                            subjectList.map((i, k) => {

                                                return(
                                                    <option value={i.subject}>{i.subject}</option>
                                                )
                                            })
                                          }
                             
                            </select>
                        </div>
                    </div>

                    <div class="w3-container w3-light-grey w3-padding">
                    <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => document.getElementById('id01').style.display = 'none'} style={{ width: "15%" }}>Close</button>
                        <button class="w3-button w3-right w3-teal w3-border"
                            onClick={() => {
                                gradeStudent()
                                document.getElementById('id01').style.display = 'none'
                            }} style={{ width: "15%", marginRight: "5px" }}>Save</button>

                    </div>
                </div>
            </div>

            <div id="id02" class="w3-modal">
                <div class="w3-modal-content w3-card-4 w3-animate-zoom">
                    <header class="w3-container w3-teal">
                        <h2>School Map</h2>
                    </header>

                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>Gcdoe</h4>
                            <h5>Section</h5>
                            <h5>Location Here</h5>
                        </div>
                        <div className='w3-rest'>
                            <h5>Location Here Change to image</h5>
                        </div>
                    </div>

                    <div class="w3-container w3-light-grey w3-padding">
                        <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => document.getElementById('id02').style.display = 'none'} style={{ width: "15%" }} >Close</button>
                    </div>
                </div>
            </div>
            {/*<!-- End Modal content -->*/}
        </div>


    )
}