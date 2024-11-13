import { httpClient } from "@/shared/api"
import { Identifier } from "@/shared/model"

export async function updatePassword({
  id,
  newPassword,
}: {
  id: Identifier
  newPassword: string
}) {
  return httpClient.patch(`/users/${id}/changePassword`, {
    password: newPassword,
  })
}
