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
  console.log("📤 pagination in service:",paginationDetail)
  const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListTeacher`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(paginationDetail),
  });
  if (!response.ok) throw new Error("Failed to fetch Teachers");
  return await response.json();
};

export const addTeacher = async (TeacherData) => {
  console.log("📤 Sending request to API:", `${BASE_URL}/Teacher/Create`);
  console.log("📄 Request Body:", JSON.stringify(TeacherData));

  try {
    const response = await fetch(`${BASE_URL}/Teacher/Create`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(TeacherData),
    });

    console.log("📥 Response Status:", response.status);

    const responseText = await response.text(); // Read raw response text
    console.log("📝 Raw Response:", responseText);

    if (!response.ok) {
      throw new Error(`❌ API Error: ${response.status} - ${response.statusText}`);
    }

    const jsonResponse = responseText ? JSON.parse(responseText) : {}; // Handle empty responses
    console.log("✅ Parsed Response:", jsonResponse);

    return jsonResponse;
  } catch (error) {
    console.error("🚨 Error in addTeacher:", error);
    throw error;
  }
};


// export const addTeacher = async (TeacherData) => {
//   const response = await fetch(`${BASE_URL}/Teacher/Create`, {
//     method: "POST",
//     headers: getHeaders(),
//     body: JSON.stringify(TeacherData),
//   });
//   if (!response.ok) throw new Error("Failed to add Teacher");
//   return await response.json();
// };
// export const addTeacher = async (TeacherData) => {
//   console.log("Sending request to API:", `${BASE_URL}/Teacher/Create`);
//   console.log("Request Body:", JSON.stringify(TeacherData));

//   try {
//     const response = await fetch(`${BASE_URL}/Teacher/Create`, {
//       method: "POST",
//       headers: getHeaders(), // Ensure this function includes "Content-Type: application/json"
//       body: JSON.stringify(TeacherData),
//     });

//     console.log("Response Status:", response.status);
//     const text = await response.text(); // Read raw response
//     console.log("Raw Response:", text);

//     if (!response.ok) throw new Error("Failed to add Teacher");

//     return text ? JSON.parse(text) : {}; // Handle empty responses
//   } catch (error) {
//     console.error("Error in addTeacher:", error);
//     throw error;
//   }
// };

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
  const response = await fetch(`${BASE_URL}/Teacher/GetByTeacherid?TeacherId=${TeacherId}`, {
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
