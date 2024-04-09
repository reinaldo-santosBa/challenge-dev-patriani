import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://192.168.100.50:3001/enterprise',
    headers: {
      'Content-Type': 'application/json'
    },
  });