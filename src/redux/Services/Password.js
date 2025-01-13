import BASE_URL from "./Config";

export const changeStudentPassword = async (studentId, oldPassword, newPassword) => {
    const url = `${BASE_URL}/PasswordManager/StudentChangePassword?StudentId=${encodeURIComponent(
      studentId
    )}&Password=${encodeURIComponent(newPassword)}&OldPassword=${encodeURIComponent(oldPassword)}`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) throw new Error("Failed to change password");
    return await response.json();
  };
  