const initialState = { meetings: [], loading: false, error: null };

const meetingReducer = (state = initialState, action) => {
  switch (action.type) {

    case "FETCH_MEETINGS_REQUEST":
        return { ...state, loading: true };
      case "FETCH_MEETINGS_SUCCESS":
        return { ...state, loading: false, students: action.payload };
      case "FETCH_MEETINGS_FAILURE":
        return { ...state, loading: false, error: action.payload };
  }}