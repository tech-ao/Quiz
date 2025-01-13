import { changeStudentPassword } from "../Services/Password";

export const studentPasswordChange = (studentId , oldPassword, newPassword) => async (dispatch) => {
    dispatch({ type: "CHANGE_PASSWORD_REQUEST" }); // Dispatching the request action to update loading state

    try {
        const pasword = await changeStudentPassword(studentId , oldPassword, newPassword); // Making the API call to fetch profile data
        dispatch({ type: "CHANGE_PASSWORD_SUCCESS", payload: pasword }); // Dispatch success action with the profile data
        console.log(); // Logging the fetched profile data for debugging purposes
    } catch (error) {
        dispatch({ type: "CHANGE_PASSWORD_FAILURE", payload: error.message }); // Dispatch failure action with error message
    }
};