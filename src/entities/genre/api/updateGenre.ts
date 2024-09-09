import { httpClient } from "@/shared/api"
import { Identifier } from "@/shared/model"

export async function updateGenre({
  id,
  ...data
}: {
  id: Identifier
  title: string
}) {
  return httpClient.put(`/genres/${id}`, data)
}
