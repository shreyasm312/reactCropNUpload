import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const http = axios.create({
  baseURL: process.env.BASEURL
});

http.interceptors.request.use(
  function(config) {
    config.headers.Authorization = 'Client-ID' + process.env.CLIENTID;
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);
