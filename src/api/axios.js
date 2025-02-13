// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',  // Ganti dengan URL API backend Anda
  timeout: 10000, // Waktu timeout dalam milidetik
});

export default instance;
