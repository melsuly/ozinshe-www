import { ActionIcon, Container, Image, Stack, Text } from "@mantine/core"
import { Movie } from "../model/movie"
import { Link } from "react-router-dom"
import { useHover } from '@mantine/hooks'

export function MovieWatchLaterCard({ movie }: { movie: Movie }) {
  const { ref, hovered } = useHover()

  return (
    <Stack pos="relative">
      <Container
        component={Link}
        to={`/movies/${movie.id}`}
        pos="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
      />

      <Container ref={ref} pos="relative" h={130} style={{ aspectRatio: "16/9" }} p={0}>
        <Image
          src={
            "https://avatars.mds.yandex.net/get-ott/200035/2a0000016128ca489a003dd99698011973ca/672x438"
          }
          alt={movie.title}
          fit="cover"
          style={{ pointerEvents: "none" }}
        />

        <ActionIcon
          pos="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 100ms ease",
          }}
          size={40}
          radius="xl"
          color="orange"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width={32}
            height={32}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </ActionIcon>
      </Container>

      <Text size="md" fw={500}>
        {movie.title}
      </Text>
    </Stack>
  )
}
