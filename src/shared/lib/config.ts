import { z } from "zod"

const env = z
  .object({
    VITE_API_URL: z.string(),
    VITE_FEATURE_AUTH: z.string().transform((value) => value === "true"),
  })
  .parse(import.meta.env)

export const config = {
  apiUrl: env.VITE_API_URL,
  tokenStorageKey: "token",
  features: {
    authorization: env.VITE_FEATURE_AUTH,
  },
}
