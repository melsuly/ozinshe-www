import {
  ActionIcon,
  Button,
  Group,
  Image,
  Popover,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { Link } from "react-router-dom"
import { Movie } from "../model/movie"
import { useUpdateWatchLater } from "../lib/useUpdateWatchLater"
import { useEffect, useState } from "react"
import { useUpdateMovieRate } from "../lib/useUpdateMovieRate"
import { imageUrl } from "@/shared/api"
import { useDisclosure, useHover } from "@mantine/hooks"
import { MovieDrawer } from "@/widgets/movieDrawer"
import { ConfirmDeleteModal } from "@/widgets/confirmDeleteModal/ui/widget"
import { useDeleteMovie } from "../lib/useDeleteMovie"
import { useSetWatched } from "../lib/useSetWatched"
import dayjs from "dayjs"

export function MovieCard({ movie }: { movie: Movie }) {
  const updateWatchLater = useUpdateWatchLater()
  const updateMovieRate = useUpdateMovieRate()
  const deleteMovie = useDeleteMovie()
  const setWatched = useSetWatched()
  const [rate, setRate] = useState<number>(0)
  const { ref, hovered } = useHover()

  const [isEditDrawerOpened, editDrawer] = useDisclosure()
  const [isDeleteModalOpened, deleteModal] = useDisclosure()

  const handleUpdateRate = (rate: number) => {
    setRate(rate)
    updateMovieRate.mutate({ movieId: movie.id, rating: rate })
  }

  useEffect(() => {
    setRate(movie.rating)
  }, [movie.rating])

  return (
    <>
      <Group
        gap={24}
        wrap="nowrap"
        align="flex-start"
        ref={ref}
        style={{
          padding: "2em",
          borderRadius: "10px",
          backgroundColor: hovered ? "var(--mantine-color-gray-0)" : "white",
          transition: "background-color .2s ease-in-out",
        }}
      >
        <Image
          w={100}
          src={imageUrl(movie.posterUrl)}
          alt="Movie"
          style={{
            aspectRatio: "2/3",
          }}
        />

        <Stack align="flex-start" flex={1}>
          <Title
            td="none"
            c="dark"
            component={Link}
            to={`/movies/${movie.id}`}
            size="h3"
          >
            {movie.title}
          </Title>

          <Stack gap={4}>
            <Text
              style={{
                color: "var(--mantine-color-gray-6)",
              }}
            >
              {movie.description}
            </Text>
            <Text
              style={{
                color: "var(--mantine-color-gray-6)",
              }}
            >
              Год производства: {dayjs(movie.dateOfRelease).format("YYYY")}
            </Text>
            <Text
              style={{
                color: "var(--mantine-color-gray-6)",
              }}
            >
              Режиссер: {movie.director}
            </Text>
          </Stack>

          <Button
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href={movie.trailerUrl}
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
            style={{
              backgroundColor: "var(--mantine-color-gray-1)",
              color: "var(--mantine-color-dark-9)",
            }}
            radius="xl"
            size="sm"
          >
            Трейлер
          </Button>
        </Stack>

        <Stack h="100%">
          <Group gap={8}>
            <Button
              component="button"
              leftSection={
                <svg
                  fill={"none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width={18}
                  height={18}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              }
              style={{
                height: "32px",
                backgroundColor: "var(--mantine-color-gray-1)",
                color: "var(--mantine-color-dark-9)",
              }}
              onClick={() =>
                updateWatchLater.mutate({
                  movieId: movie.id,
                  isCreate: true
                })
              }
              radius="xl"
              size="sm"
            >
              Буду смотреть
            </Button>
            <ActionIcon
              onClick={() =>
                setWatched.mutate({
                  movieId: movie.id,
                  isWatched: !movie.isWatched,
                })
              }
              size={32}
              radius={16}
              style={{
                backgroundColor: "var(--mantine-color-gray-1)",
                color: "var(--mantine-color-dark-5)",
              }}
            >
              {movie.isWatched ? (
                <svg
                  width="24"
                  height="24"
                  fill="#f50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.25 12S18.213 19 12 19 .75 12 .75 12 5.787 5 12 5s11.25 7 11.25 7Zm-7.75 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  fill="rgba(0, 0, 0, 0.4)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.33 13.985c.757-.698 1.4-1.4 1.891-1.985a21.948 21.948 0 0 0-1.892-1.985C16.422 8.26 14.182 6.9 12 6.9c-2.182 0-4.422 1.36-6.33 3.115-.757.698-1.4 1.4-1.891 1.985a21.94 21.94 0 0 0 1.892 1.985C7.578 15.74 9.818 17.1 12 17.1c2.182 0 4.422-1.36 6.33-3.115ZM12 4.5C5.787 4.5.75 12 .75 12S5.787 19.5 12 19.5 23.25 12 23.25 12 18.213 4.5 12 4.5Zm9.26 6.159ZM15 11.999a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </ActionIcon>
            <Popover
              offset={{ crossAxis: 10, mainAxis: 5 }}
              position="left-end"
            >
              <Popover.Target>
                <ActionIcon
                  size={32}
                  radius={20}
                  style={{
                    backgroundColor:
                      rate === 0
                        ? "var(--mantine-color-gray-1)"
                        : rate === 4 || rate === 5
                          ? "var(--mantine-color-green-3)"
                          : "var(--mantine-color-red-3)",
                    color: "var(--mantine-color-dark-5)",
                  }}
                >
                  {rate > 0 ? (
                    <Text fz="lg" fw="700">
                      {rate}
                    </Text>
                  ) : (
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      width={18}
                      height={18}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  )}
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Rating value={rate} onChange={handleUpdateRate} size="lg" />
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Stack>

        <Stack h="100%">
          <Group gap={8}>
            <ActionIcon
              onClick={editDrawer.open}
              size={32}
              radius={16}
              style={{
                backgroundColor: "var(--mantine-color-gray-1)",
                color: "var(--mantine-color-dark-5)",
              }}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width={18}
                height={18}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </ActionIcon>
            <ActionIcon
              onClick={deleteModal.open}
              size={32}
              radius={20}
              style={{
                backgroundColor: "var(--mantine-color-gray-1)",
                color: "var(--mantine-color-dark-5)",
              }}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width={18}
                height={18}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </ActionIcon>
          </Group>
        </Stack>
      </Group>

      <MovieDrawer
        id={movie.id}
        opened={isEditDrawerOpened}
        onClose={editDrawer.close}
      />

      <ConfirmDeleteModal
        opened={isDeleteModalOpened}
        onClose={deleteModal.close}
        onConfirm={() => {
          deleteMovie.mutate({ id: movie.id })
          deleteModal.close()
        }}
      />
    </>
  )
}
