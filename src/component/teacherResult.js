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
import { Typography } from '@mui/material';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const initialFormState = {
  // Define initial form state with empty values for each input field
  inputValues: {},
};

export default function TeacherResult({teacherData}) {
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
  const [formState, setFormState] = useState(initialFormState); // Initialize state

  const handleInputChange = (event, fieldName) => {
    // Update form state when input values change
    const { name, value } = event.target;
    setFormState({
      ...formState,
      inputValues: {
        ...formState.inputValues,
        [fieldName]: value,
      },
    });
  };

  const submitResultData=async(data)=>{
    try {
        const response = await fetch(`https://victors-backend.vercel.app/results/examination-results`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response)
        if (response.status === 201) {
            console.log('Data saved successfully');
            alert('Data Saved Successfully')
        } else {
            console.error('Something went wrong');
            alert('Something went wrong')
        }
    } catch (error) {
        console.error('Error registering user:', error.message);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Log form values when the button is clicked
    
    const data = formState.inputValues;
    console.log(data, formState.inputValues, typeof(data))
    var studentData1 = [];
    for (var x = 0; x < studentData.length; x++) {
      var studentData2 = [];
      for (let [key, value] of Object.entries(data)) { // Corrected iteration over object entries
        if (studentData[x].roll === key.substring(0, key.length - 2)) {
          if (key.substring(key.length - 2, key.length) === "+1") {
            studentData2.push({ subjectName: "Math", marks: value });
          } else if (key.substring(key.length - 2, key.length) === "+2") {
            studentData2.push({ subjectName: "Science", marks: value });
          } else if (key.substring(key.length - 2, key.length) === "+3") {
            studentData2.push({ subjectName: "English", marks: value });
          } else if (key.substring(key.length - 2, key.length) === "+4") {
            studentData2.push({ subjectName: "SST", marks: value });
          }
        }
      }
      var rows = { rollNumber: studentData[x].roll, subjects: studentData2 };
      studentData1.push(rows);
    }
    var req = { class: teacherClass, examinationId: data.examid, students: studentData1 };
    console.log(req, "jbjk");
    console.log(formState.inputValues);
    submitResultData(req)
  };

  var rows=[];
  if(studentData){
  for (var x=0;x<studentData.length;x++){
    rows.push({'name':studentData[x].roll})
  }
  }
  console.log(rows)


  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",zIndex:0}}>
    <Typography variant="h3">Upload Class results</Typography>
    <form onSubmit={handleSubmit} > 
    <div style={{display:'flex',alignItems:'center'}}>
      <h4>Exam id:-</h4>
      <input style={{width:"40px",height:'20px'}} type="text" id={`examid`} name={`examid`} onChange={(event) => handleInputChange(event, `examid`)}/>
    </div>
      <TableContainer  style={{marginLeft:"0",width:"80vw",border:"1px black solid",zIndex:0}} sx={{ maxHeight: 440 }}>
        <Table aria-label="customized table" style={{marginTop:"0"}} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Name</StyledTableCell>
              <StyledTableCell align="center">Math</StyledTableCell>
              <StyledTableCell align="center">Science</StyledTableCell>
              <StyledTableCell align="center">English</StyledTableCell>
              <StyledTableCell align="center">SST</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row" align='center' style={{border:"0px"}}> 
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center" style={{border:"0px"}}>
                  <input
                    style={{width:"40px"}}
                    type="text"
                    id={`${row.name}+1`}
                    name={`${row.name}+1`}
                    onChange={(event) => handleInputChange(event, `${row.name}+1`)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center" style={{border:"0px"}}>
                  <input
                    style={{width:"40px"}}
                    type="text"
                    id={`${row.name}+2`}
                    name={`${row.name}+2`}
                    onChange={(event) => handleInputChange(event, `${row.name}+2`)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center" style={{border:"0px"}}>
                  <input
                    type="text"
                    style={{width:"40px"}}
                    id={`${row.name}+3`}
                    name={`${row.name}+3`}
                    onChange={(event) => handleInputChange(event, `${row.name}+3`)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center" style={{border:"0px"}}>
                  <input
                    type="text"
                    style={{width:"40px"}}
                    id={`${row.name}+4`}
                    name={`${row.name}+4`}
                    onChange={(event) => handleInputChange(event, `${row.name}+4`)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" type="submit" >Submit</Button>{/* Add submit button */}
    </form>
    </div>
  );
}
