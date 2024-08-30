import { useCreateGenre } from "@/entities/genre"
import { responseError } from "@/shared/api"
import { Button, Group, Modal, TextInput } from "@mantine/core"
import { useState } from "react"
import { toast } from "sonner"

export function GenreModal({
  opened,
  onClose,
}: {
  opened: boolean
  onClose: () => void
}) {
  const [isLoading, setLoading] = useState(false)

  const [title, setTitle] = useState("")
  const [titleError, setTitleError] = useState("")

  const createGenre = useCreateGenre()

  const handleSubmit = () => {
    if (!title) {
      setTitleError("Заполните поле")
      return
    }

    setLoading(true)

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

  return (
    <Modal centered opened={opened} onClose={onClose} title="Добавление жанра">
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
          disabled={isLoading}
          color="red"
          size="md"
          variant="outline"
          onClick={onClose}
        >
          Отменить
        </Button>
        <Button
          loading={isLoading}
          color="green"
          size="md"
          onClick={handleSubmit}
        >
          Добавить
        </Button>
      </Group>
    </Modal>
  )
}
