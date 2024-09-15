import { httpClient } from "@/shared/api"
import { CreateMovie } from "../model/createMovie"

export async function createMovie(data: CreateMovie) {
  const formData = new FormData()
  formData.append("title", data.title)
  formData.append("description", data.description)
  formData.append("dateOfRelease", data.dateOfRelease)
  formData.append("director", data.director)
  formData.append("trailerUrl", data.trailerUrl)
  formData.append("poster", data.poster)
  data.genreIds.forEach((id) => formData.append("genreIds", String(id)))
  return httpClient.post("/movies", formData)
}
