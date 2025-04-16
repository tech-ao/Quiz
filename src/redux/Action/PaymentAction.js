import { type } from "@testing-library/user-event/dist/type";
import { fetchPayments, addPayment, editPayment ,getPayment , deletePayment ,fetchPaymentEnrollmentRequest} from "../Services/Payment";

export const getPayments = (paginationDetail) => async (dispatch) => {
  dispatch({ type: "FETCH_PAYMENTS_REQUEST" });
  try {
    const payments = await fetchPayments(paginationDetail );
    dispatch({ type: "FETCH_PAYMENTS_SUCCESS", payload: payments });
  } catch (error) {
    dispatch({ type: "FETCH_PAYMENTS_FAILURE", payload: error.message });
  }
};



export const fetchPayment = (paymentId)=>async (dispatch)=>{
  console.log(paymentId);
  
  dispatch({type:"FETCH_PAYMENT_REQUEST"});
  try{
    const payment = await getPayment(paymentId);
    dispatch ({type:"FETCH_PAYMENT_SUCCESS", payload: payment})
   
  }catch(error){
    dispatch({type:"FETCH_PAYMENT_FAILURE" , payload:error.message})
  }
}
export const getPaymentEnrollmentRequest = (paginationDetail) => async (dispatch) => {
  dispatch({ type: "FETCH_PAYMENTS_REQUEST" });
  try {
    const payments = await fetchPaymentEnrollmentRequest(paginationDetail);
    dispatch({ type: "FETCH_PAYMENTS_SUCCESS", payload: payments });
  } catch (error) {
    dispatch({ type: "FETCH_PAYMENTS_FAILURE", payload: error.message });
  }
};


export const addPaymentAction = (paymentData , paginationDetail) => async (dispatch) => {
  console.log(paymentData);
  
  dispatch({ type: "ADD_PAYMENT_REQUEST" });
  try {
    const addedPayment = await addPayment(paymentData); // Call the API
    dispatch({ type: "ADD_PAYMENT_SUCCESS", payload: addedPayment }); 
    return addedPayment;
  } catch (error) {
    dispatch({ type: "ADD_PAYMENT_FAILURE", payload: error.message }); // Dispatch failure
  }
};

// export const addPaymentAction = (paymentData, paginationDetail) => async (dispatch) => {
//   console.log("Payment Data Sent:", paymentData); // Debugging
  
//   dispatch({ type: "ADD_PAYMENT_REQUEST" });

//   try {
//     const addedPayment = await addPayment(paymentData); // Call the API
//     console.log("API Response:", addedPayment); // Debugging

//     dispatch({ type: "ADD_PAYMENT_SUCCESS", payload: addedPayment });

//     return addedPayment; // Return the API response correctly
//   } catch (error) {
//     console.error("Error from API:", error); // Debugging
//     dispatch({ type: "ADD_PAYMENT_FAILURE", payload: error.message });
//     throw error; // Ensure the error is thrown so it can be caught in handleSubmit
//   }
// };


// export const editPaymentAction = (paymentData,paginationDetail) => async (dispatch) =>{
//   console.log(paymentData);
  
//   dispatch({type:"EDIT_PAYMENT_REQUEST"});
//   try{
//     const editedPayment = await editPayment(paymentData);
//     dispatch({type:"EDIT_PAYMENT_SUCCESS", payload:editedPayment});
//     dispatch(fetchPayments(paginationDetail));
    
//   }catch(error){
//     dispatch({type:"EDIT_PAYMENT_FAILURE", payload: error.message});
//   }
// }

export const editPaymentAction = (paymentData, paginationDetail) => async (dispatch) => {
  dispatch({ type: "EDIT_PAYMENT_REQUEST" });

  try {
    const editedPayment = await editPayment(paymentData);

    // Immediately update Redux store
    dispatch({
      type: "EDIT_PAYMENT_SUCCESS",
      payload: editedPayment, // Update Redux state immediately
    });

    // Fetch updated payment list (optional)
    dispatch(fetchPayments(paginationDetail));
    
  } catch (error) {
    dispatch({
      type: "EDIT_PAYMENT_FAILURE",
      payload: error.message,
    });
  }
};

export const deletePaymentAction = (paymentId) =>async (dispatch) =>{
  dispatch({type:"DELETE_PAYMENT_REQUEST"});
  try{
    const deletedPayment = await deletePayment(paymentId);
    dispatch({type:"DELETE_PAYMENT_SUCCESS", payload:deletedPayment});
    }catch(error){
      dispatch({type:"DELETE_PAYMENT_FAILURE"});
    }
}