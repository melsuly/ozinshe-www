import { httpClient } from "@/shared/api"
import { Identifier } from "@/shared/model"

export async function updatePassword({
  id,
  newPassword,
  confirmPassword,
}: {
  id: Identifier
  newPassword: string
  confirmPassword: string
}) {
  return httpClient.put(`/users/${id}/changePassword`, {
    password: newPassword,
    confirmPassword,
  })
}
