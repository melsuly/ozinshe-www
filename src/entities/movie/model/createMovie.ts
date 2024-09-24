import { Identifier } from "@/shared/model"

export type CreateMovie = {
  title: string
  description: string
  trailerUrl: string
  poster: File | null
  releaseYear: number
  director: string
  genreIds: Identifier[]
}
