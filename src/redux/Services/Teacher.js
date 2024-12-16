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

export const fetchTeachers = async (paginationDetail) => {
  const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListTeacher`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(paginationDetail),
  });
  if (!response.ok) throw new Error("Failed to fetch Teachers");
  return await response.json();
};


export const addTeacher = async (TeacherData) => {
  const response = await fetch(`${BASE_URL}/Teacher/Create`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(TeacherData),
  });
  if (!response.ok) throw new Error("Failed to add Teacher");
  return await response.json();
};

export const editTeacher = async (TeacherData) => {
  const response = await fetch(`${BASE_URL}/Teacher/Update`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(TeacherData),
  });
  if (!response.ok) throw new Error("Failed to edit Teacher");
  return await response.json();
};

export const getTeacher = async (TeacherId) => {
  const response = await fetch(`${BASE_URL}/Teacher/GetUserById?UserId=${TeacherId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch Teacher data");
  return await response.json();
};

// Delete Teacher
export const deleteTeacher = async (TeacherId) => {
  const response = await fetch(`${BASE_URL}/Teacher/Delete/${TeacherId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete Teacher");
  return await response.json();
};
