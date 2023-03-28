import axios from "axios";
const URI_API = "http://localhost:4000/";
export const loginUserRequest = async (login) =>
  await axios.post(URI_API + "auth/login", login);

export const RecoveryRequest = async (email) =>
  await axios.post("http://localhost:4000/auth/recovery", email);

export const changePassword = async (cambio) =>
  await axios.post("http://localhost:4000/auth/change-password", cambio);

export const getUsers = async (token) =>
  await axios.get("http://localhost:4000/admin",{headers: {"Authorization": 'Bearer ' +token}});

export const postUsers = async (token,body) =>
  await axios.post("http://localhost:4000/admin",body,{headers: {"Authorization": 'Bearer ' +token}});