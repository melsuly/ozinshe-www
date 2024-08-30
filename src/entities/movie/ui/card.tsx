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

export function MovieCard() {
  return (
    <Group gap={24} wrap="nowrap" align="flex-start">
      <Image
        w={150}
        src={
          "https://avatars.mds.yandex.net/get-ott/1648503/2a0000019152baced02ee7e6b5a9d4d62e5e/280x420"
        }
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
          to={`/movies/${123}`}
          size="h3"
        >
          Игры (сериал 2024)
        </Title>

        <Stack gap={4}>
          <Text
            style={{
              color: "var(--mantine-color-gray-6)",
            }}
          >
            Бойкот, интриги — и талисман, растопивший миллионы сердец.
            Масштабная драма об Олимпиаде-80
          </Text>
          <Text
            style={{
              color: "var(--mantine-color-gray-6)",
            }}
          >
            Режиссер: Джеймс Эрскин
          </Text>
        </Stack>

        <Button
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://youtu.be/dQw4w9WgXcQ?si=DrGHdT7SRCP-Wqmv"
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

      <Group gap={8}>
        <ActionIcon
          size={40}
          radius={20}
          style={{
            backgroundColor: "var(--mantine-color-gray-3)",
            color: "var(--mantine-color-dark-5)",
          }}
        >
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        </ActionIcon>
        <Popover offset={{ crossAxis: 10, mainAxis: 5 }} position="left-end">
          <Popover.Target>
            <ActionIcon
              size={40}
              radius={20}
              style={{
                backgroundColor: "var(--mantine-color-gray-3)",
                color: "var(--mantine-color-dark-5)",
              }}
            >
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
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </ActionIcon>
          </Popover.Target>

          <Popover.Dropdown>
            <Rating size="xl" />
          </Popover.Dropdown>
        </Popover>
      </Group>
    </Group>
  )
}
