import { Identifier } from "@/shared/model"
import { CreateMovie } from "./createMovie"

export type UpdateMovie = Partial<CreateMovie> & { id: Identifier }
