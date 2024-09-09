import { httpClient } from "@/shared/api"
import { MovieFilters } from "../model/filters"
import { MovieDto } from "../model/dto"
import { mapMovies } from "../lib/mapMovie"

export async function getMovies({
  genreIds = [],
  isWatched = false,
  searchTerm,
  sort,
}: MovieFilters) {
  const queryParams = new URLSearchParams()
  queryParams.append("isWatched", isWatched.toString())
  if (genreIds.length > 0) queryParams.append("genreIds", genreIds.join(","))
  if (searchTerm) queryParams.append("searchTerm", searchTerm)
  if (sort) queryParams.append("sort", sort)
  return httpClient
    .get<MovieDto[]>(`/movies?${queryParams.toString()}`)
    .then((response) => mapMovies(response.data))
}
