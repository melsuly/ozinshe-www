import { useQuery } from "@tanstack/react-query"
import { getGenres } from "../api/getGenres"

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    retry: false,
  })
}
