import { httpClient } from "@/shared/api"
import { config } from "@/shared/lib"
import { CreateMovie } from "../model/createMovie"

export async function createMovie(data: CreateMovie) {
  const d = config.features.simplifiedMovie
    ? buildSimplifiedMovieBody(data)
    : buildFullMovieBody(data)

  return httpClient.post("/movies", d)
}

function buildSimplifiedMovieBody(data: CreateMovie) {
  return {
    title: data.title,
    description: data.description,
    releaseYear: data.releaseYear,
    director: data.director,
    trailerUrl: data.trailerUrl,
    genreIds: data.genreIds,
    poster: "" // специально оставляем пустым
  }
}

function buildFullMovieBody(data: CreateMovie) {
  const formData = new FormData()

  formData.append("title", data.title)
  formData.append("description", data.description)
  formData.append("releaseYear", String(data.releaseYear))
  formData.append("director", data.director)
  formData.append("trailerUrl", data.trailerUrl)
  formData.append("poster", data.poster!)
  data.genreIds.forEach((id) => formData.append("genreIds", String(id)))

  return formData
}
