import React, { useEffect, useState } from 'react'
import 'w3-css/4/w3pro.css';
import '../App.css';

//let slideIndex = 1;

export const StudentPage = (props) => {

    const [slideIndex, setSlideIndex] = useState(1)

    useEffect(() => {

        showDivs(slideIndex);

    }, [slideIndex])

    const plusDivs = (n) => {
        console.log(slideIndex);
        showDivs(slideIndex += n);

    }

    const showDivs = (n) => {

        var i;
        var x = document.getElementsByClassName("mySlides");
        if (n > x.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = x.length }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[slideIndex - 1].style.display = "block";
        setSlideIndex(n);
    }

    return (

        <div className="w3-light-grey">

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
                                    <h2>Student Name</h2>
                                </div>
                            </div>
                            <div className="w3-container">
                                <p><i className="fa fa-certificate fa-fw w3-margin-right w3-large w3-text-teal"></i>Grade / Section</p>
                                <p><i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>Home Address</p>
                                <p><i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>Email Address</p>
                                <p><i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>Contact Number</p>
                                <hr />

                                <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Subjects</b></p>

                                <div className="w3-card-2">
                                    <table className="w3-table w3-bordered" name="tblSched">
                                        <thead>
                                            <tr>
                                                <th>Time</th>
                                                <th>Subjects</th>
                                                <th>Teacher</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>7:30 - 8:30</td>
                                                <td>MAPEH</td>
                                                <td>M. CANETE</td>
                                            </tr>
                                            <tr>
                                                <td>8:30 - 9:30</td>
                                                <td>ENGLISH</td>
                                                <td>E. RAMOS</td>
                                            </tr>
                                            <tr>
                                                <td>10:00 - 11:00</td>
                                                <td>MATHEMATICS</td>
                                                <td>M. OCAMPO</td>
                                            </tr>
                                            <tr>
                                                <td>11:00 - 12:00</td>
                                                <td>AP / ESP</td>
                                                <td>R. DUAZO / J. CABUSAS</td>
                                            </tr>
                                            <tr>
                                                <td>1:00 - 2:00</td>
                                                <td>FILIPINO</td>
                                                <td>K. COSTELO</td>
                                            </tr>
                                            <tr>
                                                <td>2:00 - 3:00</td>
                                                <td>TLE</td>
                                                <td>G. DELA CRUZ</td>
                                            </tr>
                                            <tr>
                                                <td>3:30 - 4:30</td>
                                                <td>SCIENCE</td>
                                                <td>G. PERELLO</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <br />

                                <p className="w3-large w3-text-theme"><b><i
                                    className="fa fa-globe fa-fw w3-margin-right w3-text-teal"></i>School
                                    Map</b></p>
                                <p>English</p>
                                <div className="w3-light-grey w3-round-xlarge">
                                    <div className="w3-round-xlarge w3-teal" style={{ height: "24px", width: "100%" }}></div>
                                </div>
                                <p>Spanish</p>
                                <div className="w3-light-grey w3-round-xlarge">
                                    <div className="w3-round-xlarge w3-teal" style={{ height: "24px", width: "55%" }}></div>
                                </div>
                                <p>German</p>
                                <div className="w3-light-grey w3-round-xlarge">
                                    <div className="w3-round-xlarge w3-teal" style={{ height: "24px", width: "25%" }}></div>
                                </div>
                                <br />
                            </div>
                        </div><br />


                        {/*<!-- End Left Column -->*/}
                    </div>


                    {/*<!-- Right Column -->*/}
                    <div className="w3-twothird">

                        <div className="w3-container w3-card w3-white w3-margin-bottom">
                            <h2 className="w3-text-grey w3-padding-16"><i
                                className="fa fa-bullhorn fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Announcement</h2>

                            <div className="w3-content w3-display-container">

                                <div className="w3-panel w3-leftbar w3-light-grey w3-padding-64 mySlides" style={{ width: "100%" }}>
                                    <p className="w3-xlarge w3-serif" style={{ paddingLeft: "5%" }}><i>"Make it as simple as possible, but not
                                        simpler. 1"</i></p>
                                </div>

                                <div className="w3-panel w3-leftbar w3-light-grey w3-padding-64 mySlides">
                                    <p className="w3-xlarge w3-serif" style={{ paddingLeft: "5%" }}><i>"Make it as simple as possible, but not
                                        simpler. 2"</i></p>
                                </div>

                                <div className="w3-panel w3-leftbar w3-light-grey w3-padding-64 mySlides">
                                    <p className="w3-xlarge w3-serif" style={{ paddingLeft: "5%" }}><i>"Make it as simple as possible, but not
                                        simpler. 3"</i></p>
                                </div>

                                <button className="w3-button w3-black w3-display-left" onClick={() => plusDivs(-1)}>&#10094;</button>
                                <button className="w3-button w3-black w3-display-right" onClick={() => plusDivs(1)}>&#10095;</button>
                            </div>
                        </div>

                        <div className="w3-container w3-card w3-white">
                            <h2 className="w3-text-grey w3-padding-16"><i
                                className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Grades</h2>
                            <div className="w3-container">
                                <div className="w3-card-2">
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
                            <br/>
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