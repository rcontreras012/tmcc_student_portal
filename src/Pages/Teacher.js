import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { LOGOUT } from '../redux/actionType';
import { url } from '../Utils/url';
import { Button } from 'react-bootstrap';
import * as xlsx from 'xlsx'
import { UpdatePassModal } from '../Components/Modal';
import Dropzone from 'react-dropzone';

export const TeacherPage = (props) => {
    const [studentFileName, setStudentFileName] = useState('')
    const [studentFile, setStudentFile] = useState('')
    
    const [announcementList, setAnnouncementList] = useState([])
    const user = useSelector(state => state.user.user)
    const [gradeList, setGradeList] = useState([])
    const [gcode, setGcode] = useState(0)
    const [seccode, setSecCode] = useState('')
    const [sy, setSy] = useState(moment().format('YYYY'))
    const [sectionList, setSectionList] = useState([])
    const [studentList, setStudentList] = useState([])
    const [subjectList, setSubjectList] = useState([])
    const [studentID, setStudentID] = useState('')
    const [subject, setSubject] = useState('')
    const [selectedPeriod, setSelectedPeriod] = useState('')
    const [grade, setGrade] = useState(0)
    const [teacherSched, setTeacherSched] = useState([])
    const [mapImage, setMapImage] = useState('')
    const [quarterGrade, setQuarterGrading] = useState({
        first: 0,
        second: 0,
        third: 0,
        fourth: 0
    })
    const [mapSize, setMapSize] = useState({
        height: 500,
        width: 500
    })
    const [selectedStudent, setSelectedStudent] = useState({
        sy: '',
        LRNNumber: '',
        gcode: '',
        seccode: ''
    })
    const [selectedSched, setSelectedSched] = useState({
        time: "",
        subject: "",
        secCode: "",
        teacher: "",
        gcode: '',
        sy: ''
    })
    const [showForgot, setForgot] = useState(false)

    const [maps, setMaps] = useState([])

    const [grading, setOpenGrading] = useState({
        sy: moment().format("YYYY"),
        first: false,
        second: false,
        third: false,
        fourth: false
    })
    const [syList, setSyList] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        getAllMaps()
    }, [])

    const getAllMaps = () => {
        axios.post(url + "getMaps", null, null).then(res => {


            setMaps(res.data.result)
        })
    }

    useEffect(() => {
        if (user == null) {
            alert("Permission denied")
        }
        else if (user.role != 2) {

            navigate('/', { replace: true })
            dispatch({
                type: LOGOUT
            })
        }
    }, [])

    useEffect(() => {
        
        getSyList()
        getAnnouncement()
        getGradeList()
        getSubject()
        getGradingTerm()
        getTeacherSchedule()
    }, [sy])


    const fileSelect = (v, label) => {

        const file = v[0]

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);

       

                setStudentFile(json)
                setStudentFileName(file.name)
            
        };

        reader.readAsArrayBuffer(file);

    }

    const importStudent = () => {
    


        axios.post(url + "importGrade", null, {
            params: {
                file: studentFile
            }
        }).then(res => {

            alert("Importing student success")
            setStudentFile('')
            setStudentFileName('')
        }).catch(err => {

        })
    }




    const getAnnouncement = () => {
        axios.post(url + 'getannouncement', null, null).then(res => {
            // 


            // document.getElementById('id01').style.display = 'none'

            setAnnouncementList(res.data.result)

        }).catch(err => {

        })


    }

    const getGrade = (i) => {



        axios.post(url + "getstudentgradeOne", null, {
            params: {
                sy: sy,
                LRNNumber: i.LRNNumber,
                gcode: i.gradeCode,
                seccode: i.secCode,
                subject: selectedSched.subject


            }
        }).then(res => {



            console.log(res, "--> AWIT SIR")


            if (res.data.grade.length == 0) {
                // alert('no grade available')
                setQuarterGrading({
                    first: 0,
                    second: 0,
                    third: 0,
                    fourth: 0
                })
            }
            else{
                
                let d = res.data.grade[0]
                setQuarterGrading({
                    first: d.first,
                    second: d.second,
                    third: d.third,
                    fourth: d.fourth
                })
            }





        }).catch(err => {

        })

    }

    const gradeStudent = () => {
        

        // if (grade == 0 && subject == "") {
        //     alert('Please fill out all fields')
        // }
        // else {

            // sy: 2023,
            //     LRNNumber: i.LRNNumber,
            //         gcode: i.gradeCode,
            //             seccode: i.secCode

            axios.post(url + "gradeStudent", null, {
                params: {
                    sy:  sy,
                    gcode: selectedStudent.gcode,
                    seccode: selectedStudent.seccode,
                    studentID: selectedStudent.LRNNumber,
                    subject: selectedSched.subject,
                    first: quarterGrade.first,
                    second: quarterGrade.second,
                    third: quarterGrade.third,
                    fourth: quarterGrade.fourth

                }
            }).then(res => {
                document.getElementById('id01').style.display = 'none'
                
                alert('Successfully graded the student')
                setGrade('')

            }).catch(err => {
                
            })
        





    }

    const getTeacherSchedule = () => {

        axios.post(url + "getteacherschedule", null, {
            params: {
                sy: sy,
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
                sy: sy
            }
        }).then(res => {

            

            
            if (res.data.data.length != 0) {
                setOpenGrading({
                    sy: sy,
                    first: res.data.data[0].first,
                    second: res.data.data[0].second,
                     third: res.data.data[0].third,
                    fourth: res.data.data[0].fourth,
                })
            }
            else{
                setOpenGrading({
                    sy: sy,
                    first: false,
                    second: false,
                    third: false,
                    fourth: false,
                })
            }
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

    const getSyList = () => {

        axios.post(url + 'getSy', null, null).then(res => {
            // 


            
            setSyList(res.data.result)

        }).catch(err => {

        })
    }


    const getStudentList = () => {
        axios.post(url + 'getstudentlist', null, {
            params: {
                gcode: gcode,
                seccode,
                sy
            }
        }).then(res => {
            // 


            setStudentList(res.data.list)
            getSubject()

        }).catch(err => {

        })
    }


    const getStudentListBySched = (g, s) => {
        axios.post(url + 'getstudentlist', null, {
            params: {
                gcode: g,
                seccode: s,
                sy
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

            <UpdatePassModal
                teacher={true}
                onClose={() => setForgot(false)}
                show={showForgot}
                success={() => {

                    setForgot(false)
                }}
            />

            {/* <!-- Navbar (sit on top) --> */}
            <div className="w3-top">
                <div className=" w3-white w3-padding w3-card" style={{ letterSpacing: "4px" }}>
                    <img style={{ height: "55px", width: "55px" }} src={require('../Utils/img/TMCNHS LOGO.png')} />
                    <a href="#home" className="w3-bar-item w3-button">Trece Martires City National High School</a>

                    {/* <!-- Right-sided navbar links. Hide them on small screens --> */}
                    <div className="w3-right w3-hide-small">
                        <a
                            onClick={() => {
                                dispatch({
                                    type: LOGOUT
                                })
                                navigate('/', { replace: true })
                            }}
                            className="w3-bar-item w3-button">Logout</a>
                    </div>

                    <div className="w3-right w3-hide-small">
                        <a
                            onClick={() => {
                                setForgot(true)
                            }}
                            className="w3-bar-item w3-button">Change password</a>

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

                                <select onChange={(v) => setSy(v.target.value)} class="form-select" aria-label="Default select example">
                                    <option  selected>School Year</option>
                                    {
                                        syList.map((i, k) => {
                                            return <option selected={i.schoolYear == sy ? true : false} value={i.schoolYear}>{i.schoolYear}</option>
                                        })
                                    }
                                </select>

                                <div className="w3-card-2" style={{marginTop: "20px"}}>
                                    <table className="w3-table w3-bordered w3-hoverable w3-small" name="tblSched">
                                        <thead>
                                            <tr>
                                                <th>Time</th>
                                                <th>Subjects</th>
                                                <th>Section</th>
                                                <th>Teacher</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                teacherSched.map((i, k) => {

                                                    return (
                                                        <tr >

                                                            <td>{i.time}</td>
                                                            <td>{i.subject}</td>
                                                            <td>{i.secCode}</td>
                                                            <td>{i.teacher}</td>
                                                            <td><button 
                                                                className='w3-button w3-teal '
                                                                onClick={() => {
                                                                    // document.getElementById('id03').style.display = 'block'
                                                                    setSelectedSched({
                                                                        time: i.time,
                                                                        subject: i.subject,
                                                                        secCode: i.secCode,
                                                                        teacher: i.teacher,
                                                                        gcode: i.gcode,
                                                                        sy: i.sy
                                                                    })
                                                                    getStudentListBySched(i.gcode, i.secCode)
                                                                }}
                                                            >View student</button></td>
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
                                                
                                                <th>Map location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                maps.map((i, k) => {

                                                    return (
                                                        <tr>

                                                            
                                                            <td>{i.name}</td>
                                                            <td>
                                                                <button onClick={() => {
                                                                    document.getElementById('id02').style.display = 'block'
                                                                    setMapImage(i.image)

                                                                }} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}><i class="fa fa-globe" aria-hidden="true"></i></button>
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

                                <div>
                                    Import Excel File instead
                                </div>

                            <div className='w3-container w3-card w3-margin-bottom'>
                                <div className='w3-row w3-center w3-margin-bottom'>
                                

                                    <div class="col-xl-12 w3-padding-small">
                                        <h4>
                                            Import Student Grade
                                        </h4>

                                        <Dropzone
                                            accept={{
                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
                                            }}
                                            onDrop={(v) => fileSelect(v, "enrollee")}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div className='dropzone' {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag 'n' drop excel files here, or click to select files</p>
                                                </div>
                                            )}
                                        </Dropzone>

                                        {
                                            studentFileName != "" &&
                                            <aside>
                                                <h4>Files</h4>
                                                <div className='col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            {studentFileName}
                                                        </div>

                                                        <div className='col-lg-9'>
                                                            <i
                                                                onClick={() => {
                                                                    setStudentFileName('')
                                                                    setStudentFile('')
                                                                }}
                                                                class="bi bi-trash" style={{ color: "red" }}></i>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-12" style={{ marginTop: "20px" }}>
                                                        <button onClick={() => importStudent()} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>Import</button>
                                                    </div>

                                                </div>
                                            </aside>
                                        }

                                    </div>

                                </div>
                            </div>

                            <div className="w3-container">

                                {/* <h3>Subject: <label id='SubName'>Subject Name Here</label> </h3> */}

                                <br />

                                {/* <div className='w3-row'>

                                    <div className='w3-half' style={{ width: "48%", marginRight: "5px" }}>
                                        <select 
                                            onChange={(v) => setGcode(v.target.value)} 
                                            class="w3-select w3-border" name="option">
                                            <option value="" disabled selected>Choose your Grade</option>
                                            <option value="G7">Grade 7</option>
                                            <option value="G8">Grade 8</option>
                                            <option value="G9">Grade 9</option>
                                            <option value="G10">Grade 10</option>
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

                                </div> */}

                                <br />

                                {/* <button 
                                onClick={() => getStudentList()}
                                className='w3-button w3-teal w3-round-large w3-margin-bottom'>Proceed</button>                                             */}
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

                                                    return (
                                                        <tr>
                                                            <td>{i.name}</td>
                                                            <td>
                                                                <button onClick={() => {

                                                                    setStudentID(i.LRNNumber)

                                                                    setSelectedStudent({
                                                                        sy: sy,
                                                                        LRNNumber: i.LRNNumber,
                                                                        gcode: i.gradeCode,
                                                                        seccode: i.secCode
                                                                    })

                                                                    getGrade(i)
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
                        <h1>School Year: {sy} - {parseInt(sy) + 1}</h1>
                        <h2>Add Grade</h2>
                    </header>

                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>{selectedSched.subject}</h4>
                        </div>
                        {
                            
                        }
                        <div className='d-flex'>
                            <div>
                                1st

                                <input
                                    disabled={grading.first ? false: true}
                                    value={quarterGrade.first}
                                    onChange={(v) => setQuarterGrading({ ...quarterGrade, ...{ first: v.target.value } })}
                                    class="w3-input w3-border" type="text" style={{ width: "60%" }} />

                            </div>

                            <div>
                                2nd

                                <input
                                    disabled={grading.second ? false : true}
                                    value={quarterGrade.second}
                                    onChange={(v) => setQuarterGrading({ ...quarterGrade, ...{ second: v.target.value } })}
                                    class="w3-input w3-border" type="text" style={{ width: "60%" }} />

                            </div>

                            <div>
                                3rd

                                <input
                                    disabled={grading.third ? false : true}
                                    value={quarterGrade.third}
                                    onChange={(v) => setQuarterGrading({ ...quarterGrade, ...{ third: v.target.value } })}
                                    class="w3-input w3-border" type="text" style={{ width: "60%" }} />

                            </div>

                            <div>
                                4th

                                <input
                                    disabled={grading.fourth ? false : true}
                                    value={quarterGrade.fourth}
                                    onChange={(v) => setQuarterGrading({ ...quarterGrade, ...{ fourth: v.target.value } })}
                                    class="w3-input w3-border" type="text" style={{ width: "60%" }} />

                            </div>
                        </div>

                    </div>

                    {/* <div className='w3-row w3-margin-top w3-padding'>
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

                                        return (
                                            <option value={i.subject}>{i.subject}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                    </div> */}

                    <div class="w3-container w3-light-grey w3-padding">
                        <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => document.getElementById('id01').style.display = 'none'} style={{ width: "15%" }}>Close</button>
                        <button class="w3-button w3-right w3-teal w3-border"
                            onClick={() => {
                                gradeStudent()

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

                        <div className='row' style={{ marginBottom: "20px" }}>

                            <Button
                                style={{
                                    padding: "10px 10px",
                                    maxWidth: "100px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    display: "flex"
                                }}
                                onClick={() => {
                                    setMapSize({
                                        ...mapSize,
                                        height: mapSize.height + 30,
                                        width: mapSize.width + 30
                                    })
                                }}>
                                Zoom In
                            </Button>

                            <Button
                                class="btn btn-secondary"
                                style={{
                                    padding: "10px 10px",
                                    maxWidth: "100px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                    marginLeft: "20px"
                                }}
                                onClick={() => {
                                    setMapSize({
                                        ...mapSize,
                                        height: mapSize.height - 30,
                                        width: mapSize.width - 30
                                    })
                                }}
                            >
                                Zoom out
                            </Button>

                        </div>

                        <div className='w3-rest w3-center' style={{ overflow: "scroll" }}>
                            <img
                                style={{ height: mapSize.height + "px", width: mapSize.width + "px" }}
                                src={mapImage}
                            />
                        </div>
                    </div>

                    <div class="w3-container w3-light-grey w3-padding">
                        <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => document.getElementById('id02').style.display = 'none'} style={{ width: "15%" }} >Close</button>
                    </div>
                </div>
            </div>

            <div id="id03" class="w3-modal">
                <div class="w3-modal-content w3-card-4 w3-animate-zoom">
                    <header class="w3-container w3-teal">
                        <h2>Student List</h2>
                    </header>


                    <div className='w3-row w3-margin-top w3-padding'>
                        <h3>
                            {selectedSched.subject}
                        </h3>


                    </div>


                    {/* <div class="w3-container w3-light-grey w3-padding">
                        <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => document.getElementById('id01').style.display = 'none'} style={{ width: "15%" }}>Close</button>
                        <button class="w3-button w3-right w3-teal w3-border"
                            onClick={() => {
                                gradeStudent()

                            }} style={{ width: "15%", marginRight: "5px" }}>Save</button>

                    </div> */}
                </div>
            </div>

            {/*<!-- End Modal content -->*/}
        </div>


    )
}
