/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGenres } from "@/entities/genre"
import {
  MovieCard,
  MovieWatchLaterCard,
  useMovies,
  useWatchLater,
} from "@/entities/movie"
import { responseError } from "@/shared/api"
import { pluralize } from "@/shared/lib"
import { Container } from "@/shared/ui"
import { MovieDrawer } from "@/widgets/movieDrawer"
import { NotReleased } from "@/widgets/notReleased"
import {
  Button,
  Group,
  Loader,
  ScrollArea,
  Select,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"

export function HomePage() {
  const [activeTab, setActiveTab] = useState<"watched" | "all">("watched")
  const [genre, setGenre] = useState<string>("all")
  const [sortingType, setSortingType] = useState<string>("id")

  const genres = useGenres()
  const movies = useMovies({
    isWatched: activeTab === "watched",
    genreIds: genre !== "all" ? [+genre] : [],
    // sort: sortingType,
  })
  const watchLater = useWatchLater()

  const [isCreateModalOpened, createModal] = useDisclosure()

  return (
    <>
      <Container>
        {watchLater.error &&
          responseError(watchLater.error).isNotImplemented && (
            <NotReleased description="Ожидали получить список фильмов, но произошла ошибка" />
          )}

        {(watchLater.data || []).length > 0 && (
          <Stack mt={32}>
            <Title size="h2">Буду смотреть</Title>

            <ScrollArea offsetScrollbars>
              <Group gap={16} wrap="nowrap">
                {watchLater.data?.map((movie) => (
                  <MovieWatchLaterCard key={movie.id} movie={movie} />
                ))}
              </Group>
            </ScrollArea>
          </Stack>
        )}

        <Group my={32} align="center" justify="space-between">
          <Group gap={32}>
            <Stack
              onClick={() => setActiveTab("watched")}
              c={activeTab === "watched" ? "black" : "gray"}
              gap={4}
              component={UnstyledButton}
            >
              <Title size="h3">Просмотренные</Title>
              <Text size="sm">
                {`1 ${pluralize(1, ["фильм", "фильма", "фильмов"])}`}
              </Text>
            </Stack>
            <Stack
              onClick={() => setActiveTab("all")}
              c={activeTab === "all" ? "black" : "gray"}
              gap={4}
              component={UnstyledButton}
            >
              <Title size="h3">Все</Title>
              <Text size="sm">
                {`23 ${pluralize(23, ["фильм", "фильма", "фильмов"])}`}
              </Text>
            </Stack>
          </Group>

          <Group align="center" gap={16}>
            <Select
              size="md"
              radius="md"
              value={genre}
              onChange={(value) => value && setGenre(value)}
              data={[
                {
                  value: "all",
                  label: "Все жанры",
                },
                ...(genres.data?.map((genre) => ({
                  value: genre.id.toString(),
                  label: genre.title,
                })) || []),
              ]}
            />
            <Select
              size="md"
              radius="md"
              value={sortingType}
              onChange={(value) => value && setSortingType(value)}
              allowDeselect={false}
              data={[
                {
                  value: "id",
                  label: "По порядку",
                },
                {
                  value: "by_rating",
                  label: "По рейтингу",
                },
                {
                  value: "by_date",
                  label: "По дате выхода",
                },
                {
                  value: "by_name",
                  label: "По названию",
                },
              ]}
            />
            <Button
              onClick={createModal.open}
              radius="md"
              size="md"
              color="green"
            >
              Добавить
            </Button>
          </Group>
        </Group>

        <Group justify="center" py="lg">
          {movies.isLoading && <Loader />}
        </Group>

        <Stack pb={80} gap={32}>
          {movies.error && responseError(movies.error).isNotImplemented && (
            <NotReleased description="Ожидали получить список фильмов, но произошла ошибка" />
          )}

          {movies.data?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Stack>
      </Container>

      <MovieDrawer opened={isCreateModalOpened} onClose={createModal.close} />
    </>
  )
}
