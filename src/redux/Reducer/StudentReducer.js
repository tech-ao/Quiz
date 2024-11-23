const initialState = { students: [], loading: false, error: null };

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_STUDENTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_STUDENTS_SUCCESS":
      return { ...state, loading: false, students: action.payload };
    case "FETCH_STUDENTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default studentReducer;
