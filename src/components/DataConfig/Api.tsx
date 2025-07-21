import axios from "axios"

const URL = 'https://fpt-admission-system.onrender.com/api'

export const getApi = () => {
    const TOKEN = localStorage.getItem('token') || '';
    return axios.create({
        baseURL: URL,
        headers: {
            'Content-Type': 'application/json',
            ...(TOKEN ? { 'Authorization': 'Bearer ' + TOKEN } : {})
        },
    });
};