import { httpClient } from "@/shared/api"
import { UserDto } from "../model/dto"
import { mapUsers } from "../lib/mapUser"

export async function getUsers() {
  return httpClient
    .get<UserDto[]>("/users")
    .then((response) => mapUsers(response.data))
}
