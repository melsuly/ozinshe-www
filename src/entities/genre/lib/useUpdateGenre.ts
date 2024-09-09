import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateGenre } from "../api/updateGenre"

export function useUpdateGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["update-genre"],
    mutationFn: updateGenre,
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ["genres"] }),
  })
}
