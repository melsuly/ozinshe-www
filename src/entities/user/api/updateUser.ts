import { httpClient } from "@/shared/api"
import { UpdateUser } from "../model/updateUser"

export async function updateUser({ id, ...data }: UpdateUser) {
  return httpClient.put(`/users/${id}`, data)
}
