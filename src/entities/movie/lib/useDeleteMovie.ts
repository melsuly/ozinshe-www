import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMovie } from "../api/deleteMovie"
import { toast } from "sonner"
import { responseError } from "@/shared/api"

export function useDeleteMovie() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["delete-movie"],
    mutationFn: deleteMovie,
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ["movies"] }),
    onError: (e) => toast.error(responseError(e).message),
  })
}
