import BASE_URL from "./Config";

console.log(BASE_URL);

const COMMON_HEADERS = {
  Accept: "text/plain",
  "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
  AccessToken: "123",
  "Content-Type": "application/json",
};

const getHeaders = () => ({
  ...COMMON_HEADERS,
});

console.log(BASE_URL);

// STUDENT FUNCTIONS
export const fetchStudents = async (isCompetition ,paginationDetail) => {
  const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListStudent`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(isCompetition,paginationDetail),
  });
  if (!response.ok) throw new Error("Failed to fetch students");
  return await response.json();
};

export const fetchStudentEnrollmentRequest = async (paginationDetail) => {
  const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListStudentEnrollment`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(paginationDetail),
  });
  if (!response.ok) throw new Error("Failed to fetch student enrollment requests");
  return await response.json();
};

export const addStudent = async (studentData) => {
  const response = await fetch(`${BASE_URL}/Student/Create`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(studentData),
  });
  if (!response.ok) throw new Error("Failed to add student");
  console.log(response);
  return await response.json();
};

export const editStudent = async (studentData) => {
  const response = await fetch(`${BASE_URL}/Student/Update`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(studentData),
  });
  if (!response.ok) throw new Error("Failed to edit student");
  return await response.json();
};

export const getStudent = async (studentId) => {
  const response = await fetch(`${BASE_URL}/Student/GetUserById?UserId=${studentId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch student data");
  return await response.json();
};

export const deleteStudent = async (studentId) => {
  const response = await fetch(`${BASE_URL}/Student/Delete/${studentId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete student");
  return await response.json();
};

// TEACHER FUNCTIONS
export const fetchTeachers = async (paginationDetail) => {
  const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListTeacher`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(paginationDetail),
  });
  if (!response.ok) throw new Error("Failed to fetch teachers");
  return await response.json();
};

export const fetchTeacherEnrollmentRequest = async (paginationDetail) => {
  const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListTeacherEnrollment`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(paginationDetail),
  });
  if (!response.ok) throw new Error("Failed to fetch teacher enrollment requests");
  return await response.json();
};

export const addTeacher = async (teacherData) => {
  const response = await fetch(`${BASE_URL}/Teacher/Create`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(teacherData),
  });
  if (!response.ok) throw new Error("Failed to add teacher");
  return await response.json();
};

export const editTeacher = async (teacherData) => {
  const response = await fetch(`${BASE_URL}/Teacher/Update`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(teacherData),
  });
  if (!response.ok) throw new Error("Failed to edit teacher");
  return await response.json();
};

export const getTeacher = async (teacherId) => {
  const response = await fetch(`${BASE_URL}/Teacher/GetByTeacherid?TeacherId=${teacherId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch teacher data");
  return await response.json();
};

export const deleteTeacher = async (teacherId) => {
  const response = await fetch(`${BASE_URL}/Teacher/Delete/${teacherId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete teacher");
  return await response.json();
};
