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
export const fetchShedules = async (isCompetition ,paginationDetail) => {
  const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListShedule`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(isCompetition,paginationDetail),
  });
  if (!response.ok) throw new Error("Failed to fetch shedules");
  return await response.json();
};

export const fetchSheduleEnrollmentRequest = async (paginationDetail) => {
  const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListSheduleEnrollment`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(paginationDetail),
  });
  if (!response.ok) throw new Error("Failed to fetch shedule enrollment requests");
  return await response.json();
};

export const addShedule = async (sheduleData) => {
  const response = await fetch(`${BASE_URL}/ScheduleTime/Create`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(sheduleData),
  });
  if (!response.ok) throw new Error("Failed to add shedule");
  console.log(response);
  return await response.json();
};

export const editShedule = async (sheduleData) => {
  const response = await fetch(`${BASE_URL}/ScheduleTime/Update`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(sheduleData),
  });
  if (!response.ok) throw new Error("Failed to edit shedule");
  return await response.json();
};

export const getShedule = async (sheduleId) => {
  const response = await fetch(`${BASE_URL}/ScheduleTime/GetUserById?UserId=${sheduleId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch shedule data");
  return await response.json();
};

export const deleteShedule = async (sheduleId) => {
  const response = await fetch(`${BASE_URL}/ScheduleTime/Delete/${sheduleId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete shedule");
  return await response.json();
};
