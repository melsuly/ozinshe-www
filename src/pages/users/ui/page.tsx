import { UserCard, useUsers } from "@/entities/user"
import { responseError } from "@/shared/api"
import { Container } from "@/shared/ui"
import { NotReleased } from "@/widgets/notReleased"
import { UserDrawer } from "@/widgets/userDrawer"
import { Button, Group, Stack, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

export function UsersPage() {
  const users = useUsers()

  const [isCreateModalOpened, createModal] = useDisclosure()

  return (
    <>
      <Container>
        <Stack>
          <Group align="center" justify="space-between">
            <Title size="h2" mt={32} mb={24}>
              Пользователи
            </Title>

            <Button onClick={createModal.open} size="md" color="green">
              Добавить
            </Button>
          </Group>

          {users.error && responseError(users.error).isNotImplemented && (
            <NotReleased description="Ожидали получить список пользователей, но произошла ошибка" />
          )}

          <Stack>
            {users.data?.map((user) => <UserCard key={user.id} user={user} />)}
          </Stack>
        </Stack>
      </Container>

      <UserDrawer opened={isCreateModalOpened} onClose={createModal.close} />
    </>
  )
}
