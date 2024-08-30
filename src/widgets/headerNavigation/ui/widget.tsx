import {
  Anchor,
  Group,
  Popover,
  Stack,
  Text,
  UnstyledButton,
  Burger,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Link, NavLink, useLocation } from "react-router-dom"
import { LogoOzinsheFull } from "@/shared/assets"
import "./widget.css"

const navItems = [
  {
    to: "/",
    title: "Главная",
    icon: (
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
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    to: "/genres",
    title: "Жанры",
    icon: (
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
          d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
        />
      </svg>
    ),
  },
  {
    to: "/users",
    title: "Пользователи",
    icon: (
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
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
    ),
  },
]

export function HeaderNavigation() {
  const [opened, { close, open, toggle }] = useDisclosure(false)
  const { pathname } = useLocation()

  return (
    <Popover
      position="bottom-start"
      opened={opened}
      onClose={close}
      closeOnClickOutside
      width={300}
      shadow="md"
    >
      <Popover.Target>
        <Group pos="relative" onMouseEnter={open}>
          <Group>
            <Burger color="white" opened={opened} onClick={toggle} />
            <Anchor h={28} component={Link} to="/" c="white">
              <LogoOzinsheFull height={28} />
            </Anchor>
          </Group>
          <UnstyledButton
            pos="absolute"
            top={-20}
            left={-20}
            right={-20}
            bottom={-20}
            onMouseLeave={close}
            style={{ pointerEvents: "none" }}
          ></UnstyledButton>
        </Group>
      </Popover.Target>

      <Popover.Dropdown
        style={{ borderRadius: "16px" }}
        py={16}
        px={24}
        ml={-24}
        onMouseEnter={open}
        onMouseLeave={close}
        className="header-popover"
      >
        <Stack gap={20} py={8}>
          {navItems.map((item) => {
            const isActive = pathname === item.to

            return (
              <Anchor component={NavLink} key={item.to} to={item.to} td="none">
                <Group
                  gap={16}
                  style={{
                    color: isActive
                      ? "var(--mantine-color-white)"
                      : "var(--mantine-color-dark-1)",
                  }}
                >
                  {item.icon}
                  <Text inherit fw={600} fz="lg">
                    {item.title}
                  </Text>
                </Group>
              </Anchor>
            )
          })}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}
