import { useQuery } from "@tanstack/react-query"
import { getMovies } from "../api/getMovies"

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  })
}
