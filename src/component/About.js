import React, { useState, useEffect } from 'react';

function About() {
  const [results, setResults] = useState([]);
  const [className, setClassName] = useState('Class 10');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://victors-backend.vercel.app/results/examination-results/class/${className}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (className) {
      fetchResults();
    }
  }, [className]);

  return (
    <div>
      <h2>Examination Results for Class: {className}</h2>
      
    </div>
  );
}

export default About;



// <table>
//         <thead>
//           <tr>
//             <th>Roll Number</th>
//             <th>Subject</th>
//             <th>Marks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.map((result, index) => (
//             <React.Fragment key={index}>
//               {result.students.map((student) => (
//                 <React.Fragment key={student.rollNumber}>
//                   {student.subjects.map((subject, index) => (
//                     <tr key={`${student.rollNumber}-${index}`}>
//                       <td>{student.rollNumber}</td>
//                       <td>{subject.subjectName}</td>
//                       <td>{subject.marks}</td>
//                     </tr>
//                   ))}
//                 </React.Fragment>
//               ))}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>