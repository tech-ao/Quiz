import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../redux/Action/StudentAction";
import { getTeachers } from "../../redux/Action/TeacherAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AssignStudent = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const teachers = useSelector((state) => state.teachers.Teachers);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const paginationDetail = {
      pageSize: 1000,
      pageNumber: 1,
    };
    dispatch(getStudents({ paginationDetail }));
    dispatch(getTeachers({ paginationDetail }));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const filteredStudents = Array.isArray(students.data?.searchAndListStudentResult)
    ? students.data.searchAndListStudentResult
    : [];

  const filteredTeachers = Array.isArray(teachers?.data?.searchAndListTeacherResult)
    ? teachers.data.searchAndListTeacherResult
    : [];

  const handleAssign = async () => {
    if (!selectedTeacher || selectedStudents.length === 0) {
      alert("Please select at least one student and a teacher.");
      return;
    }

    try {
      const requestBody = {
        teacherId: selectedTeacher.teacherId,
        studentIdList: selectedStudents.map((student) => student.studentId),
      };

      const response = await fetch("http://srimathicare.in:8081/api/Teacher/TeacherStudentAssociate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          AccessToken: "123",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to assign students");
      }

      toast.success("Students successfully assigned!");
      setSelectedStudents([]);
      setSelectedTeacher(null);
      onClose();
    } catch (error) {
      console.error("Error assigning students:", error);
      alert("Failed to assign students. Please try again.");
    }
  };

  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Assign Student to Teacher</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="mb-3 position-relative" ref={dropdownRef}>
          <label className="form-label">Students:</label>
          <button
            className="form-control text-start"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedStudents.length > 0
              ? selectedStudents.map((s) => s.firstName + " " + s.lastName).join(", ")
              : "Select Students"}
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu show w-100 p-2" style={{ maxHeight: "250px", overflowY: "auto" }}>
              {filteredStudents.map((student) => (
                <div key={student.studentId} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`student-${student.studentId}`}
                    checked={selectedStudents.some((s) => s.studentId === student.studentId)}
                    onChange={() =>
                      setSelectedStudents((prev) =>
                        prev.some((s) => s.studentId === student.studentId)
                          ? prev.filter((s) => s.studentId !== student.studentId)
                          : [...prev, student]
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor={`student-${student.studentId}`}>
                    {student.firstName} {student.lastName}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Teacher:</label>
          <select
            className="form-select"
            value={selectedTeacher?.teacherId || ""}
            onChange={(e) => {
              const teacher = filteredTeachers.find((t) => t.teacherId.toString() === e.target.value);
              setSelectedTeacher(teacher || null);
            }}
          >
            <option value="">Select Teacher</option>
            {filteredTeachers.map((teacher) => (
              <option key={teacher.teacherId} value={teacher.teacherId}>
                {teacher.fullName}
              </option>
            ))}
          </select>
        </div>

        <Button variant="success" className="w-100" onClick={handleAssign}>
          Assign
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AssignStudent;
