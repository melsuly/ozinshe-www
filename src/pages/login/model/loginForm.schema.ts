import { z } from "zod"

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: "Заполните поле",
    })
    .email({ message: "Некорректный email" })
    .min(1),
  password: z.string().min(1, {
    message: "Заполните поле",
  }),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
