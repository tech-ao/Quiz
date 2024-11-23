import { fetchStudents } from "../Services/api";

export const getStudents = () => async (dispatch) => {
  dispatch({ type: "FETCH_STUDENTS_REQUEST" });
  try {
    const students = await fetchStudents();
    dispatch({ type: "FETCH_STUDENTS_SUCCESS", payload: students });
  } catch (error) {
    dispatch({ type: "FETCH_STUDENTS_FAILURE", payload: error.message });
  }
};
