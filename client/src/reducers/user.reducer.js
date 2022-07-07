// import { createSlice } from '@reduxjs/toolkit';

// export const userSlice = createSlice({
//     name: "users",

// });

// const signedIn = JSON.parse(localStorage.getItem('signedIn'));
const initialState = {
    _id: "",
    avatar: null,
    fullname: "Loading...",
    username: "Loading...",
    connections: [],
    bio: "Loading",
    skills: [],
    posts: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    auth: false
}

const user = (user = initialState, action) => {
    switch (action.type) {
        case "user/REGISTER":
            return action.payload;
        case "user/LOGIN":
            return action.payload;
        case "user/REFRESH":
            return action.payload;
        case "user/LOGOUT":
            return initialState;
        default:
            return user;
    }
}

export default user;