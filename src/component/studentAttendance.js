import * as React from 'react';
import { useState,useEffect } from 'react'; // Import useState hook
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { CircularProgress, Typography } from '@mui/material';
import Button from '@mui/material/Button';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const initialFormState = {
  // Define initial form state with empty values for each input field
  inputValues: {},
};

export default function StudentAttendance({studentData}) {
    console.log(studentData)
    const [studentattendanceData,setStudentAttendanceData]=useState()
    var studentClass=''
    var name=''
    if(studentData){
     studentClass= studentData.class;
     name=studentData.name;
    console.log(studentClass,name)
    }
    useEffect(() => {
        console.log("in")
        const getData = async () => {
            try {
                const response = await fetch(`https://victors-backend.vercel.app/attendance/userattendance/${studentClass}/${name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log(data)
                // setStudentAttendanceData(data)
                var required_data=[]
                for (var x=0;x<data.length;x++){
                    required_data.push({'date': data[x].date,'status':data[x].userAttendance.present})
                }
                // setStudentData(required_data);
                setStudentAttendanceData(required_data)
            } catch (error) {
                console.error('Error fetching data:', error.message);
                alert("Something went wrong with server")
            }
        };
        getData();
    }, [studentClass]);
    // console.log(studentData)
    const rows=[{name:"One",status:true},{name:"One",status:true},{name:"One",status:true},{name:"One",status:true}]
    if(!studentattendanceData){
        return(<CircularProgress/>)
    }
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",zIndex:0}}>
    <Typography variant="h3">View Your Attendance</Typography>
      <TableContainer  style={{marginLeft:"0",width:"80vw",border:"1px black solid",zIndex:0}} sx={{ maxHeight: 440 }}>
        <Table aria-label="customized table" style={{marginTop:"0"}} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentattendanceData.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row" align='center' style={{border:"0px"}}> 
                  {row.date}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align='center' style={{border:"0px"}}> 
                    {row.status ? 'Present' : 'Absent'}
                </StyledTableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
