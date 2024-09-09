import { httpClient } from "@/shared/api"
import { Identifier } from "@/shared/model"

export async function updateMovieRate({
  movieId,
  rating,
}: {
  movieId: Identifier
  rating: number
}) {
  const queryParams = new URLSearchParams()
  queryParams.append("rating", rating.toString())
  return httpClient.patch(`/movies/${movieId}/rate?${queryParams.toString()}`)
}
