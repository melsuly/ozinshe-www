import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createMovie } from "../api/createMovie"
import { toast } from "sonner"
import { responseError } from "@/shared/api"

export function useCreateMovie() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["create-movie"],
    mutationFn: createMovie,
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ["movies"] }),
    onError: (e) => toast.error(responseError(e).message),
  })
}
