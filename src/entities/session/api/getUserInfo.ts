import { httpClient } from "@/shared/api"
import { UserInfoDto } from "../model/userInfo.dto"
import { mapUserInfo } from "../lib/mapUserInfo"

export async function getUserInfo() {
  return httpClient
    .get<UserInfoDto>("/auth/userInfo")
    .then((response) => mapUserInfo(response.data))
}
