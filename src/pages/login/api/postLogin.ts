import { httpClient } from "@/shared/api"
import { LoginDto } from "../model/login.dto"
import { LoginFormValues } from "../model/loginForm.schema"

export async function postLogin(data: LoginFormValues) {
  return httpClient
    .post<LoginDto>("/auth/signIn", data)
    .then((response) => response.data.token)
}
