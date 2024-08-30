import { httpClient } from "@/shared/api"

export async function getGenres() {
  return httpClient.get("/genres")
}
