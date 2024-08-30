import { httpClient } from "@/shared/api"
import { CreateGenre } from "../model/create"

export async function createGenre(data: CreateGenre) {
  return httpClient.post("/genres", data)
}
