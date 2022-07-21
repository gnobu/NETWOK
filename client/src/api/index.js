import axios from 'axios';

// const authURL = "http://localhost:3001/auth";

export const login = async (loginData) => await axios.post(`auth/login`, loginData);
export const register = async (registerData) => await axios.post(`auth/register`, registerData);
export const logout = async () => await axios.get(`auth/logout`);
export const fetchUser = async (username) => await axios.get(`auth/${username}`);
export const fetchProfile = async (username) => await axios.get(`api/profile/${username}`);
export const lookup = async (payload) => await axios.post('api/search', payload);
export const connect = async (userId, action) => await axios.patch(`api/connect/${userId}`, { action });
export const makePost = async (content) => await axios.post(`post/create`, { content });
export const likePost = async (postId) => await axios.patch(`post/like/${postId}`);