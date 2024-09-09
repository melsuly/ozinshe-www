import { UserDto } from "../model/dto"
import { User } from "../model/user"

export function mapUser(dto: UserDto): User {
  return {
    id: dto.id,
    email: dto.email,
    name: dto.name,
  }
}

export function mapUsers(dtos: UserDto[]): User[] {
  return dtos.map(mapUser)
}
