const initialState = { students: [], loading: false, error: null };

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_STUDENTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_STUDENTS_SUCCESS":
      return { ...state, loading: false, students: action.payload };
    case "FETCH_STUDENTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
      case "FETCH_STUDENT_REQUEST":
      return { ...state, loading: true };
    case "FETCH_STUDENT_SUCCESS":
      return { ...state, loading: false, students: action.payload };
    case "FETCH_STUDENT_FAILURE":
      return { ...state, loading: false, error: action.payload };
      case "ADD_STUDENT_REQUEST":
        return { ...state,loading: true,};
      case "ADD_STUDENT_SUCCESS":
        return {...state,loading: false, students: [...state.students, action.payload], };
      case "ADD_STUDENT_FAILURE":
        return {...state, loading: false, error: action.payload,};
        case "EDIT_STUDENT_REQUEST":
      return { ...state, loading: true };
    case "EDIT_STUDENT_SUCCESS":
      return {...state,loading: false,students: state.students.map((student) =>student._id === action.payload._id ? action.payload : student),};
    case "EDIT_STUDENT_FAILURE":
      return { ...state, loading: false, error: action.payload };
      default:
      return state;
  }
};

export default studentReducer;
