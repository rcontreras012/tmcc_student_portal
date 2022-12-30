import React from 'react'
import 'w3-css/4/w3pro.css'

export const StudentPage = (props) => {

    return (
        <div>
            Ayaw
            <div class="w3-top">
                <div class="w3-bar w3-white w3-padding w3-card">
                    <a href="#home" class="w3-bar-item w3-button">Trece Martires National Highschool</a>

                    <div class="w3-right w3-hide-small">
                        <a href="#contact" class="w3-bar-item w3-button">Contact Us</a>
                    </div>
                </div>
            </div>

            <div className="w3-content w3-margin-top w3-padding-top-32">


                <div className='w3-row-padding'>

                    <div className='w3-third'>

                        <div class="w3-white w3-text-grey w3-card-4">
                            <div class="w3-display-container">
                                <img src="https://www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg" alt="Avatar"
                                    style={{ width: "100%" }} />

                                <div class="w3-display-bottomleft w3-container w3-text-black">
                                    <h2>Student Name</h2>
                                </div>
                            </div>
                            <div class="w3-container">
                                <p><i class="fa fa-certificate fa-fw w3-margin-right w3-large w3-text-teal"></i>Grade / Section</p>
                                <p><i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>Home Address</p>
                                <p><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>Email Address</p>
                                <p><i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>Contact Number</p>


                                <p class="w3-large"><b><i class="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Subjects</b></p>

                                <div class="w3-card-2">
                                    <table class="w3-table w3-bordered" name="tblSched">
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


                                <p class="w3-large w3-text-theme"><b><i
                                    class="fa fa-globe fa-fw w3-margin-right w3-text-teal"></i>School
                                    Map</b></p>
                                <p>English</p>
                                <div class="w3-light-grey w3-round-xlarge">
                                    <div class="w3-round-xlarge w3-teal"
                                        style={{ height: "24px", width: "100%" }}></div>
                                </div>
                                <p>Spanish</p>
                                <div class="w3-light-grey w3-round-xlarge">
                                    <div class="w3-round-xlarge w3-teal"
                                        style={{ height: "24px", width: "55%" }}></div>
                                </div>
                                <p>German</p>
                                <div class="w3-light-grey w3-round-xlarge">
                                    <div class="w3-round-xlarge w3-teal" style={{ height: "24px", width: "25%" }}></div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </div>

    )
}