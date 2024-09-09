import { Identifier } from "@/shared/model"

export type MovieFilters = {
  genreIds?: Identifier[]
  isWatched?: boolean
  searchTerm?: string
  sort?: string
}
