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
  
export const getUserId = async (token,id) =>
  await axios.get(`http://localhost:4000/admin/${id}`,{headers: {"Authorization": 'Bearer ' +token}});

export const postUsers = async (token,body) =>
  await axios.post("http://localhost:4000/admin",body,{headers: {"Authorization": 'Bearer ' +token}});

export const patchUser = async (token,id,body) =>
  await axios.patch(`http://localhost:4000/admin/${id}`,body,{headers: {"Authorization": 'Bearer ' +token}});

export const deleteUser = async (token,id) =>
  await axios.delete(`http://localhost:4000/admin/${id}`,{headers: {"Authorization": 'Bearer ' +token}});