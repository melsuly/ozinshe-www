import { httpClient } from "@/shared/api"
import { Identifier } from "@/shared/model"
import { MovieDetailDTO } from "../model/dto"
import { mapMovieDetail } from "../lib/mapMovieDetail"

export async function getMovie({ movieId }: { movieId: Identifier }) {
  return httpClient
    .get<MovieDetailDTO>(`/movies/${movieId}`)
    .then((response) => mapMovieDetail(response.data))
}
