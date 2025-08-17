import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://blog-app-hp2i.vercel.app/api",
})