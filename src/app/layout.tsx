import { HeaderNavigation } from "@/widgets/headerNavigation"
import { HeaderSearch } from "@/widgets/headerSearch"
import { HeaderUser } from "@/widgets/headerUser"
import { AppShell, Group } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { Container } from "@/shared/ui"

export function AppLayout() {
  return (
    <AppShell
      header={{
        height: 75,
      }}
    >
      <AppShell.Header bg="dark" c="white" px={32}>
        <Container>
          <Group h='100%' justify="space-between">
            <HeaderNavigation />
            <HeaderSearch />
            <HeaderUser />
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
