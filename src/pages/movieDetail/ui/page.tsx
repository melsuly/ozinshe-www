import { useUpdateMovieRate, useUpdateWatchLater } from "@/entities/movie"
import { useMovieDetail } from "@/entities/movie/lib/useMovieDetail"
import { imageUrl, responseError } from "@/shared/api"
import { Container } from "@/shared/ui"
import { NotReleased } from "@/widgets/notReleased"
import {
  Button,
  Group,
  Image,
  Rating,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function MovieDetailPage() {
  const params = useParams()
  const movieId = Number(params["movieId"])
  const movieDetail = useMovieDetail({ id: movieId })
  const updateMovieRate = useUpdateMovieRate()
  const updateWatchLater = useUpdateWatchLater()

  const [rate, setRate] = useState<number>(0)

  const handleUpdateRate = (rate: number) => {
    setRate(rate)
    updateMovieRate.mutate({ movieId: movieId, rating: rate })
  }

  useEffect(() => {
    if (movieDetail.data) setRate(movieDetail.data.rating)
  }, [movieDetail.data])

  if (movieDetail.error && responseError(movieDetail.error).isNotImplemented)
    return (
      <NotReleased description="Ожидали получить информацию о фильме, но произошла ошибка" />
    )

  if (!movieDetail.isSuccess) return null

  return (
    <Container>
      <Group gap={40} py={32} align="flex-start">
        <Image
          src={imageUrl(movieDetail.data.posterUrl)}
          alt={movieDetail.data.title}
          style={{
            minWidth: "240px",
            aspectRatio: "2 / 3",
          }}
        />

        <Stack flex={1}>
          <Title>{movieDetail.data.title}</Title>

          <Table my="md" withRowBorders={false}>
            <Table.Tr>
              <Table.Td c="gray">Год производства</Table.Td>
              <Table.Td>
                {movieDetail.data.releaseYear}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td c="gray">Жанр</Table.Td>
              <Table.Td>
                {movieDetail.data.genres.map((g) => g.title).join(", ")}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td c="gray">Режиссер</Table.Td>
              <Table.Td>{movieDetail.data.director}</Table.Td>
            </Table.Tr>
          </Table>

          <Group grow>
            <Button
              style={{
                backgroundColor: "var(--mantine-color-gray-3)",
                color: "var(--mantine-color-gray-9)",
              }}
              size="md"
              radius="lg"
              component="a"
              href={movieDetail.data.trailerUrl}
              target="_blank"
              rel="noreferrer noopener"
              leftSection={
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width={20}
                  height={20}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              }
            >
              Трейлер
            </Button>
            <Button
              style={{
                backgroundColor: "var(--mantine-color-gray-3)",
                color: "var(--mantine-color-gray-9)",
              }}
              color="gray"
              size="md"
              radius="lg"
              onClick={() =>
                updateWatchLater.mutate({
                  movieId: movieDetail.data.id,
                  isCreate: true
                })
              }
              leftSection={
                <svg
                  fill={movieDetail.data.isWatched ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width={20}
                  height={20}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              }
            >
              Буду смотреть
            </Button>
          </Group>

          <Text my="lg" size="md">
            {movieDetail.data.description}
          </Text>
        </Stack>

        <Stack w="240px">
          <Title size="h3">Рейтинг фильма</Title>

          <Rating size="lg" value={rate} onChange={handleUpdateRate} />
        </Stack>
      </Group>
    </Container>
  )
}
