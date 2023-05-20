import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { url } from '../Utils/url';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../redux/actionType';
import { Button } from 'react-bootstrap';
import { ForgotModal, UpdatePassModal } from '../Components/Modal';
//let slideIndex = 1;

    export const StudentPage = (props) => {
        const [announcementList, setAnnouncementList] = useState([])
        const user = useSelector(state => state.user.user)
        const [currentRecord, setCurrentRecord] = useState('')
        const [sched, setSched] = useState([])
        const [grade, setGrade] = useState([])
        const [maps, setMaps] = useState([])
        const [mapImage, setMapImage] = useState('')
        const [showForgot, setForgot] = useState(false)
        const [mapSize, setMapSize] = useState({
            height: 500,
            width: 500
        })
    // const [slideIndex, setSlideIndex] = useState(1)

        const navigate = useNavigate()
        const dispatch = useDispatch()

        console.log(currentRecord)

    useEffect(() => {
        getRecord()
        getAnnouncement()
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


    useEffect(() => {
        
        if (currentRecord != "") {
            getSched()
            getGrade()
        }
    }, [currentRecord])

        const getAnnouncement = () => {
            axios.post(url + 'getannouncement', null, null).then(res => {
                // 


                // document.getElementById('id01').style.display = 'none'

                setAnnouncementList(res.data.result)

            }).catch(err => {

            })


        }

    const getRecord = () => {
        
        axios.post(url + "getstudentrecord", null, {
            params: {
                sy: moment().format('YYYY'),
                LRNNum: user.LRNNum

            }
        }).then(res => {
            
            console.log('get record', res)
      
            

            setCurrentRecord(res.data.user)



           
        }).catch(err => {
            
        })
        
    }

    const getSched = () => {
        

        axios.post(url + "getstudentschedule", null, {
            params: {
                sy: moment().format('YYYY'),
                gcode: currentRecord.gradeCode,
                seccode:currentRecord.secCode

            }
        }).then(res => {

            // 

            let v = res.data.sched
            if(v.length != 0){
              let result = v.sort((a, b) => {
                    return a.order - b.order;
                });
                setSched(result)

            }
         




        }).catch(err => {

        })
    }

        const getGrade = () => {

            axios.post(url + "getstudentgrade", null, {
                params: {
                    sy: moment().format('YYYY'),
                    LRNNumber: user.LRNNum,
                    gcode: currentRecord.gradeCode,
                    seccode: currentRecord.secCode


                }
            }).then(res => {

                



                // setCurrentRecord(res.data.user)

                setGrade(res.data.grade)




            }).catch(err => {

            })

        }


        const getFinalGrade = (i) => {


            if(i.fourth != "" && i.first != "" && i.second != "" && i.third != ""){

                let first = parseInt(i.first)
                let second = parseInt(i.second)
                let third = parseInt(i.third)
                let fourth = parseInt(i.fourth)


                let finalGrade = (first + second + third + fourth) / 4


                return finalGrade

            }
            else{
                return 
            }
        }

    return (

        <div className="w3-light-grey">

            <UpdatePassModal
                teacher={false}
                onClose={() => setForgot(false)}
                show={showForgot}
                success={() => {
                    console.log('not called?')
                    setForgot(false)
                }}
            />

            {/* <!-- Navbar (sit on top) --> */}
            <div className="w3-top">
                <div className="w3-white w3-padding w3-card" style={{ letterSpacing: "4px" }}>
                    <img style={{ height: "55px", width: "55px" }} src={require('../Utils/img/TMCNHS LOGO.png')} />
                    <a href="#home" className="w3-bar-item w3-button">Trece Martires National Highschool</a>
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
                            <br/>
                            <div className="w3-container">
                                <p><i className="fa fa-certificate fa-fw w3-margin-right w3-large w3-text-teal"></i>ID No: {user.id}</p>
                                <p><i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>Home Address: {user.address}</p>
                                <p><i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>Email Address: {user.schoolEmail}</p>
                                <p><i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>Contact Number: {user.contact_no}</p>

                                <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Subjects</b></p>

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
                                            sched.map((i, k) => {

                                                return(
                                                    <tr>
                                                        <td>{i.time}</td>
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
                                <br />
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
                            <h2 className="w3-text-grey w3-padding-16"><i
                                className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Grades</h2>
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
                                           {
                                                grade.map((i, k) => {

                                                    return(
                                                        <tr>
                                                            <td>{i.subject}</td>
                                                            <td>{i.first}</td>
                                                            <td>{i.second}</td>
                                                            <td>{i.third}</td>
                                                            <td>{i.fourth}</td>

                                                            <td>{getFinalGrade(i)}</td>
                                                        </tr>
                                                    )
                                                })
                                           }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br/>
                        </div>


                        {/*<!-- End Right Column -->*/}
                    </div>


                    {/*<!-- End Grid -->*/}
                </div>


                {/*<!-- End page content -->*/}
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


                        <div className='w3-rest w3-center' style={{overflow:"scroll"}}>
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
        </div>

    )
}