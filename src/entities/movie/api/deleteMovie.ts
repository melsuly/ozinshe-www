import { httpClient } from "@/shared/api"
import { Identifier } from "@/shared/model"

export async function deleteMovie({ id }: { id: Identifier }) {
  return httpClient.delete(`/movies/${id}`)
}
