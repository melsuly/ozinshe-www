import { isAxiosError } from "axios"
import { z } from "zod"

type ApiError = {
  statusCode?: number
  message: string
  isUnauthorized: boolean
  isNotImplemented: boolean
}

export function responseError(e: unknown): ApiError {
  if (isAxiosError(e)) {
    const statusCode = e.response?.status
    let message = "Не удалось выполнить запрос"

    try {
      message = z.object({ error: z.string() }).parse(e.response?.data).error
    } catch {
      console.warn("Не удалось распарсить ошибку", e.response?.data)
    }

    if (statusCode === 401) {
      return {
        statusCode,
        message,
        isUnauthorized: true,
        isNotImplemented: false,
      }
    }

    if (statusCode === 400 || statusCode === 404) {
      return {
        statusCode,
        message,
        isUnauthorized: false,
        isNotImplemented: true,
      }
    }

    return {
      statusCode,
      message,
      isUnauthorized: false,
      isNotImplemented: false,
    }
  }

  return {
    message: "Неизвестная ошибка",
    isUnauthorized: false,
    isNotImplemented: false,
  }
}
