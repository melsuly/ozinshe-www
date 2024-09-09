import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createGenre } from "../api/createGenre"

export function useCreateGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["create-genre"],
    mutationFn: createGenre,
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ["genres"] }),
  })
}
