import axios from "axios"
import { config } from "../lib"

export const httpClient = axios.create({
  baseURL: config.apiUrl,
})

httpClient.interceptors.request.use((c) => {
  if (config.features.authorization) {
    const token = localStorage.getItem(config.tokenStorageKey)
    if (token) c.headers.Authorization = `Bearer ${token}`
  }
  return c
})
