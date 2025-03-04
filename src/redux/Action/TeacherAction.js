import { type } from "@testing-library/user-event/dist/type";
import { fetchTeachers, addTeacher, editTeacher ,getTeacher , deleteTeacher } from "../Services/Teacher";

export const getTeachers = (paginationDetail) => async (dispatch) => {
  dispatch({ type: "FETCH_TeacherS_REQUEST" });
  try {
    console.log("in action",paginationDetail)
    const Teachers = await fetchTeachers(paginationDetail);
    dispatch({ type: "FETCH_TeacherS_SUCCESS", payload: Teachers });
  } catch (error) {
    dispatch({ type: "FETCH_TeacherS_FAILURE", payload: error.message });
  }
};

export const fetchTeacher = (TeacherId)=>async (dispatch)=>{
  dispatch({type:"FETCH_Teacher_REQUEST"});
  try{
    const Teacher = await getTeacher(TeacherId);
    dispatch ({type:"FETCH_Teacher_SUCCESS", payload: Teacher})
    return Teacher;
   
  }catch(error){
    dispatch({type:"FETCH_Teacher_FAILURE" , payload:error.message})
  }
}

export const addTeacherAction = (TeacherData , paginationDetail) => async (dispatch) => {
  dispatch({ type: "ADD_Teacher_REQUEST" });
  try {
    const addedTeacher = await addTeacher(TeacherData); // Call the API
    dispatch({ type: "ADD_Teacher_SUCCESS", payload: addedTeacher }); // Dispatch success
    dispatch(fetchTeachers(paginationDetail));
  } catch (error) {
    dispatch({ type: "ADD_Teacher_FAILURE", payload: error.message }); // Dispatch failure
  }
};


export const editTeacherAction = (TeacherData,paginationDetail) => async (dispatch) =>{
  console.log(TeacherData);
  
  dispatch({type:"EDIT_Teacher_REQUEST"});
  try{
    const editedTeacher = await editTeacher(TeacherData);
    dispatch({type:"EDIT_Teacher_SUCCESS", payload:editedTeacher});
    dispatch(fetchTeachers(paginationDetail));
    
  }catch(error){
    dispatch({type:"EDIT_Teacher_FAILURE", payload: error.message});
  }
}

export const deleteTeacherAction = (TeacherId) =>async (dispatch) =>{
  dispatch({type:"DELETE_Teacher_REQUEST"});
  try{
    const deletedTeacher = await deleteTeacher(TeacherId);
    dispatch({type:"DELETE_Teacher_SUCCESS", payload:deletedTeacher});
    }catch(error){
      dispatch({type:"DELETE_Teacher_FAILURE"});
    }
}