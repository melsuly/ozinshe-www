import { getUser } from "@/entities/genre/api/getUser"
import { useCreateUser } from "@/entities/user"
import { useUpdatePassword } from "@/entities/user/lib/useUpdatePassword"
import { useUpdateUser } from "@/entities/user/lib/useUpdateUser"
import { responseError } from "@/shared/api"
import { Identifier } from "@/shared/model"
import {
  Button,
  Drawer,
  Group,
  PasswordInput,
  Stack,
  Tabs,
  TextInput,
  Title,
} from "@mantine/core"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function UserDrawer({
  id,
  opened,
  onClose,
}: {
  id?: Identifier
  opened: boolean
  onClose: () => void
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const updatePassword = useUpdatePassword()

  const handleDataSave = () => {
    if (!email) {
      toast.error("Введите Email")
      return
    }

    if (!name) {
      toast.error("Введите имя")
      return
    }

    if (id === undefined) {
      if (!password) {
        toast.error("Введите пароль")
        return
      }

      if (password !== passwordConfirm) {
        toast.error("Пароли не совпадают")
        return
      }

      toast.promise(
        createUser.mutateAsync({
          name,
          email,
          password,
          confirmPassword: passwordConfirm,
        }),
        {
          loading: "Создание пользователя...",
          success: () => {
            onClose()
            return "Пользователь успешно создан"
          },
          error: (e) => {
            return responseError(e).message
          },
        },
      )
      return
    }

    toast.promise(
      updateUser.mutateAsync({
        id,
        name,
        email,
      }),
      {
        loading: "Сохранение пользователя...",
        success: () => {
          onClose()
          return "Пользователь успешно сохранен"
        },
        error: (e) => {
          return responseError(e).message
        },
      },
    )
  }

  const handlePasswordChange = () => {
    if (!password) {
      toast.error("Введите пароль")
      return
    }

    if (password !== passwordConfirm) {
      toast.error("Пароли не совпадают")
      return
    }

    if (id) {
      toast.promise(
        updatePassword.mutateAsync({
          id,
          newPassword: password,
        }),
        {
          loading: "Смена пароля...",
          success: () => {
            onClose()
            return "Пароль успешно изменен"
          },
          error: (e) => {
            return responseError(e).message
          },
        },
      )
    }
  }

  useEffect(() => {
    setName("")
    setEmail("")
    setPassword("")
    setPasswordConfirm("")
  }, [opened])

  useEffect(() => {
    if (id && opened) {
      getUser({ id })
        .then((user) => {
          setName(user.name)
          setEmail(user.email)
        })
        .catch((e) => toast.error(responseError(e).message))
    }
  }, [id, opened])

  const dataTab = (
    <Stack gap={56}>
      <Stack>
        <Title size="h3">
          {id === undefined ? "Создание пользователя" : "Личные данные"}
        </Title>

        <Stack>
          <TextInput
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            placeholder="Введите имя"
            label="Имя"
          />
          <TextInput
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            placeholder="Введите Email"
            label="Email"
          />

          {id === undefined && (
            <>
              <PasswordInput
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                placeholder="Введите пароль"
              />
              <PasswordInput
                value={passwordConfirm}
                onChange={(event) =>
                  setPasswordConfirm(event.currentTarget.value)
                }
                placeholder="Подтверждение пароля"
              />
            </>
          )}
        </Stack>
      </Stack>

      <Group grow>
        <Button onClick={handleDataSave} size="md">
          Сохранить
        </Button>
        <Button size="md" onClick={onClose} variant="outline">
          Отменить
        </Button>
      </Group>
    </Stack>
  )

  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
    >
      {id !== undefined ? (
        <Tabs defaultValue="data" variant="pills">
          <Tabs.List grow>
            <Tabs.Tab px={48} fz="md" fw="500" value="data">
              Данные
            </Tabs.Tab>
            <Tabs.Tab px={48} fz="md" fw="500" value="password">
              Пароль
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="data" py="lg">
            {dataTab}
          </Tabs.Panel>
          <Tabs.Panel value="password" py="lg">
            <Stack gap={56}>
              <Stack>
                <Title size="h3">Сменить пароль</Title>

                <Stack>
                  <PasswordInput
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    label="Новый пароль"
                    placeholder="Введите пароль"
                  />
                  <PasswordInput
                    value={passwordConfirm}
                    onChange={(event) =>
                      setPasswordConfirm(event.currentTarget.value)
                    }
                    label="Подтверждение пароля"
                    placeholder="Введите подтверждение пароля"
                  />
                </Stack>
              </Stack>

              <Group grow>
                <Button onClick={handlePasswordChange}>Сохранить</Button>
                <Button onClick={onClose} variant="outline">
                  Отменить
                </Button>
              </Group>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      ) : (
        dataTab
      )}
    </Drawer>
  )
}
