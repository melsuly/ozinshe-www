import { httpClient } from "@/shared/api"
import { Identifier } from "@/shared/model"

export async function deleteUser({ id }: { id: Identifier }) {
  return httpClient.delete(`/users/${id}`)
}
