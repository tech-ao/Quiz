import { getProfile } from "../Services/Profile";

export const getProfileData = (studentId) => async (dispatch) => {
    dispatch({ type: "FETCH_PROFILE_REQUEST" }); // Dispatching the request action to update loading state

    try {
        const profile = await getProfile(studentId); // Making the API call to fetch profile data
        dispatch({ type: "FETCH_PROFILE_SUCCESS", payload: profile }); // Dispatch success action with the profile data
        console.log(profile); // Logging the fetched profile data for debugging purposes
    } catch (error) {
        dispatch({ type: "FETCH_PROFILE_FAILURE", payload: error.message }); // Dispatch failure action with error message
    }
};
