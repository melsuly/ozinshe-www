import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateWatchLater } from "../api/updateWatchLater"
import { toast } from "sonner"
import { responseError } from "@/shared/api"

export function useUpdateWatchLater() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["update-watch-later"],
    mutationFn: updateWatchLater,
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ["watch-later"] }),
    onError: (e) => toast.error(responseError(e).message),
  })
}
