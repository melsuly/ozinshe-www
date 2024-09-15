import { UserInfo } from "../model/userInfo"
import { UserInfoDto } from "../model/userInfo.dto"

export function mapUserInfo(dto: UserInfoDto): UserInfo {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
  }
}
