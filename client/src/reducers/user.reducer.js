// import { createSlice } from '@reduxjs/toolkit';

// export const userSlice = createSlice({
//     name: "users",

// });

const initialState = {
    auth: false,
    _id: "",
    avatar: null,
    fullName: "Loading...",
    username: "Loading...",
    timeline: []
    // connections: [],
    // bio: "Loading",
    // skills: [],
    // posts: [],
    // createdAt: new Date(),
    // updatedAt: new Date(),
}

const user = (user = initialState, action) => {
    switch (action.type) {
        case "user/REGISTER":
            return { ...user, auth: action.payload.auth, username: action.payload.username };
        case "user/LOGIN":
            return { ...user, auth: action.payload.auth, username: action.payload.username };
        case "user/REFRESH":
            return action.payload;
        case "user/LOGOUT":
            return initialState;
        default:
            return user;
    }
}

export default user;