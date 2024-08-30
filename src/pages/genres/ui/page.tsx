import { useGenres } from "@/entities/genre"
import { Container } from "@/shared/ui"
import { GenreModal } from "@/widgets/genreModal"
import { Button, Group, Modal, TextInput, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

export function GenresPage() {
  const genres = useGenres()

  const [isCreateModalOpened, createModal] = useDisclosure()

  return (
    <>
      <Container>
        <Group align="center" justify="space-between">
          <Title size="h2" mt={32} mb={24}>
            Жанры
          </Title>

          <Button onClick={createModal.open} color="green" size="md">
            Добавить
          </Button>
        </Group>
      </Container>

      <GenreModal opened={isCreateModalOpened} onClose={createModal.close} />
    </>
  )
}
