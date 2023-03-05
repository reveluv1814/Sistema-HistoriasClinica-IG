import axios from "axios";

export const loginUserRequest = async (login) =>
  await axios.post("http://localhost:4000/auth/login", login);

export const RecoveryRequest = async (email) =>
  await axios.post("http://localhost:4000/auth/recovery", email);

export const changePassword = async (cambio) =>
  await axios.post("http://localhost:4000/auth/change-password", cambio);
