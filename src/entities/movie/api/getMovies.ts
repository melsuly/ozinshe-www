import { httpClient } from "@/shared/api"

export async function getMovies() {
  return httpClient.get("/movies")
}
