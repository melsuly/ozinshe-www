import { mapUser } from "@/entities/user/lib/mapUser"
import { UserDto } from "@/entities/user/model/dto"
import { httpClient } from "@/shared/api"
import { Identifier } from "@/shared/model"

export async function getUser({ id }: { id: Identifier }) {
  return httpClient
    .get<UserDto>(`/users/${id}`)
    .then((response) => mapUser(response.data))
}
