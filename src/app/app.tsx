import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MantineProvider, useMantineColorScheme } from "@mantine/core"
import { SessionProvider } from "@/entities/session"
import { RouterProvider } from "react-router-dom"
import { theme } from "@/shared/ui"
import { router } from "./router"
import { Toaster } from "sonner"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <MantineProvider forceColorScheme="light" theme={theme}>
          <Content />
        </MantineProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

function Content() {
  const { colorScheme } = useMantineColorScheme()

  return (
    <>
      <Toaster
        theme={colorScheme === "dark" ? "dark" : "light"}
        position="top-right"
        richColors
      />
      <RouterProvider router={router} />
    </>
  )
}
