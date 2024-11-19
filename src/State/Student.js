import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 5;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          'https://appsail-10091564320.development.catalystappsail.com/api/getStudents'
        );
        setStudents(response.data.users);
      } catch (err) {
        setError('Error fetching student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); 
  };
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const currentStudents = filteredStudents.slice(
    currentPage * studentsPerPage,
    (currentPage + 1) * studentsPerPage
  );

 
  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

 
  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    console.log('Edit student:', studentToEdit);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student List</h2>

      {/* Search Bar */}
      <div className="row justify-content-center mb-3">
        <div className="col-12 col-md-8 col-lg-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Responsive Table */}
      <div className="table-responsive">
        <table className="table  table-hover">
          <thead className="table">
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.username}</td>
                  <td>{student.email}</td>
                  <td>{"18-11-2000"}</td> {/* Replace with dynamic DOB */}
                  <td>{student.phone}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(student.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
