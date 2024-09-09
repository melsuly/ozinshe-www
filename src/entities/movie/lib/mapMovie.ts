import { MovieDto } from "../model/dto"
import { Movie } from "../model/movie"

export function mapMovie(dto: MovieDto): Movie {
  return {
    id: dto.Id,
    title: dto.Title,
    description: dto.Description,
    trailerUrl: dto.TrailerUrl,
    posterUrl: dto.PosterUrl,
    isWatched: dto.IsWatched,
    dateOfRelease: dto.DateOfRelease,
    director: dto.Director,
    rating: dto.Rating,
    genres: dto.Genres.map((genre) => ({
      id: genre.Id,
      title: genre.Title,
    })),
  }
}

export function mapMovies(dtos: MovieDto[]): Movie[] {
  return dtos.map(mapMovie)
}
