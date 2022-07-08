// const sessionProfile = JSON.parse(sessionStorage.getItem('profile'));
const initialState = {
    auth: false,
    _id: "",
    avatar: null,
    fullname: "Loading...",
    username: "Loading...",
    connections: [],
    bio: "Loading",
    skills: [],
    posts: [],
    createdAt: new Date(),
    updatedAt: new Date()
}


const profile = (profile = initialState, action) => {
    switch (action.type) {
        case "profile/FETCH_PROFILE":
            return action.payload;
        default:
            return profile;
    }
}

export default profile;