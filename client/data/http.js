import axios from "axios"

export const http = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001" : "/",
})
