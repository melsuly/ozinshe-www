import { httpClient } from "@/shared/api"
import { UpdateMovie } from "../model/updateMovie"
import { config } from "@/shared/lib"

export async function updateMovie({ id, ...data }: UpdateMovie) {
  const d = config.features.simplifiedMovie
    ? buildSimplifiedMovieBody({ id, ...data })
    : buildFullMovieBody({ id, ...data })

  return httpClient.put(`/movies/${id}`, d)
}

function buildSimplifiedMovieBody(data: UpdateMovie) {
  return {
    title: data.title,
    description: data.description,
    releaseYear: data.releaseYear,
    director: data.director,
    trailerUrl: data.trailerUrl,
    poster: "", // специально оставляем пустымии
    genreIds: [], // специально оставляем пустыми
  }
}

function buildFullMovieBody(data: UpdateMovie) {
  const formData = new FormData()

  if (data.title) formData.append("title", data.title)
  if (data.description) formData.append("description", data.description)
  if (data.releaseYear) formData.append("releaseYear", String(data.releaseYear))
  if (data.director) formData.append("director", data.director)
  if (data.trailerUrl) formData.append("trailerUrl", data.trailerUrl)
  if (data.poster) formData.append("poster", data.poster)
  data.genreIds?.forEach((id) => formData.append("genreIds", String(id)))

  return formData
}
