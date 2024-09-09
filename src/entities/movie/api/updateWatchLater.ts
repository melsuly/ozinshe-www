import { httpClient } from "@/shared/api"
import { Identifier } from "@/shared/model"

export async function updateWatchLater({
  movieId,
  isWatchLater,
}: {
  movieId: Identifier
  isWatchLater: boolean
}) {
  const queryParams = new URLSearchParams()
  queryParams.append("movieId", movieId.toString())
  return httpClient.post(
    `/watchlist/${isWatchLater ? "add" : "remove"}?${queryParams.toString()}`,
  )
}
