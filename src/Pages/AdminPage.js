import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { AddTeacherModal, EnrollModal } from '../Components/Modal';
import Button from 'react-bootstrap/Button';
import Dropzone, { useDropzone } from 'react-dropzone';
import '../Utils/css/Adminpage.css'
import * as xlsx from 'xlsx'
import { url } from '../Utils/url';
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../redux/actionType';
//let slideIndex = 1;

export const AdminPage = (props) => {

    const user = useSelector(state => state.user.user)
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const [f, setFile] = useState('')
    const [fname, setFname] = useState('')
    const [showCreate, setShowCreate] = useState(false)

    const [studentFile, setStudentFile] = useState('')
    const [studentFileName, setStudentFileName] = useState('')

    const [showAddTeacher, setShowAddTeacher] = useState(false)
    const [announcementList, setAnnouncementList] = useState([])

    const [mapUpdate, setMapUpdaate] = useState(false)

    const [announcementUpdate, setAnnouncementUpdate] = useState(false)
    
    const [mapGcode, setMapGcode] = useState('')
    const [mapSecCode, setMapSecCode] = useState('')
    const [fileMap, setFileMap] = useState('')
    const [newMap, setNewMap] = useState('')
    const [mapName, setMapName] = useState('')
    const [maps, setMaps] = useState([])
    const [mapImage, setMapImage] = useState('')
    const [mapSize, setMapSize] = useState({
        height: 500,
        width: 500
    })
    const [announcement, setAnnouncement] = useState({
        desc: '',
        startDate: moment().format('YYYY-MM-DD'),
        id: ''
    })

  

    const [grading, setOpenGrading] = useState({
        sy: moment().format("YYYY"),
        first: false,
        second: false,
        third: false,
        fourth: false
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()



    useEffect(() => {
        if (user == null) {
            alert("Permission denied")
        }
        else if (user.role != 1) {

            navigate('/', { replace: true })
            dispatch({
                type: LOGOUT
            })
        }
    }, [])

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
        else if (user.role != 3) {

            // navigate('/', { replace: true })
            // dispatch({
            //     type: LOGOUT
            // })

        }
    }, [])

    const updateAnnouncementApi = () => {

        
        axios.post(url + 'updateAnnouncement', null, {
            params: {
                announcement: announcement.desc,
                is_active: true,
                date_announce: announcement.startDate,
                expired_date: announcement.startDate,
                id: announcement.id
            }
        }).then(res => {
            // 

            
            document.getElementById('id01').style.display = 'none'
            getAnnouncement()
            setAnnouncement({
                ...announcement,
                desc: '',
                startDate: moment().format('YYYY-MM-DD'),
                id: ''
            })

            alert("Announcement updated!")

        }).catch(err => {
            
        })

    }

    const removeAnnouncementApi = (ids) => {

        
        axios.post(url + 'removeAnnouncement', null, {
            params: {
                announcement: announcement.desc,
                is_active: true,
                date_announce: announcement.startDate,
                expired_date: announcement.startDate,
                id: ids
            }
        }).then(res => {
            // 

            
            document.getElementById('id01').style.display = 'none'
            getAnnouncement()
            // setAnnouncement({
            //     ...announcement,
            //     desc: '',
            //     startDate: moment().format('YYYY-MM-DD'),
            //     id: ''
            // })

            alert("Announcement updated!")

        }).catch(err => {
            
        })

    }

    const deleteMap = () => {

        var bodyFormData = new FormData();
        bodyFormData.append('gcode', mapGcode);
        bodyFormData.append('seccode', mapSecCode);
        bodyFormData.append('image', fileMap);
        bodyFormData.append('name', mapName);

        axios({
            method: "post",
            url: url + "deleteMap",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {


            document.getElementById('id005').style.display = 'none'
            getAllMaps()

            setMapGcode('')
            setMapName('')
            setMapSecCode('')
            setNewMap('')
            setFileMap('')


            alert("Successfully removing map!")
        }).catch(err => {
            
        })

    }

    const saveMap = () => {

        var bodyFormData = new FormData();
        bodyFormData.append('gcode', mapGcode);
        bodyFormData.append('seccode', mapSecCode);
        bodyFormData.append('image', fileMap);
        bodyFormData.append('name', mapName);



        if (mapGcode != '' && mapSecCode != "" && mapName != "" && fileMap != "") {

            if(mapUpdate){
                axios({
                    method: "post",
                    url: url + "updateMap",
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(res => {

                    
                    document.getElementById('mapModal').style.display = 'none'
                    getAllMaps()

                    setMapGcode('')
                    setMapName('')
                    setMapSecCode('')
                    setNewMap('')
                    setFileMap('')
               

                    alert(mapUpdate ? "Successfully update map!" : "Successfully added new map!")
                })
            }

            else{
                axios({
                    method: "post",
                    url: url + "saveMap",
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(res => {
                    getAllMaps()

                    setMapGcode('')
                    setMapName('')
                    setMapSecCode('')
                    setNewMap('')
                    setFileMap('')
                    document.getElementById('mapModal').style.display = 'none'

                    alert(mapUpdate ? "Successfully update map!" : "Successfully added new map!")
                })
            }
        }
        else {
            alert("Please fill out all fields")
        }
    }


    const uploadMap = (file) => {

        // setFileMap(file[0])
        getBase64(file)

    }




    const getBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function () {

            setNewMap(reader.result)
            setFileMap(reader.result)
        };
        reader.onerror = function (error) {

        };
    }


    const fileSelect = (v, label) => {

        const file = v[0]

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);

            if (label == "schedule") {
                setFile(json)
                setFname(file.name)
            }
            else if (label == "enrollee") {

                setStudentFile(json)
                setStudentFileName(file.name)
            }
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

    useEffect(() => {
        getAnnouncement()

    }, [])

    useEffect(() => {
        getGradingTerm()
    }, [])

    const createAnnouncement = () => {

        
        if (announcement.desc == "" && announcement.startDate != "") {
            alert("Please fill out all fields")
        }
        else {
            
            axios.post(url + 'addAnnouncement', null, {
                params: {
                    announcement: announcement.desc,
                    is_active: true,
                    date_announce: announcement.startDate,
                    expired_date: announcement.startDate
                }
            }).then(res => {
                // 

                
                document.getElementById('id01').style.display = 'none'
                getAnnouncement()
                setAnnouncement({
                    ...announcement,
                    desc: '',
                    startDate: moment().format('YYYY-MM-DD')
                })


            }).catch(err => {
                
            })
        }

    }


    const getAnnouncement = () => {
        axios.post(url + 'getannouncement', null, null).then(res => {
            // 


            // document.getElementById('id01').style.display = 'none'

            setAnnouncementList(res.data.result)

        }).catch(err => {

        })


    }

    const getGradingTerm = () => {



        axios.post(url + "getTerm", null, {
            params: {
                sy: moment().format('YYYY')
            }
        }).then(res => {




            setOpenGrading(res.data.data[0])
        }).catch(err => {

        })

    }




    const openGrading = (v, fv) => {

        // Check here

        axios.post(url + "opengrading", null, {
            params: {
                sy: moment().format("YYYY"),
                first: v == 1 ? fv : grading.first,
                second: v == 2 ? fv : grading.second,
                third: v == 3 ? fv : grading.third,
                fourth: v == 4 ? fv : grading.fourth

            }
        }).then(res => {
            // openGrading()


            getGradingTerm()
        }).catch(err => {

        })
    }

    const importStudent = () => {



        axios.post(url + "enrollstudent", null, {
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



    return (

        <div className="w3-light-grey">
            <AddTeacherModal
                onClose={() => setShowAddTeacher(false)}
                show={showAddTeacher}
            />
            <EnrollModal
                onClose={() => setShowCreate(false)}
                show={showCreate} />
            {/* <!-- Navbar (sit on top) --> */}
            <div className="w3-top">
                <div className="w3-bar w3-white w3-padding w3-card" style={{ letterSpacing: "4px" }}>
                    <a href="#home" className="w3-bar-item w3-button">Trece Martires National Highschool</a>
                    {/* <!-- Right-sided navbar links. Hide them on small screens --> */}
                    <div className="w3-right w3-hide-small">
                        <a onClick={() => {
                            dispatch({
                                type: LOGOUT
                            })
                            navigate('/', { replace: true })
                        }} className="w3-bar-item w3-button">Logout</a>

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


                        <div className="w3-white w3-text-grey w3-card-4 ">
                            <br />
                            <div className="w3-container w3-padding-large">
                                <button onClick={() => document.getElementById('mapModal').style.display = 'block'} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>Add Map</button>

                            </div>
                        </div><br />

                        <div className='w3-white w3-text-grey w3-card-4 '>
                            <div className='w3-container w3-padding-large'>
                                <h2>Map List</h2>
                            </div>

                            <br/>
                                <div className="w3-card-2 w3-margin-bottom">
                                    <table className="w3-table w3-bordered w3-hoverable w3-small" name="tblSched">
                                        <thead>
                                            <tr>
                                                <th>Map Name</th>
                                                {/* <th>Section</th> */}
                                                <th>Map location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                maps.map((i, k) => {

                                                    return (
                                                        <tr>

                                                            <td>{i.name}</td>
                                                            {/* <td>{i.name}</td> */}
                                                            <td className='d-flex align-items-center'>
                                                                <button onClick={() => {
                                                                    document.getElementById('id04').style.display = 'block'
                                                                    setMapImage(i.image)

                                                                }} class="w3-button w3-teal w3-round-large " style={{ width: "30%" }}><i class="fa fa-globe" aria-hidden="true"></i></button>

                                                                <button 
                                                                    onClick={() => {

                                                                        document.getElementById('mapModal').style.display = 'block'
                                                                        setMapGcode(i.gcode)
                                                                        setMapName(i.name)
                                                                        setMapSecCode(i.secCode)
                                                                        setFileMap(i.image)
                                                                        setMapUpdaate(true)

                                                                    }}
                                                                    className='w3-button' style={{marginLeft: "15px"}}>
                                                                    Edit
                                                                </button>

                                                                <button
                                                                    onClick={() => {
                                                                        document.getElementById('id005').style.display = 'block'
                                                                      
                                                                        setMapGcode(i.gcode)
                                                                        setMapName(i.name)
                                                                        setMapSecCode(i.secCode)
                                                                        setFileMap(i.image)
                                                                        setMapUpdaate(true)
                                                                           

                                                                        

                                                                    }}
                                                                    className='w3-button' style={{ marginLeft: "15px" }}>
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            
                        </div>

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
                                    {
                                        announcementList.map((i, k) => {

                                        

                                            return (
                                                <Carousel.Item>

                                                    <div className='d-flex justify-content-center' style={{paddingBottom:"20px"}}>
                                                        <div onClick={(e) => {
                                                            document.getElementById('id01').style.display = 'block'
                                                            setAnnouncementUpdate(true)
                                                            setAnnouncement({
                                                                ...announcement,
                                                                desc: i.announcement,
                                                                id: i._id
                                                            })
                                                        }}>
                                                            <i class="bi bi-pencil-square"></i>   
                                                            <span>Edit</span>
                                                        </div>

                                                        <div onClick={(e) => {
                                                            
                                                            setAnnouncement({
                                                                ...announcement,
                                                                desc: i.announcement,
                                                                id: i._id
                                                            })

                                                            removeAnnouncementApi(i._id)   
                                                            // setTimeout(() => {
                                                            //     
                                                            //     removeAnnouncementApi()   
                                                            // },1000)
                                                        }} 
                                                        style={{ marginLeft: "20px" }}>
                                                            <i class="bi bi-trash-fill" ></i>
                                                            <spaan>Delete</spaan>
                                                       </div>
                                                    </div>
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

                            <div className='w3-row w3-center'>
                                <div class="w3-padding-small">
                                    <button onClick={() => document.getElementById('id01').style.display = 'block'} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>New Announcement</button>
                                </div>

                                {/* <div class="w3-half w3-padding-small">
                                    <button onClick={() => document.getElementById('id02').style.display = 'block'} class="w3-button w3-teal w3-round-large " style={{ width: "95%" }}>Manage Announcement</button>
                                </div> */}

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
                                    <div class="w3-full w3-padding-small">
                                        <button onClick={() => setShowCreate(true)} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>Create Student Account</button>
                                    </div>

                                    <div class="col-xl-12 w3-padding-small">
                                        <h4>
                                            Import Student List
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
                            <br />
                            <div className='w3-container w3-card w3-margin-bottom'>
                                <div className='w3-row w3-center w3-margin-bottom'>
                                    <h3>Teacher</h3>
                                    <div class="w3-padding-small">
                                        <button onClick={() => {
                                            setShowAddTeacher(true)
                                        }}

                                            class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>New Teacher</button>
                                    </div>



                                </div>
                            </div>
                        </div>

                        {/*<!-- Gradring Schedule -->*/}
                        <div className='w3-container w3-card w3-white w3-margin-bottom'>
                            <h2 className="w3-text-grey w3-padding-16"><i
                                className="fa fa-calendar fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Grades
                            </h2>

                            <h3>Grading Schedule Management</h3>
                            {/* <button onClick={() => importExcel()} class="w3-button w3-teal w3-round-large w3-margin-bottom" style={{ width: "100%" }}>Add Grading School Year</button> */}
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
                                                    <input
                                                        checked={grading.first}
                                                        onChange={(v) => {

                                                            setOpenGrading({
                                                                ...grading,
                                                                sy: moment().format('YYYY'),
                                                                first: grading.first ? false : true
                                                            })

                                                            openGrading(1, grading.first ? false : true)
                                                        }}
                                                        type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2nd Grading</td>
                                            <td>
                                                <label class="switch">
                                                    <input
                                                        checked={grading.second}
                                                        onChange={(v) => {

                                                            setOpenGrading({
                                                                ...grading,
                                                                sy: moment().format('YYYY'),
                                                                second: grading.second ? false : true
                                                            })
                                                            openGrading(2, grading.second ? false : true)
                                                        }}
                                                        type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3rd Grading</td>
                                            <td>
                                                <label class="switch">
                                                    <input
                                                        checked={grading.third}
                                                        onChange={(v) => {

                                                            setOpenGrading({
                                                                ...grading,
                                                                sy: moment().format('YYYY'),
                                                                third: grading.third ? false : true
                                                            })

                                                            openGrading(3, grading.third ? false : true)
                                                        }}
                                                        type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4th Grading</td>
                                            <td>
                                                <label class="switch">
                                                    <input
                                                        checked={grading.fourth}
                                                        onChange={(v) => {

                                                            setOpenGrading({
                                                                ...grading,
                                                                sy: moment().format('YYYY'),
                                                                fourth: grading.fourth ? false : true
                                                            })
                                                            openGrading(4, grading.fourth ? false : true)
                                                        }}
                                                        type="checkbox"></input>
                                                    <span class="slider round"></span>
                                                </label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />

                            </div>

                        </div>

                        <div className='w3-container w3-card w3-white w3-margin-bottom'>
                            <h2 className="w3-text-grey w3-padding-16"><i
                                className="fa fa-calendar fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Schedule
                            </h2>


                            {/* <button onClick={() => importExcel()} class="w3-button w3-teal w3-round-large w3-margin-bottom" style={{ width: "100%" }}>Add Grading School Year</button> */}


                            <h3>Student Schedule Management</h3>
                            <div className='w3-container w3-card w3-margin-bottom'>
                                <div className='w3-row w3-center w3-margin-bottom'>
                                    <h3>Schedule</h3>

                                </div>

                                <section className="container">
                                    <Dropzone
                                        accept={{
                                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
                                        }}
                                        onDrop={(v) => fileSelect(v, "schedule")}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div className='dropzone' {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p>Drag 'n' drop excel file here, or click to select files</p>
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

                                                <div class="col-lg-12">
                                                    <button onClick={() => importExcel()} class="w3-button w3-teal w3-round-large " style={{ width: "100%" }}>Import</button>
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
                            <textarea
                                value={announcement.desc}
                                onChange={(e) => {
                                    setAnnouncement({
                                        ...announcement,
                                        desc: e.target.value
                                    })
                                }}
                                id="w3review" name="w3review" rows="4" cols="50" class="w3-input w3-border" style={{ width: "70%" }}></textarea>
                        </div>
                    </div>

                    {/* <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>Start Date : </h4>
                        </div>
                        <div className='w3-rest'>
                            <input
                                onChange={(e) => {

                                }}
                                class="w3-input w3-border" type="date" style={{ width: "70%" }} />
                        </div>
                    </div> */}

                    <div class="w3-container w3-light-grey w3-padding">
                        <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => document.getElementById('id01').style.display = 'none'} style={{ width: "15%" }} >Close</button>
                        <button class="w3-button w3-right w3-teal w3-border"
                            onClick={() => {

                              announcementUpdate ? updateAnnouncementApi() :  createAnnouncement()

                            }} style={{ width: "15%", marginRight: "5px" }} >Save</button>
                    </div>
                </div>
            </div>


            <div id="mapModal" class="w3-modal">
                <div class="w3-modal-content w3-card-4 w3-animate-zoom">
                    <header class="w3-container w3-teal">
                        <h2>New Map</h2>
                    </header>

                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>GCODE : </h4>
                        </div>
                        <div className='w3-rest'>
                            <input
                                value={mapGcode}
                                onChange={(e) => {
                                    setMapGcode(e.target.value)
                                }}
                                id="w3review" name="w3review" rows="4" cols="50" class="w3-input w3-border" style={{ width: "30%" }}></input>
                        </div>
                    </div>


                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>SEC CODE : </h4>
                        </div>
                        <div className='w3-rest'>
                            <input
                                value={mapSecCode}
                                onChange={(e) => {
                                    setMapSecCode(e.target.value)
                                }}
                                id="w3review" name="w3review" rows="4" cols="50" class="w3-input w3-border" style={{ width: "30%" }}></input>
                        </div>
                    </div>

                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4>MAP NAME : </h4>
                        </div>
                        <div className='w3-rest'>
                            <input
                                value={mapName}
                                onChange={(e) => {
                                    setMapName(e.target.value)
                                }}
                                id="w3review" name="w3review" rows="4" cols="50" class="w3-input w3-border" style={{ width: "30%" }}></input>
                        </div>
                    </div>

                    <div className='w3-row w3-margin-top w3-padding'>
                        <div className='w3-quarter'>
                            <h4> Add Image: </h4>
                        </div>
                        <div className='w3-rest'>
                            <Dropzone
                                accept={{
                                    'image/*': ['.png', '.gif', '.jpeg', '.jpg']

                                }}
                                onDrop={(v) => uploadMap(v)}>
                                {({ getRootProps, getInputProps }) => (
                                    <div className='dropzone' {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                )}
                            </Dropzone>
                        </div>

                        {
                            newMap != "" &&
                            <div className='col-lg-12 d-flex justify-content-center' style={{ marginTop: "20px" }}>

                                <i
                                    onClick={() => {
                                        setNewMap('')
                                    }}
                                    class="bi bi-trash" style={{ color: "red" }}></i>

                                <img
                                    style={{ height: "550px", width: "550px" }}
                                    src={newMap} alt="Red dot" />


                            </div>
                        }
                    </div>

                    <div class="w3-container w3-light-grey w3-padding">
                        <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => {
                                document.getElementById('mapModal').style.display = 'none'
                                setMapGcode('')
                                setMapName('')
                                setMapSecCode('')
                                setNewMap('')
                                setFileMap('')
                            }} style={{ width: "15%" }} >Close</button>
                        <button class="w3-button w3-right w3-teal w3-border"
                            onClick={() => {

                                // createAnnouncement()
                                saveMap()

                            }} style={{ width: "15%", marginRight: "5px" }} >Save</button>
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
                            onClick={() => document.getElementById('id02').style.display = 'none'} style={{ width: "15%", marginRight: "5px" }} >Save</button>
                    </div>
                </div>
            </div>


            <div id="id04" class="w3-modal">
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
                            onClick={() => {
                                document.getElementById('id04').style.display = 'none'
                                setMapUpdaate(false)

                            }} style={{ width: "15%" }} >Close</button>
                    </div>
                </div>
            </div>


            <div id="id005" class="w3-modal">
                <div class="w3-modal-content w3-card-4 w3-animate-zoom">
                    <header class="w3-container w3-teal">
                        <h2>Warning!</h2>
                    </header>

                    <div className='w3-row w3-margin-top w3-padding'>
                            Are you sure you want to proceed?
                    </div>

                    <div class="w3-container w3-light-grey w3-padding">

                        <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => {
                                document.getElementById('id005').style.display = 'none'


                            }} style={{ width: "15%" }} >Close</button>

                        <button class="w3-button w3-right w3-white w3-border"
                            onClick={() => {
                                document.getElementById('id005').style.display = 'none'
                                deleteMap()

                            }} style={{ width: "15%", marginRight:"20px" }} >Yes</button>
                    </div>
                </div>
            </div>

            {/*<!-- End Modal content -->*/}
        </div>

    )
}