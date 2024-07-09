import { CircularProgress } from '@mui/material';
import React from 'react';

function StudentDashboard({ studentData }) {
    if (!studentData) {
        // Render a loading message or component when studentData is not available
        return (<CircularProgress/>);
    }

    return (
        <div class="info" style={{ width: "30vw", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "-30vh" }}>
            <div>
                <img src="../static/profile_photo.png" id="dashboard_photo" />
            </div>

            <table style={{ width: "150%" }} className='dashboard_table'>
                <tbody>
                    <tr>
                        <td><strong>Name</strong></td>
                        <td>{studentData.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Email</strong></td>
                        <td>{studentData.email}</td>
                    </tr>
                    <tr>
                        <td><strong>Class</strong></td>
                        <td>{studentData.class}</td>
                    </tr>
                    <tr>
                        <td><strong>Mobile No.</strong></td>
                        <td>{studentData.mobile}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default StudentDashboard;
