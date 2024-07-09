import { ButtonGroup, Button, Typography, CircularProgress } from '@mui/material';
import { useState,useEffect } from 'react';

export default function TeacherAttendance({teacherData}) {
    console.log(teacherData)
    const [studentData,setStudentData]=useState()
    var teacherClass=''
    if(teacherData){
     teacherClass= teacherData.class;
    console.log(teacherClass)
    }
    useEffect(() => {
        console.log("in")
        const getTeacherData = async () => {
            try {
                const response = await fetch(`https://victors-backend.vercel.app/user/users/class/${teacherClass}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log(data)
                var required_data=[]
                for (var x=0;x<data.length;x++){
                    required_data.push({'roll': data[x].name})
                }
                setStudentData(required_data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        getTeacherData();
    }, [teacherClass]);
    console.log(studentData)
    
    const [activeButtons, setActiveButtons] = useState([]);
    const currentDate = new Date().toLocaleDateString();
    // const rows = [{ 'roll': 101 }, { 'roll': 102 }, { 'roll': 103 }, { 'roll': 104 }, { 'roll': 105 }, { 'roll': 106 }, { 'roll': 107 }, { 'roll': 108 }, { 'roll': 109 }, { 'roll': 1010 }];

    const handleButtonClick = (buttonName) => {
        if (activeButtons.includes(buttonName)) {
            setActiveButtons(activeButtons.filter(btn => btn !== buttonName));
        } else {
            setActiveButtons([...activeButtons, buttonName]);
        }
    };

    const isButtonActive = (buttonName) => {
        return activeButtons.includes(buttonName);
    };
    console.log(activeButtons)

    const submitAttendanceData=async()=>{
        var req=[]
        for (var x=0; x<studentData.length;x++){
            var val=false;
            if (activeButtons.find(button => button === studentData[x].roll)) { // Corrected condition
                val = true;
            }
            req.push({username:studentData[x].roll,present:val})
        }
        console.log(req)
        try {
            const response = await fetch(`https://victors-backend.vercel.app/attendance/attendance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({class:teacherClass,date:currentDate,attendance:req})
            });
            console.log(response)
            if (response.status === 201) {
                console.log('Data saved successfully');
                alert('Data saved Successfully')
            } else if(response.status===409){
                alert('Attendance for this date is already marked')
            }
            else {
                console.error('Something went wrong');
            }
        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    }

    // Divide rows into chunks of 5
    const chunkedRows = [];
    if(studentData){
    for (let i = 0; i < studentData.length; i += 6) {
        chunkedRows.push(studentData.slice(i, i + 6));
    }}
    if(!studentData){
        return <CircularProgress/>
    }

    return (
        <div style={{display:"flex",flexDirection:"column"}}>
            <Typography variant='h4'>Mark Attendance of the {currentDate}</Typography>
            {chunkedRows.map((chunk, index) => (
                <ButtonGroup key={index} variant="outlined" aria-label="Basic button group">
                    {chunk.map((row, rowIndex) => (
                        <Button
                            key={rowIndex}
                            style={{ backgroundColor: isButtonActive(row.roll.toString()) ? 'green' : 'transparent', color: isButtonActive(row.roll.toString()) ? 'white' : 'black', fontSize:"20px", width:"200px"}}
                            onClick={() => handleButtonClick(row.roll.toString())}
                            
                        >
                            {row.roll}
                        </Button>
                    ))}
                </ButtonGroup>
            ))}
            <Button variant='contained' style={{width:'100px'}} onClick={submitAttendanceData}> Submit</Button>
        </div>
    );
}
