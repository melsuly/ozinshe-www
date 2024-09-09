import { Identifier } from "@/shared/model"
import { useQuery } from "@tanstack/react-query"
import { getMovie } from "../api/getMovie"

export function useMovieDetail({ id }: { id: Identifier }) {
  return useQuery({
    queryKey: ["movie", { id }],
    queryFn: () => getMovie({ movieId: id }),
    retry: false,
  })
}
