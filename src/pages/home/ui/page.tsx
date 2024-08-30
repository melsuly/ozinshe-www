/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGenres } from "@/entities/genre"
import { MovieCard, MovieWatchLaterCard } from "@/entities/movie"
import { pluralize } from "@/shared/lib"
import { Container } from "@/shared/ui"
import {
  Group,
  ScrollArea,
  Select,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core"
import { useState } from "react"

export function HomePage() {
  const [activeTab, setActiveTab] = useState<"watched" | "all">("watched")
  const [sortingType, setSortingType] = useState<string>("by_order")

  const genres = useGenres()

  return (
    <Container>
      <Stack mt={32}>
        <Title size="h2">Буду смотреть</Title>

        <ScrollArea offsetScrollbars>
          <Group gap={16} wrap="nowrap">
            <MovieWatchLaterCard movie={{ id: 0, title: "Повар на колесах" }} />
            <MovieWatchLaterCard movie={{ id: 0, title: "Повар на колесах" }} />
            <MovieWatchLaterCard movie={{ id: 0, title: "Повар на колесах" }} />
            <MovieWatchLaterCard movie={{ id: 0, title: "Повар на колесах" }} />
            <MovieWatchLaterCard movie={{ id: 0, title: "Повар на колесах" }} />
            <MovieWatchLaterCard movie={{ id: 0, title: "Повар на колесах" }} />
            <MovieWatchLaterCard movie={{ id: 0, title: "Повар на колесах" }} />
            <MovieWatchLaterCard movie={{ id: 0, title: "Повар на колесах" }} />
          </Group>
        </ScrollArea>
      </Stack>

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

        <Group gap={16}>
          <Select
            size="md"
            radius="md"
            value={""}
            data={[
              {
                value: "",
                label: "Все жанры",
              },
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
                value: "by_order",
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
        </Group>
      </Group>

      <Stack pb={80} gap={32}>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </Stack>
    </Container>
  )
}
