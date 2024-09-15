import { Genre, GenreCard, useDeleteGenre, useGenres } from "@/entities/genre"
import { responseError } from "@/shared/api"
import { Container } from "@/shared/ui"
import { ConfirmDeleteModal } from "@/widgets/confirmDeleteModal/ui/widget"
import { GenreModal } from "@/widgets/genreModal"
import { NotReleased } from "@/widgets/notReleased"
import { Button, Group, Stack, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"

export function GenresPage() {
  const genres = useGenres()

  const [isModalOpened, modal] = useDisclosure()
  const [isDeleteModalOpened, deleteModal] = useDisclosure()
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)

  const deleteGenre = useDeleteGenre()

  return (
    <>
      <Container>
        <Stack>
          <Group align="center" justify="space-between">
            <Title size="h2" mt={32} mb={24}>
              Жанры
            </Title>

            <Button
              onClick={modal.open}
              color="var(--mantine-color-dark-6)"
              size="md"
            >
              Добавить
            </Button>
          </Group>

          <Stack>
            {deleteGenre.error &&
              responseError(deleteGenre.error).isNotImplemented && (
                <NotReleased description="Ожидали получить список жанров, но произошла ошибка" />
              )}

            {genres.data?.map((genre) => (
              <GenreCard
                key={genre.id}
                title={genre.title}
                onEdit={() => {
                  setSelectedGenre(genre)
                  modal.open()
                }}
                onDelete={() => {
                  setSelectedGenre(genre)
                  deleteModal.open()
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Container>

      <GenreModal
        opened={isModalOpened}
        onClose={() => {
          setSelectedGenre(null)
          modal.close()
        }}
        genre={selectedGenre}
      />

      <ConfirmDeleteModal
        opened={isDeleteModalOpened}
        onClose={deleteModal.close}
        onConfirm={() => {
          if (selectedGenre) deleteGenre.mutate({ id: selectedGenre.id })
          setSelectedGenre(null)
          deleteModal.close()
        }}
      />
    </>
  )
}
