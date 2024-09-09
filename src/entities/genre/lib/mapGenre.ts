import { GenreDto } from "../model/dto"
import { Genre } from "../model/genre"

export function mapGenre(dto: GenreDto): Genre {
  return {
    id: dto.Id,
    title: dto.Title,
  }
}

export function mapGenres(dtos: GenreDto[]): Genre[] {
  return dtos.map(mapGenre)
}
