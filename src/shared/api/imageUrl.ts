import { config } from "../lib"

export function imageUrl(path: string) {
  return `${config.apiUrl}/images/${path}`
}
