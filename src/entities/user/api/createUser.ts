import { httpClient } from "@/shared/api"
import { CreateUser } from "../model/createUser"

export async function createUser(data: CreateUser) {
  return httpClient.post("/users", data)
}
