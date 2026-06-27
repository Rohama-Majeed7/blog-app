import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://blog-app-five-mu-20.vercel.app/api",
})
// 