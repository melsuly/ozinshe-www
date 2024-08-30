import { LogoOzinsheFull } from "@/shared/assets"
import {
  Button,
  Center,
  Container,
  Flex,
  Input,
  Paper,
  PasswordInput,
  Stack,
  Title,
} from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { loginFormSchema, LoginFormValues } from "../model/loginForm.schema"
import { postLogin } from "../api/postLogin"
import { useSession } from "@/entities/session"
import { toast } from "sonner"
import { responseError } from "@/shared/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function LoginPage() {
  const session = useSession()
  const navigate = useNavigate()
  const form = useForm<LoginFormValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginFormSchema),
  })
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = (values: LoginFormValues) => {
    setLoading(true)
    postLogin(values)
      .then((token) => {
        session.authorize(token)
        navigate("/")
      })
      .catch((e) => {
        toast.error(responseError(e).message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Container size={420} h="100%">
      <Flex align="center" h="100%">
        <Paper
          onSubmit={form.onSubmit(handleSubmit)}
          py={48}
          px={32}
          component="form"
          flex="1"
          radius="lg"
          withBorder
        >
          <Center c="violet">
            <LogoOzinsheFull height={28} />
          </Center>

          <Title mt={24} ta="center" size="h4">
            Войдите чтобы продолжить
          </Title>

          <Stack mt={24}>
            <Input
              placeholder="Email"
              radius="md"
              size="md"
              error={form.errors}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              placeholder="Пароль"
              radius="md"
              size="md"
              error={form.errors}
              {...form.getInputProps("password")}
            />
          </Stack>

          <Button
            type="submit"
            mt={32}
            size="lg"
            radius="md"
            fullWidth
            color="violet"
            loading={isLoading}
          >
            Войти
          </Button>
        </Paper>
      </Flex>
    </Container>
  )
}
