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
import { Movie } from "../model/movie"
import { imageUrl } from "@/shared/api"
import { Link } from "react-router-dom"

export function MovieSearchCard({ movie }: { movie: Movie }) {
  return (
    <Group
      component={Link}
      to={`/movies/${movie.id}`}
      gap={24}
      wrap="nowrap"
      align="flex-start"
      td="none"
      py={16}
    >
      <Image
        w={100}
        src={imageUrl(movie.posterUrl)}
        alt="Movie"
        style={{
          aspectRatio: "2/3",
        }}
      />

      <Stack gap={4} justify='center' align="flex-start" flex={1}>
        <Title td="none" c="dark" size="h5">
          {movie.title}
        </Title>

        <Text
          fz="sm"
          style={{
            color: "var(--mantine-color-gray-6)",
          }}
        >
          {movie.description}
        </Text>
      </Stack>
    </Group>
  )
}
