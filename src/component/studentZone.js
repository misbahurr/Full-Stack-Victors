import React, { useState,useEffect } from 'react';
// import './StudentZone.css'; // Import any CSS file if needed
import LogoutIcon from '@mui/icons-material/Logout';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';



function StudentZone({ children }) {
    const [studentData,setStudentData]=useState()
    const [studentClass,setStudentClass]=useState('');
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        console.log("in")
        const getStudentData = async () => {
            try {
                const response = await fetch(`https://victors-backend.vercel.app/user/users/id/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log(data)
                setStudentData(data);
                if(data.class==="Class 6") setStudentClass('class6')
                else if(data.class==="Class 7") setStudentClass('class7')
                else if(data.class==="Class 8") setStudentClass('class8')
                else if(data.class==="Class 9") setStudentClass('class9')
                else if(data.class==="Class 10") setStudentClass('class10')
                
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        getStudentData();
    }, [id]);
    const [navOpen, setNavOpen] = useState(false);
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

    if(!studentData){
        return(<div>
            <div className="Navbar">
                <img src="../../static/logo.jpeg" id="logo" alt="logo" />
                <p id="username">Username</p>
                <div><a href='../../main'><LogoutIcon id="logout" /></a></div>
            </div>

            <div id="mySidenav" className={`sidenav ${navOpen ? 'open' : ''}`}>
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <img src="../../static/profile_photo.png" id="profile_photo" alt="profile_photo" />
                <a href={`../../studentDashboard/${id}`}>Dashboard</a>
                <a href={`../../studentAttendance/${id}`}>Attendance</a>
                <a href={`../../studentResult/${id}`}>Examination Results</a>
                <a href={`../../studentFees/${id}`}>Fee Status/Dues</a>
                {studentClass &&<a href={`../../studentSchedule/${id}/${studentClass}`}>Time Table</a>}
                {studentClass &&<a href={`../../studentResources/${id}/${studentClass}`}>Study Resources</a>}
            </div>

            <div id="main">
                <span className="open" onClick={openNav}>&#9776;</span>
                <span id="title"></span>
            </div>
            <div style={{display:'flex',justifyContent:"center",alignItems:'center',height:"90vh",backgroundImage:'url("../../static/back6.jpg")',backgroundSize:'cover'}}>
                <CircularProgress/>
            </div>
        </div>)
    }

    return (
        <div>
            <div className="Navbar">
                <img src="../../static/logo.jpeg" id="logo" alt="logo" />
                <p id="username">Username</p>
                <div><a href='../../main'><LogoutIcon id="logout" /></a></div>
            </div>

            <div id="mySidenav" className={`sidenav ${navOpen ? 'open' : ''}`}>
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <img src="../../static/profile_photo.png" id="profile_photo" alt="profile_photo" />
                <a href={`../../studentDashboard/${id}`}>Dashboard</a>
                <a href={`../../studentAttendance/${id}`}>Attendance</a>
                <a href={`../../studentResult/${id}`}>Examination Results</a>
                <a href={`../../studentFees/${id}`}>Fee Status/Dues</a>
                {studentClass &&<a href={`../../studentSchedule/${id}/${studentClass}`}>Time Table</a>}
                {studentClass &&<a href={`../../studentResources/${id}/${studentClass}`}>Study Resources</a>}
            </div>

            <div id="main">
                <span className="open" onClick={openNav}>&#9776;</span>
                <span id="title"></span>
            </div>
            <div style={{display:'flex',justifyContent:"center",alignItems:'center',height:"90vh",backgroundImage:'url("../../static/back6.jpg")',backgroundSize:'cover'}}>
                {React.Children.map(children, child => {
                    return React.cloneElement(child, { studentData });
                })}
            </div>
        </div>
    );
}

export default StudentZone;
