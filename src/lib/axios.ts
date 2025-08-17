import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://blog-app-mrk6.vercel.app/api",
})
// https://blog-app-pcw5.vercel.app