const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  const passwordReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHANGE_PASSWORD_REQUEST":
        return { ...state, loading: true, success: false, error: null };
      case "CHANGE_PASSWORD_SUCCESS":
        return { ...state, loading: false, success: true };
      case "CHANGE_PASSWORD_FAILURE":
        return { ...state, loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default passwordReducer;
  