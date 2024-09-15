import { httpClient } from "@/shared/api"
import { UpdateMovie } from "../model/updateMovie"

export async function updateMovie({ id, ...data }: UpdateMovie) {
  const formData = new FormData()
  if (data.title) formData.append("title", data.title)
  if (data.description) formData.append("description", data.description)
  if (data.dateOfRelease) formData.append("dateOfRelease", data.dateOfRelease)
  if (data.director) formData.append("director", data.director)
  if (data.trailerUrl) formData.append("trailerUrl", data.trailerUrl)
  if (data.poster) formData.append("poster", data.poster)
  data.genreIds?.forEach((id) => formData.append("genreIds", String(id)))
  return httpClient.put(`/movies/${id}`, formData)
}
