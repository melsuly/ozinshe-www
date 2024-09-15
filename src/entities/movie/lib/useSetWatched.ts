import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { responseError } from "@/shared/api"
import { setWatched } from "@/entities/movie/api/setWatched.ts"

export function useSetWatched() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["set-watched-movie"],
    mutationFn: setWatched,
    onError: (e) => toast.error(responseError(e).message),
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ["movies"] }),
  })
}
