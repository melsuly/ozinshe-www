import { useSession } from "@/entities/session"
import { config } from "@/shared/lib"
import {
  Avatar,
  Button,
  Divider,
  Group,
  Modal,
  Popover,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

export function HeaderUser() {
  const { userInfo, logout } = useSession()
  const [opened, { close, open }] = useDisclosure()

  if (!config.features.authorization) {
    return null
  }

  return (
    <>
      <Popover position="bottom-end">
        <Popover.Target>
          <Group component={UnstyledButton}>
            <Avatar color={"white"} size={60} />
          </Group>
        </Popover.Target>
        <Popover.Dropdown
          c="white"
          style={{ borderRadius: "12px" }}
          py={16}
          px={24}
          className="header-popover"
        >
          <Stack>
            <Stack gap={4}>
              <Text fz="lg" fw={600}>
                {userInfo?.name}
              </Text>
              <Text style={{ color: "var(--mantine-color-dark-1" }}>
                {userInfo?.email}
              </Text>
            </Stack>

            <Divider color="gray" />

            <UnstyledButton w="100%" fz="lg" fw={600} onClick={open} c="red">
              <Group>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width={24}
                  height={24}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                Выйти
              </Group>
            </UnstyledButton>
          </Stack>
        </Popover.Dropdown>
      </Popover>
      <Modal
        radius="lg"
        centered
        opened={opened}
        onClose={close}
        withCloseButton={false}
      >
        <Title mt={8} mb={24} ta="center" size="h3">
          Вы хотите выйти из аккаунта?
        </Title>

        <Group mb={8} grow mt={16} justify="flex-end">
          <Button size="md" radius="md" onClick={logout} color="red">
            Выйти
          </Button>
          <Button
            color="blue"
            size="md"
            radius="md"
            onClick={close}
            variant="outline"
          >
            Отмена
          </Button>
        </Group>
      </Modal>
    </>
  )
}
