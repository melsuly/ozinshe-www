import { Container } from "@/shared/ui"
import { Button, Group, Title } from "@mantine/core"
import { Link } from "react-router-dom"

export function UsersPage() {
  return (
    <Container>
      <Group align='center' justify="space-between">
        <Title size="h2" mt={32} mb={24}>
          Пользователи
        </Title>

        <Button size="md" color="green" component={Link} to="create">
          Добавить
        </Button>
      </Group>
    </Container>
  )
}
