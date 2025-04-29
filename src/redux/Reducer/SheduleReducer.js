const initialState = { shedules: [], loading: false, error: null };

const sheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SHEDULES_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SHEDULES_SUCCESS":
      return { ...state, loading: false, shedules: action.payload };
    case "FETCH_SHEDULES_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_SHEDULE_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SHEDULE_SUCCESS":
      return { ...state, loading: false, selectedShedule: action.payload };
    case "FETCH_SHEDULE_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_SHEDULE_REQUEST":
      return { ...state, loading: true, };
    case "ADD_SHEDULE_SUCCESS": 
      return { ...state, loading: false, shedules: [ action.payload ,...state.shedules], };
    case "ADD_SHEDULE_FAILURE":
      return { ...state, loading: false, error: action.payload, };
    case "EDIT_SHEDULE_REQUEST":
      return { ...state, loading: true };
    case "EDIT_SHEDULE_SUCCESS":
      return { ...state, loading: false, shedules: state.shedules.map((shedule) => shedule.sheduleId === action.payload.sheduleId ? action.payload : shedule), };
    case "EDIT_SHEDULE_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_SHEDULE_REQUEST":
      return { ...state, loading: true }
    case "DELETE_SHEDULE_SUCCESS":
      return { ...state, loading: false, deletedShedule: action.payload }
    case "DELETE_SHEDULE_FAILURE":
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
};

export default sheduleReducer;
