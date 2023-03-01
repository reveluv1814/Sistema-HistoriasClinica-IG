import axios from 'axios'

export const loginUserRequest = async(login) =>
   await axios.post('http://localhost:4000/auth/login',login)
