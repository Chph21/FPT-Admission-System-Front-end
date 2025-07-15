import axios from "axios"

const URL = 'https://fpt-admission-system.onrender.com/api'
const TOKEN = localStorage.getItem('token') || '';

const createApi = () => {
    return axios.create({
        baseURL: URL,
        headers: {
            'Content-Type': 'application/json',
            ...(TOKEN ? { 'Authorization': 'Bearer ' + TOKEN } : {})
        },
    });
}

export const api = createApi();