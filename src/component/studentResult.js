import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState,useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const rows = [
    {'name':"Exam 1",'math':20,'science':20,'english':20,'sst':20},
    {'name':"Exam 2",'math':20,'science':20,'english':20,'sst':20},
    {'name':"Exam 3",'math':20,'science':20,'english':20,'sst':20}
];

export default function StudentResult({studentData}) {
  console.log(studentData)
    const [results, setResults] = useState({});
    const [rows2,setRows2]=useState();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://victors-backend.vercel.app/results/examination-results/class/${studentData.class}/students/${studentData.name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setResults(data);
        const rows1=[];
        
        for (var x=0;x<data.length;x++){
            console.log(x)
            rows1.push({'name':data[x].examinationId,'math':data[x].studentResult.subjects[0].marks,'science':data[x].studentResult.subjects[1].marks,'english':data[x].studentResult.subjects[2].marks,'sst':20})
        }
        setRows2(rows1)
        console.log(rows1)
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchResults();
  }, [studentData]);
  console.log(results,rows2,"yes")
  if (!studentData || !rows2) {
    // Render a loading message or component when studentData is not available
    return <CircularProgress/>;
}
  return (
    <TableContainer style={{width:"80vw", marginTop:"-20vh"}}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{border:"1px black solid",fontWeight:"900"}}>Exam Id</TableCell>
            <TableCell align="right" style={{border:"1px black solid",fontWeight:"900"}}>Math</TableCell>
            <TableCell align="right" style={{border:"1px black solid",fontWeight:"900"}}>Science</TableCell>
            <TableCell align="right" style={{border:"1px black solid",fontWeight:"900"}}>English</TableCell>
            <TableCell align="right" style={{border:"1px black solid",fontWeight:"900"}}>SST</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <TableRow
              key={row.name}
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{border:"1px black solid"}}>
                {row.name}
              </TableCell>
              <TableCell align="right" style={{border:"1px black solid"}}>{row.math}</TableCell>
              <TableCell align="right" style={{border:"1px black solid"}}>{row.science}</TableCell>
              <TableCell align="right" style={{border:"1px black solid"}}>{row.english}</TableCell>
              <TableCell align="right" style={{border:"1px black solid"}}>{row.sst}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}