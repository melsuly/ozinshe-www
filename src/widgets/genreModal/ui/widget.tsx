import { Genre, useCreateGenre, useUpdateGenre } from "@/entities/genre"
import { responseError } from "@/shared/api"
import { Button, Group, Modal, TextInput } from "@mantine/core"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function GenreModal({
  opened,
  onClose,
  genre,
}: {
  opened: boolean
  onClose: () => void
  genre: Genre | null
}) {
  const [isLoading, setLoading] = useState(false)

  const [title, setTitle] = useState("")
  const [titleError, setTitleError] = useState("")

  const createGenre = useCreateGenre()
  const updateGenre = useUpdateGenre()

  const handleSubmit = () => {
    if (!title) {
      setTitleError("Заполните поле")
      return
    }

    setLoading(true)

    if (genre) {
      updateGenre
        .mutateAsync({ id: genre.id, title })
        .then(() => {
          toast.success("Жанр успешно обновлен")
          onClose()
        })
        .catch((e) => {
          toast.error(responseError(e).message)
        })
        .finally(() => setLoading(false))

      return
    }

    createGenre
      .mutateAsync({ title })
      .then(() => {
        toast.success("Жанр успешно добавлен")
        onClose()
      })
      .catch((e) => {
        toast.error(responseError(e).message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setTitle("")
  }, [opened])

  useEffect(() => {
    if (genre) {
      setTitle(genre.title)
    }
  }, [genre])

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title={genre ? "Редактирование жанра" : "Добавление жанра"}
    >
      <TextInput
        size="md"
        radius="md"
        label="Название"
        placeholder="Введите название жанра"
        withAsterisk
        value={title}
        onChange={(event) => {
          setTitle(event.currentTarget.value)
          setTitleError("")
        }}
        required
        error={titleError}
      />

      <Group grow mt={32}>
        <Button
          loading={isLoading}
          color="var(--mantine-color-primarycolor)"
          size="md"
          onClick={handleSubmit}
        >
          {genre ? "Сохранить" : "Добавить"}
        </Button>
        <Button
          disabled={isLoading}
          color="var(--mantine-color-gray-9)"
          size="md"
          variant="outline"
          onClick={onClose}
        >
          Отменить
        </Button>
      </Group>
    </Modal>
  )
}
