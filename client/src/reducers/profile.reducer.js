// const sessionProfile = JSON.parse(sessionStorage.getItem('profile'));
const initialState = {
    auth: false,
    _id: "",
    avatar: null,
    fullname: "Loading...",
    username: "Loading...",
    connections: [],
    bio: "Loading...",
    skills: [],
    posts: [],
    action: null,
    createdAt: null,
    updatedAt: null
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