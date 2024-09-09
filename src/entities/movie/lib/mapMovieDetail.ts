import { MovieDetailDTO } from "../model/dto"
import { MovieDetail } from "../model/movieDetail"

export function mapMovieDetail(dto: MovieDetailDTO): MovieDetail {
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
