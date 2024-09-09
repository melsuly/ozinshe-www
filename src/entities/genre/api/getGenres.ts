import { httpClient } from "@/shared/api"
import { GenresDto } from "../model/dto"
import { mapGenres } from "../lib/mapGenre"

export async function getGenres() {
  return httpClient
    .get<GenresDto>("/genres")
    .then((response) => mapGenres(response.data))
}
