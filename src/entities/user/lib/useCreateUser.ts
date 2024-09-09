import { useMutation } from "@tanstack/react-query"
import { createUser } from "../api/createUser"

export function useCreateUser() {
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: createUser,
  })
}
