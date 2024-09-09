import { useQuery } from "@tanstack/react-query"
import { getMovies } from "../api/getMovies"
import { MovieFilters } from "../model/filters"

export function useMovies(filters: MovieFilters) {
  return useQuery({
    queryKey: ["movies", filters],
    queryFn: () => getMovies(filters),
    retry: false,
  })
}
