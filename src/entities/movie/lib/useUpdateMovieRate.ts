import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMovieRate } from "../api/updateRate"
import { toast } from "sonner"
import { responseError } from "@/shared/api"

export function useUpdateMovieRate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["update-movie-rate"],
    mutationFn: updateMovieRate,
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ["movies"] }),
    onError: (e) => toast.error(responseError(e).message),
  })
}
