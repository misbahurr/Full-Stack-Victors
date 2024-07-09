import React, { useState,useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { CircularProgress } from '@mui/material';
function TeacherZone({ children }) {
    const [teacherData,setTeacherData]=useState()
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        console.log("in")
        const getTeacherData = async () => {
            try {
                const response = await fetch(`https://victors-backend.vercel.app/user/users/id/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log(data)
                setTeacherData(data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        getTeacherData();
    }, [id]);
    const [navOpen, setNavOpen] = useState(false);
    const [dropdownStates, setDropdownStates] = useState([]);
    const openNav = () => {
        setNavOpen(true);
    };
    const closeNav = () => {
        setNavOpen(false);
    };

    const toggleDropdown = (e) => {
        e.target.classList.toggle("active");
        const dropdownContent = e.target.nextElementSibling;
        console.log(dropdownContent, e.target, "19")
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    };

    const dropDownSign = (index) => {
        const newDropdownStates = [...dropdownStates];
        newDropdownStates[index] = !newDropdownStates[index];
        setDropdownStates(newDropdownStates);
    }

    if(!teacherData){
        <div>
            <div className="Navbar">
                <img src="../../static/logo.jpeg" id="logo" alt="logo" />
                <p id="username">Username</p>
                <div><a href="../../main"><LogoutIcon id="logout" /></a></div>
            </div>

            <div id="mySidenav" className={`sidenav ${navOpen ? 'open' : ''}`}>
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <img src="../../static/profile_photo.png" id="profile_photo" alt="profile_photo" />
                <a href={`../../teacherDashboard/${id}`}>Dashboard</a>
                <a href={`../../teacherAttendance/${id}`}>Attendance</a>
                {teacherData &&<a href={`../../teacherSchedule/${id}/${teacherData.class}`}>Time Table</a>}
                <a href={`../../teacherResult/${id}`}>Examination Results</a>

                <button className="dropdown-btn" onClick={(e) => { toggleDropdown(e); dropDownSign(0); }} id="dropdown">Study Resources
                    {dropdownStates[0] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </button>
                <div className="dropdown-container">
                    <button className="dropdown-btn" onClick={(e) => { toggleDropdown(e); dropDownSign(1); }} id="dropdown">Class 6
                    {dropdownStates[1] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </button>
                    <div className="dropdown-container">
                        <a href={`../../teacherResources/${id}/class6`}>Subject Wise Study Material</a>
                        <a href="#">Test Papers</a>
                    </div>
                    <button className="dropdown-btn " id="dropdown" onClick={(e) => { toggleDropdown(e); dropDownSign(2); }}>Class 7
                        {dropdownStates[2] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </button>
                    <div className="dropdown-container">
                        <a href={`../../teacherResources/${id}/class7`}>Subject Wise Study Material</a>
                        <a href="#">Test Papers</a>

                    </div>
                    <button className="dropdown-btn " id="dropdown" onClick={(e) => { toggleDropdown(e); dropDownSign(3); }}>Class 8
                        {dropdownStates[3] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </button>
                    <div className="dropdown-container">
                        <a href={`../../teacherResources/${id}/class8`}>Subject Wise Study Material</a>
                        <a href="#">Test Papers</a>

                    </div>
                    <button className="dropdown-btn " id="dropdown" onClick={(e) => { toggleDropdown(e); dropDownSign(4); }}>Class 9
                        {dropdownStates[4] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </button>
                    <div className="dropdown-container">
                        <a href={`../../teacherResources/${id}/class9`}>Subject Wise Study Material</a>
                        <a href="#">Test Papers</a>

                    </div>
                    <button className="dropdown-btn " id="dropdown" onClick={(e) => { toggleDropdown(e); dropDownSign(5); }}>Class 10
                        {dropdownStates[5] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </button>
                    <div className="dropdown-container">
                        <a href={`../../teacherResources/${id}/class10`}>Subject Wise Study Material</a>
                        <a href="#">Test Papers</a>

                    </div>



                </div>
            </div>

            <div id="main">
                <span className="open" onClick={openNav}>&#9776;</span>
                <span id="title"></span>
            </div>
            <div style={{display:'flex',justifyContent:"center",alignItems:'center',height:"100vh",backgroundImage:'url("../../static/back6.jpg")',backgroundSize:'cover'}}>
                <CircularProgress/>
            </div>
        </div>
    }

    return (
        <div>
            <div className="Navbar">
                <img src="../../static/logo.jpeg" id="logo" alt="logo" />
                <p id="username">Username</p>
                <div><a href="../../main"><LogoutIcon id="logout" /></a></div>
            </div>

            <div id="mySidenav" className={`sidenav ${navOpen ? 'open' : ''}`}>
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <img src="../../static/profile_photo.png" id="profile_photo" alt="profile_photo" />
                <a href={`../../teacherDashboard/${id}`}>Dashboard</a>
                <a href={`../../teacherAttendance/${id}`}>Attendance</a>
                {teacherData &&<a href={`../../teacherSchedule/${id}/${teacherData.class}`}>Time Table</a>}
                <a href={`../../teacherResult/${id}`}>Examination Results</a>

                <button className="dropdown-btn" onClick={(e) => { toggleDropdown(e); dropDownSign(0); }} id="dropdown">Study Resources
                    {dropdownStates[0] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </button>
                <div className="dropdown-container">
                    <button className="dropdown-btn" onClick={(e) => { toggleDropdown(e); dropDownSign(1); }} id="dropdown">Class 6
                    {dropdownStates[1] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </button>
                    <div className="dropdown-container">
                        <a href={`../../teacherResources/${id}/class6`}>Subject Wise Study Material</a>
                        <a href="#">Test Papers</a>
                    </div>
                    <button className="dropdown-btn " id="dropdown" onClick={(e) => { toggleDropdown(e); dropDownSign(2); }}>Class 7
                        {dropdownStates[2] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </button>
                    <div className="dropdown-container">
                        <a href={`../../teacherResources/${id}/class7`}>Subject Wise Study Material</a>
                        <a href="#">Test Papers</a>

                    </div>
                    <button className="dropdown-btn " id="dropdown" onClick={(e) => { toggleDropdown(e); dropDownSign(3); }}>Class 8
                        {dropdownStates[3] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </button>
                    <div className="dropdown-container">
                        <a href={`../../teacherResources/${id}/class8`}>Subject Wise Study Material</a>
                        <a href="#">Test Papers</a>

                    </div>
                    <button className="dropdown-btn " id="dropdown" onClick={(e) => { toggleDropdown(e); dropDownSign(4); }}>Class 9
                        {dropdownStates[4] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </button>
                    <div className="dropdown-container">
                        <a href={`../../teacherResources/${id}/class9`}>Subject Wise Study Material</a>
                        <a href="#">Test Papers</a>

                    </div>
                    <button className="dropdown-btn " id="dropdown" onClick={(e) => { toggleDropdown(e); dropDownSign(5); }}>Class 10
                        {dropdownStates[5] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </button>
                    <div className="dropdown-container">
                        <a href={`../../teacherResources/${id}/class10`}>Subject Wise Study Material</a>
                        <a href="#">Test Papers</a>

                    </div>



                </div>
            </div>

            <div id="main">
                <span className="open" onClick={openNav}>&#9776;</span>
                <span id="title"></span>
            </div>
            <div style={{display:'flex',justifyContent:"center",alignItems:'center',height:"100vh",backgroundImage:'url("../../static/back6.jpg")',backgroundSize:'cover'}}>
                {React.Children.map(children, child => {
                    return React.cloneElement(child, { teacherData });
                })}
            </div>
        </div>
    );
}

export default TeacherZone;
