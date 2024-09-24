import { Identifier } from "@/shared/model"

export type MovieDetail = {
  id: Identifier
  title: string
  description: string
  trailerUrl: string
  posterUrl: string
  isWatched: boolean
  releaseYear: number
  director: string
  rating: number
  genres: {
    id: Identifier
    title: string
  }[]
}
