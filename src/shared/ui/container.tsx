import { Container as MantineContainer } from "@mantine/core"

export function Container({ children }: { children?: React.ReactNode }) {
  return <MantineContainer h='100%' maw={1200}>{children}</MantineContainer>
}
