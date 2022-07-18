import * as api from '../api';

// Fetch another profile from server
export const getProfile = (username) => async (dispatch) => {
    try {
        if (username === 'home') { username = sessionStorage.getItem('signedIn'); }
        const { data } = await api.fetchProfile(username);
        if (data.data) {
            dispatch({ type: 'profile/FETCH_PROFILE', payload: data.data });
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.log(error);
    }
}

// CONNECT
export const attemptConnect = (profileId, profileAction) => async (dispatch) => {
    const { data } = await api.connect(profileId, profileAction);
    if (data.ok) {
        dispatch({ type: 'profile/CONNECT', payload: data.data.action });
    } else {
        return data.error?.message;
    }
}