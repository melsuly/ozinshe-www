import { Identifier } from "@/shared/model"
import { CreateUser } from "./createUser"

export type UpdateUser = Partial<CreateUser> & { id: Identifier }
