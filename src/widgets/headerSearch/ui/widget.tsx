import { MovieSearchCard, useMovies } from "@/entities/movie"
import {
  Divider,
  Group,
  Input,
  Loader,
  Modal,
  Stack,
  Text,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export function HeaderSearch() {
  const location = useLocation()
  const [opened, { close, open }] = useDisclosure()
  const [searchTerm, setSearchTerm] = useState<string>("")

  const movies = useMovies({ searchTerm })

  useEffect(() => {
    close()
  }, [location, close])

  return (
    <>
      <Input
        onClick={open}
        component="button"
        style={{
          "--input-bg": "var(--mantine-color-dark-4)",
          "--input-bd": "transparent",
        }}
        rightSection={
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width={16}
            height={16}
            style={{
              color: "var(--mantine-color-dark-1)",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        }
      >
        <Text
          inherit
          style={{
            color: "var(--mantine-color-dark-1)",
          }}
        >
          Фильмы, сериалы и мультфильмы
        </Text>
      </Input>

      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          variant="unstyled"
          placeholder="Поиск"
          leftSection={
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width={16}
              height={16}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          }
        />
        <Divider my={8} />
        {movies.isLoading && (
          <Group py="lg" justify="center" mt={32}>
            <Loader size="sm" />
          </Group>
        )}
        <Stack>
          {movies.data?.map((movie) => (
            <MovieSearchCard key={movie.id} movie={movie} />
          ))}
        </Stack>
      </Modal>
    </>
  )
}
