import { Identifier } from "@/shared/model"
import { httpClient } from "@/shared/api"

export async function setWatched({
  movieId,
  isWatched,
}: {
  movieId: Identifier
  isWatched: boolean
}) {
  const queryParams = new URLSearchParams()
  queryParams.append("isWatched", isWatched.toString())
  return httpClient.patch(`/movies/${movieId}/setWatched?${queryParams.toString()}`)
}
