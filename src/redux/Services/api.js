const API_BASE_URL = "http://localhost:8012/api";
const COMMON_HEADERS = {
  Accept: "text/plain",
  "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
  AccessToken: "123",
  "Content-Type": "application/json",
};

// Utility function for headers
const getHeaders = () => ({
  ...COMMON_HEADERS,
});

// Fetch students
export const fetchStudents = async (paginationDetail) => {
  const response = await fetch(`${API_BASE_URL}/SearchAndList/SearchAndListStudent`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(paginationDetail),
  });
  if (!response.ok) throw new Error("Failed to fetch students");
  return await response.json();
};

// Add student
export const addStudent = async (studentData) => {
  const response = await fetch(`${API_BASE_URL}/Student/Create`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(studentData),
  });
  if (!response.ok) throw new Error("Failed to add student");
  return await response.json();
};

// Edit student
export const editStudent = async (studentData) => {
  const response = await fetch(`${API_BASE_URL}/Student/Update`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(studentData),
  });
  if (!response.ok) throw new Error("Failed to edit student");
  return await response.json();
};

// Get student by ID
export const getStudent = async (studentId) => {
  const response = await fetch(`${API_BASE_URL}/Student/GetUserById?UserId=${studentId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch student data");
  return await response.json();
};

// Delete student
export const deleteStudent = async (studentId) => {
  const response = await fetch(`${API_BASE_URL}/Student/Delete/${studentId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete student");
  return await response.json();
};
