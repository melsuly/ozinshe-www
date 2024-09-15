import { httpClient } from "@/shared/api"
import { Identifier } from "@/shared/model"

export async function updateWatchLater({
  movieId,
  isCreate,
}: {
  movieId: Identifier
  isCreate: boolean
}) {
  if (isCreate) {
    return httpClient.post(`/watchlist/${movieId}`)
  } else {
    return httpClient.delete(`/watchlist/${movieId}`)
  }
}
