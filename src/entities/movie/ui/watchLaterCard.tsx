import { ActionIcon, Container, Image, Stack, Text } from "@mantine/core"
import { Movie } from "../model/movie"
import { Link } from "react-router-dom"
import { useHover } from "@mantine/hooks"
import { imageUrl } from "@/shared/api"
import { useUpdateWatchLater } from "../lib/useUpdateWatchLater"

export function MovieWatchLaterCard({ movie }: { movie: Movie }) {
  const { ref, hovered } = useHover()

  const updateWatchLater = useUpdateWatchLater()

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

      <Container
        ref={ref}
        pos="relative"
        h={130}
        style={{
          height: "100px",
          width: "150px",
          overflow: "hidden",
        }}
        p={0}
      >
        <Image
          src={imageUrl(movie.posterUrl)}
          alt={movie.title}
          style={{
            height: "100%",
            width: "100%",
            pointerEvents: "none",
            objectFit:"cover",
            objectPosition: "center",
          }}
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
          onClick={() =>
            updateWatchLater.mutate({ movieId: movie.id, isCreate: false })
          }
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

      <Text size="md" fw={500} c={"white"}>
        {movie.title}
      </Text>
    </Stack>
  )
}
