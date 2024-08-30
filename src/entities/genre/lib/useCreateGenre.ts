import { useMutation } from "@tanstack/react-query"
import { createGenre } from "../api/createGenre"

export function useCreateGenre() {
  return useMutation({
    mutationKey: ["create-genre"],
    mutationFn: createGenre,
  })
}
