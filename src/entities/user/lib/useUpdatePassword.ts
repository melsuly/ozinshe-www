import { useMutation } from "@tanstack/react-query"
import { updatePassword } from "../api/updatePassword"
import { toast } from "sonner"
import { responseError } from "@/shared/api"

export function useUpdatePassword() {
  return useMutation({
    mutationKey: ["update-password"],
    mutationFn: updatePassword,
    onError: (e) => toast.error(responseError(e).message),
  })
}
