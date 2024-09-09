import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../api/updateUser"
import { toast } from "sonner"
import { responseError } from "@/shared/api"

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: updateUser,
    retry: false,
    onError: (e) => toast.error(responseError(e).message),
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
  })
}
