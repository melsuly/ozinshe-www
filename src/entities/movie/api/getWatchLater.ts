import { httpClient } from "@/shared/api"
import { MovieDto } from "../model/dto"
import { mapMovies } from "../lib/mapMovie"

export async function getWatchLater() {
  return httpClient
    .get<MovieDto[]>("/watchlist")
    .then((response) => mapMovies(response.data))
}
