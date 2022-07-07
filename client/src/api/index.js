import axios from 'axios';

// const authURL = "http://localhost:3001/auth";

export const login = async (loginData) => await axios.post(`auth/login`, loginData);
export const register = async (registerData) => await axios.post(`auth/register`, registerData);
export const logout = async () => await axios.get(`auth/logout`);
export const fetchUser = async (username) => await axios.get(`auth/${username}`);
export const fetchProfile = async (username) => await axios.get(`${username}`);
