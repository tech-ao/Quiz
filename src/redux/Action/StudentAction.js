import { type } from "@testing-library/user-event/dist/type";
import { fetchStudents, addStudent, editStudent ,getStudent , deleteStudent ,fetchStudentEnrollmentRequest} from "../Services/api";

export const getStudents = (paginationDetail) => async (dispatch) => {
  dispatch({ type: "FETCH_STUDENTS_REQUEST" });
  try {
    const students = await fetchStudents(paginationDetail );
    dispatch({ type: "FETCH_STUDENTS_SUCCESS", payload: students });
  } catch (error) {
    dispatch({ type: "FETCH_STUDENTS_FAILURE", payload: error.message });
  }
};



export const fetchStudent = (studentId)=>async (dispatch)=>{
  console.log(studentId);
  
  dispatch({type:"FETCH_STUDENT_REQUEST"});
  try{
    const student = await getStudent(studentId);
    dispatch ({type:"FETCH_STUDENT_SUCCESS", payload: student})
   
  }catch(error){
    dispatch({type:"FETCH_STUDENT_FAILURE" , payload:error.message})
  }
}
export const getStudentEnrollmentRequest = (paginationDetail) => async (dispatch) => {
  dispatch({ type: "FETCH_STUDENTS_REQUEST" });
  try {
    const students = await fetchStudentEnrollmentRequest(paginationDetail);
    dispatch({ type: "FETCH_STUDENTS_SUCCESS", payload: students });
  } catch (error) {
    dispatch({ type: "FETCH_STUDENTS_FAILURE", payload: error.message });
  }
};


export const addStudentAction = (studentData , paginationDetail) => async (dispatch) => {
  console.log(studentData);
  
  dispatch({ type: "ADD_STUDENT_REQUEST" });
  try {
    const addedStudent = await addStudent(studentData); // Call the API
    dispatch({ type: "ADD_STUDENT_SUCCESS", payload: addedStudent }); 
    return addedStudent;
  } catch (error) {
    dispatch({ type: "ADD_STUDENT_FAILURE", payload: error.message }); // Dispatch failure
  }
};

// export const addStudentAction = (studentData, paginationDetail) => async (dispatch) => {
//   console.log("Student Data Sent:", studentData); // Debugging
  
//   dispatch({ type: "ADD_STUDENT_REQUEST" });

//   try {
//     const addedStudent = await addStudent(studentData); // Call the API
//     console.log("API Response:", addedStudent); // Debugging

//     dispatch({ type: "ADD_STUDENT_SUCCESS", payload: addedStudent });

//     return addedStudent; // Return the API response correctly
//   } catch (error) {
//     console.error("Error from API:", error); // Debugging
//     dispatch({ type: "ADD_STUDENT_FAILURE", payload: error.message });
//     throw error; // Ensure the error is thrown so it can be caught in handleSubmit
//   }
// };


// export const editStudentAction = (studentData,paginationDetail) => async (dispatch) =>{
//   console.log(studentData);
  
//   dispatch({type:"EDIT_STUDENT_REQUEST"});
//   try{
//     const editedStudent = await editStudent(studentData);
//     dispatch({type:"EDIT_STUDENT_SUCCESS", payload:editedStudent});
//     dispatch(fetchStudents(paginationDetail));
    
//   }catch(error){
//     dispatch({type:"EDIT_STUDENT_FAILURE", payload: error.message});
//   }
// }

export const editStudentAction = (studentData, paginationDetail) => async (dispatch) => {
  dispatch({ type: "EDIT_STUDENT_REQUEST" });

  try {
    const editedStudent = await editStudent(studentData);

    // Immediately update Redux store
    dispatch({
      type: "EDIT_STUDENT_SUCCESS",
      payload: editedStudent, // Update Redux state immediately
    });

    // Fetch updated student list (optional)
    dispatch(fetchStudents(paginationDetail));
    
  } catch (error) {
    dispatch({
      type: "EDIT_STUDENT_FAILURE",
      payload: error.message,
    });
  }
};

export const deleteStudentAction = (studentId) =>async (dispatch) =>{
  dispatch({type:"DELETE_STUDENT_REQUEST"});
  try{
    const deletedStudent = await deleteStudent(studentId);
    dispatch({type:"DELETE_STUDENT_SUCCESS", payload:deletedStudent});
    }catch(error){
      dispatch({type:"DELETE_STUDENT_FAILURE"});
    }
}