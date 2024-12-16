const initialState = { Teachers: [], loading: false, error: null };

const TeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TeacherS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_TeacherS_SUCCESS":
      return { ...state, loading: false, Teachers: action.payload };
    case "FETCH_TeacherS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_Teacher_REQUEST":
      return { ...state, loading: true };
    case "FETCH_Teacher_SUCCESS":
      return { ...state, loading: false, selectedTeacher: action.payload };
    case "FETCH_Teacher_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_Teacher_REQUEST":
      return { ...state, loading: true, };
    case "ADD_Teacher_SUCCESS": 
      return { ...state, loading: false, Teachers: [ action.payload ,...state.Teachers], };
    case "ADD_Teacher_FAILURE":
      return { ...state, loading: false, error: action.payload, };
    case "EDIT_Teacher_REQUEST":
      return { ...state, loading: true };
    case "EDIT_Teacher_SUCCESS":
      return { ...state, loading: false, Teachers: state.Teachers.map((teacher) => teacher.TeacherId === action.payload.TeacherId ? action.payload : teacher), };
    case "EDIT_Teacher_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_Teacher_REQUEST":
      return { ...state, loading: true }
    case "DELETE_Teacher_SUCCESS":
      return { ...state, loading: false, deletedTeacher: action.payload }
    case "DELETE_Teacher_FAILURE":
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
};

export default TeacherReducer;
