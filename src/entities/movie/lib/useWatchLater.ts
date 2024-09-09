import { useQuery } from "@tanstack/react-query"
import { getWatchLater } from "../api/getWatchLater"

export function useWatchLater() {
  return useQuery({
    queryKey: ["watch-later"],
    queryFn: getWatchLater,
    retry: false,
  })
}
