import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "/api",
})
// https://blog-app-pcw5.vercel.app