import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://blog-app-pcw5.vercel.app/api",
})