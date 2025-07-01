import axios from 'axios';

export default axios.create({
  baseURL: process.env.FRONT_URL,
  withCredentials: true
});
