export type MovieDto = {
  Id: number
  Title: string
  Description: string
  ReleaseYear: number
  Director: string
  Rating: number
  TrailerUrl: string
  PosterUrl: string
  IsWatched: boolean
  Genres: {
    Id: number
    Title: string
  }[]
}

export type MovieDetailDTO = {
  Id: number
  Title: string
  Description: string
  ReleaseYear: number
  Director: string
  Rating: number
  TrailerUrl: string
  PosterUrl: string
  IsWatched: boolean
  Genres: {
    Id: number
    Title: string
  }[]
}
