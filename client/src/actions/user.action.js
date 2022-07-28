import * as api from '../api';

// ACTION CREATORS


// ATTEMPT SIGN UP
export const attemptRegister = (registerData) => async (dispatch) => {
    try {
        const { data } = await api.register(registerData); // SEND TO BACKEND AND GET RESPONSE
        if (data.error) return (data.error);

        dispatch({ type: 'user/REGISTER', payload: data.data }); // DISPATCH THE RESULT TO THE REDUCER
    } catch (error) {
        console.log(error); // LOG ERROR TO CONSOLE
    }
}

// ATTEMPT LOGIN
export const attemptLogin = (loginData) => async (dispatch) => {
    try {
        const { data } = await api.login(loginData); // SEND TO BACKEND AND GET RESPONSE
        if (data.error) return (data.error);

        dispatch({ type: 'user/LOGIN', payload: data.data }); // DISPATCH THE RESULT TO THE REDUCER
    } catch (error) {
        // return error.response.data.error;
        console.log(error); // LOG ERROR TO CONSOLE
    }
}

// Fetch user from server
export const refreshUser = (username) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(username);
        if (data.data) {
            if (!data.data.auth) sessionStorage.removeItem('signedIn');
            dispatch({ type: 'user/REFRESH', payload: data.data });
        } else {
            return data.error?.message;
        }
    } catch (error) {
        return error.response.data.error;
    }
}

// LOGOUT
export const attemptlogout = () => async (dispatch) => {
    const { data } = await api.logout();
    if (data.ok) {
        sessionStorage.removeItem('signedIn');
        dispatch({ type: 'user/LOGOUT', payload: data.data });
    } else {
        return data.error?.message;
    }
}
