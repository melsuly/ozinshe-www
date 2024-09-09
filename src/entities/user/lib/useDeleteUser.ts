import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "../api/deleteUser"
import { toast } from "sonner"
import { responseError } from "@/shared/api"

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
    onError: (e) => toast.error(responseError(e).message),
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
  })
}
