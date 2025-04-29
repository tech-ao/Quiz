import { type } from "@testing-library/user-event/dist/type";
import { fetchShedules, addShedule, editShedule ,getShedule , deleteShedule ,fetchSheduleEnrollmentRequest} from "../Services/Shedule";

export const getShedules = (isCompetition ,paginationDetail) => async (dispatch) => {
  dispatch({ type: "FETCH_SHEDULES_REQUEST" });
  try {
    const shedules = await fetchShedules(isCompetition ,paginationDetail );
    dispatch({ type: "FETCH_SHEDULES_SUCCESS", payload: shedules });
  } catch (error) {
    dispatch({ type: "FETCH_SHEDULES_FAILURE", payload: error.message });
  }
};



export const fetchShedule = (sheduleId)=>async (dispatch)=>{
  console.log(sheduleId);
  
  dispatch({type:"FETCH_SHEDULE_REQUEST"});
  try{
    const shedule = await getShedule(sheduleId);
    dispatch ({type:"FETCH_SHEDULE_SUCCESS", payload: shedule})
   
  }catch(error){
    dispatch({type:"FETCH_SHEDULE_FAILURE" , payload:error.message})
  }
}
export const getSheduleEnrollmentRequest = (paginationDetail) => async (dispatch) => {
  dispatch({ type: "FETCH_SHEDULES_REQUEST" });
  try {
    const shedules = await fetchSheduleEnrollmentRequest(paginationDetail);
    dispatch({ type: "FETCH_SHEDULES_SUCCESS", payload: shedules });
  } catch (error) {
    dispatch({ type: "FETCH_SHEDULES_FAILURE", payload: error.message });
  }
};


export const addSheduleAction = (sheduleData , paginationDetail) => async (dispatch) => {
  console.log(sheduleData);
  
  dispatch({ type: "ADD_SHEDULE_REQUEST" });
  try {
    const addedShedule = await addShedule(sheduleData); // Call the API
    dispatch({ type: "ADD_SHEDULE_SUCCESS", payload: addedShedule }); 
    return addedShedule;
  } catch (error) {
    dispatch({ type: "ADD_SHEDULE_FAILURE", payload: error.message }); // Dispatch failure
  }
};


export const editSheduleAction = (sheduleData, paginationDetail) => async (dispatch) => {
  dispatch({ type: "EDIT_SHEDULE_REQUEST" });

  try {
    const editedShedule = await editShedule(sheduleData);

    // Immediately update Redux store
    dispatch({
      type: "EDIT_SHEDULE_SUCCESS",
      payload: editedShedule, // Update Redux state immediately
    });

    // Fetch updated shedule list (optional)
    dispatch(fetchShedules(paginationDetail));
    
  } catch (error) {
    dispatch({
      type: "EDIT_SHEDULE_FAILURE",
      payload: error.message,
    });
  }
};

export const deleteSheduleAction = (sheduleId) =>async (dispatch) =>{
  dispatch({type:"DELETE_SHEDULE_REQUEST"});
  try{
    const deletedShedule = await deleteShedule(sheduleId);
    dispatch({type:"DELETE_SHEDULE_SUCCESS", payload:deletedShedule});
    }catch(error){
      dispatch({type:"DELETE_SHEDULE_FAILURE"});
    }
}