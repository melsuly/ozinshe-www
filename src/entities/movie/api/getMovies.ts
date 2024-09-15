import { httpClient } from "@/shared/api"
import { MovieFilters } from "../model/filters"
import { MovieDto } from "../model/dto"
import { mapMovies } from "../lib/mapMovie"

export async function getMovies({
  genreIds = [],
  isWatched,
  searchTerm,
  sort,
}: MovieFilters) {
  const queryParams = new URLSearchParams()
  if (isWatched) queryParams.append("iswatched", isWatched.toString())
  genreIds?.forEach((id) => queryParams.append("genreids", String(id)));
  if (searchTerm) queryParams.append("search", searchTerm)
  if (sort) queryParams.append("sort", sort)
  return httpClient
    .get<MovieDto[]>(`/movies?${queryParams.toString()}`)
    .then((response) => mapMovies(response.data))
}
