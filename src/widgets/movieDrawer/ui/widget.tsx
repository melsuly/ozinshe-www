import { useGenres } from "@/entities/genre"
import { getMovie, useCreateMovie, useUpdateMovie } from "@/entities/movie"
import {
  Button,
  Drawer,
  FileInput,
  Group,
  MultiSelect,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import dayjs from "dayjs"
import { responseError } from "@/shared/api"
import { Identifier } from "@/shared/model"

export function MovieDrawer({
  opened,
  onClose,
  id,
}: {
  opened: boolean
  onClose: () => void
  id?: Identifier
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [releaseDate, setReleaseDate] = useState<string>("")
  const [director, setDirector] = useState("")
  const [trailer, setTrailer] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [poster, setPoster] = useState<File | null>(null)

  const genres = useGenres()
  const updateMovie = useUpdateMovie()
  const createMovie = useCreateMovie()

  const handleSave = () => {
    if (!title) {
      toast.error("Заполните название")
      return
    }

    if (!description) {
      toast.error("Введите описание")
      return
    }

    if (!releaseDate) {
      toast.error("Введите дату выхода")
      return
    }

    if (!director) {
      toast.error("Введите режиссера")
      return
    }

    if (!trailer) {
      toast.error("Введите трейлер")
      return
    }

    if (selectedGenres.length === 0) {
      toast.error("Выберите хотя бы один жанр")
      return
    }

    if (id) {
      toast.promise(
        updateMovie.mutateAsync({
          id,
          title,
          description,
          dateOfRelease: dayjs(releaseDate).format("YYYY-MM-DD"),
          director,
          genreIds: selectedGenres.map((id) => +id),
          trailerUrl: trailer,
          poster: poster || undefined,
        }),
        {
          loading: "Сохранение...",
          success: () => {
            onClose()
            return "Фильм успешно обновлен"
          },
          error: (error) => responseError(error).message,
        },
      )
      return
    }

    if (!poster) {
      toast.error("Выберите постер")
      return
    }

    toast.promise(
      createMovie.mutateAsync({
        title,
        description,
        dateOfRelease: dayjs(releaseDate).format("YYYY-MM-DD"),
        director,
        genreIds: selectedGenres.map((id) => +id),
        trailerUrl: trailer,
        poster,
      }),
      {
        loading: "Сохранение...",
        success: () => {
          onClose()
          return "Фильм успешно добавлен"
        },
        error: (error) => responseError(error).message,
      },
    )
  }

  useEffect(() => {
    if (!opened) {
      setTitle("")
      setDescription("")
      setReleaseDate("")
      setDirector("")
      setTrailer("")
      setSelectedGenres([])
      setPoster(null)
    }
  }, [opened])

  useEffect(() => {
    if (id && opened) {
      getMovie({ movieId: id })
        .then((movie) => {
          setTitle(movie.title)
          setDescription(movie.description)
          setReleaseDate(dayjs(movie.dateOfRelease).format("YYYY"))
          setDirector(movie.director)
          setTrailer(movie.trailerUrl)
          setSelectedGenres(movie.genres.map((genre) => genre.id.toString()))
        })
        .catch((e) => toast.error(responseError(e).message))
    }
  }, [id, opened])

  return (
    <Drawer
      withCloseButton={false}
      size="lg"
      position="right"
      opened={opened}
      onClose={onClose}
    >
      <Stack gap={56}>
        <Stack>
          <Title size="h3">
            {id ? "Редактирование фильма" : "Добавление фильма"}
          </Title>
          <Stack>
            <TextInput
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              label="Название"
              placeholder="Введите название фильма"
            />
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              label="Описание"
              placeholder="Введите описание"
              rows={5}
            />
            <TextInput
              type="number"
              maxLength={4}
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.currentTarget.value)}
              label="Год производства"
              placeholder="Выберите год производства"
            />
            <TextInput
              value={director}
              onChange={(event) => setDirector(event.currentTarget.value)}
              label="Режиссер"
              placeholder="Введите режиссера"
            />
            <TextInput
              value={trailer}
              onChange={(event) => setTrailer(event.currentTarget.value)}
              label="Трейлер"
              placeholder="https://youtube.com/watch?v=..."
            />
            <MultiSelect
              value={selectedGenres}
              onChange={setSelectedGenres}
              label="Жанры"
              placeholder="Выберите жанры"
              data={genres.data?.map((genre) => ({
                value: genre.id.toString(),
                label: genre.title,
              }))}
              searchable
            />
            <FileInput
              value={poster}
              onChange={(file) => setPoster(file)}
              label="Постер"
              placeholder="Выберите изображение"
              accept="image/png, image/jpeg, image/jpg"
            />
          </Stack>
        </Stack>
        <Group grow>
          <Button onClick={handleSave} size="md">
            {id ? "Сохранить" : "Добавить"}
          </Button>
          <Button size="md" onClick={onClose} variant="outline">
            Отменить
          </Button>
        </Group>
      </Stack>
    </Drawer>
  )
}
