import { useMovies } from "@/entities/movie"
import { Divider, Input, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

export function HeaderSearch() {
  const [opened, { close, open }] = useDisclosure()

  const movies = useMovies()

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
      </Modal>
    </>
  )
}
