import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteGenre } from "../api/deleteGenre"

export function useDeleteGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["delete-genre"],
    mutationFn: deleteGenre,
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ["genres"] }),
  })
}
