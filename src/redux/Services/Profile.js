const API_BASE_URL = "http://localhost:8012/api";
const COMMON_HEADERS = {
  Accept: "text/plain",
  "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
  AccessToken: "123",
  "Content-Type": "application/json",
};

const getHeaders = () => ({
  ...COMMON_HEADERS,
});

export const getProfile = async (studentId) => {
  console.log(studentId);
  
  try {
    console.log(studentId); // Log the studentId for debugging

    const response = await fetch(`${API_BASE_URL}/Profile/GetContentByUserId?UserId=${studentId}`, {
      method: "GET",
      headers: getHeaders(),
    });

    console.log(response); // Log the full response object for debugging

    if (!response.ok) {
      // Improved error handling with HTTP status check
      throw new Error(`Failed to fetch student data: ${response.statusText}`);
    }

    return await response.json(); // Return the parsed JSON from the response
  } catch (error) {
    console.error("Error fetching profile:", error.message); // Log the error message
    throw error; // Re-throw the error to be handled by the caller
  }
};
