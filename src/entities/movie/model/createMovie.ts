import { Identifier } from "@/shared/model"

export type CreateMovie = {
  title: string
  description: string
  trailerUrl: string
  poster: File
  dateOfRelease: string
  director: string
  genreIds: Identifier[]
}
