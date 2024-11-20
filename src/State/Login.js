// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import StudentList from '../Components/StudentList';

// const StudentAPI = () => {
//     const [loading, setLoading] = useState(true);
//     const [students, setStudents] = useState([]);
//     const [error, setError] = useState('');
    
//     useEffect(() => {
//       console.log('Fetching student data...');
//       const fetchStudents = async () => {
//         try {
//           const response = await axios.get(
//             'https://appsail-10091564320.development.catalystappsail.com/api/getStudents'
//           );
//           setStudents(response.data.users);
//         } catch (err) {
//           setError('Error fetching student data');
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchStudents();
//     }, []);
    
//     // if (loading) {
//     //   return <div className="loading-spinner">Loading...</div>;
//     // }

//   return <StudentList students={students} />; 
// };

// export default StudentAPI;
