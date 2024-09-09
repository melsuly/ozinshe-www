import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/getUsers"

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: false,
  })
}
