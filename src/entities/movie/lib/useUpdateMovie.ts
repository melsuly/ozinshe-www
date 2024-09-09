import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMovie } from "../api/updateMovie"
import { toast } from "sonner"
import { responseError } from "@/shared/api"

export function useUpdateMovie() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["update-movie"],
    mutationFn: updateMovie,
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ["movies"] }),
    onError: (e) => toast.error(responseError(e).message),
  })
}
