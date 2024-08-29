import axios from "axios"
import { config } from "../lib"

export const httpClient = axios.create({
  baseURL: "http://ozinshe.kchsherbakov.com",
})

httpClient.interceptors.request.use((c) => {
  const token = localStorage.getItem(config.tokenStorageKey)
  if (token) c.headers.Authorization = `Bearer ${token}`
  return c
})
