import { httpClient } from "@/shared/api"
import { Identifier } from "@/shared/model"

export async function deleteGenre({ id }: { id: Identifier }) {
  return httpClient.delete(`/genres/${id}`)
}
