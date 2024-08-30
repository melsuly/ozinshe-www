import { SessionProvider } from "@/entities/session"
import { MantineProvider, useMantineColorScheme } from "@mantine/core"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { Toaster } from "sonner"
import { theme } from "@/shared/ui"
import "@mantine/core/styles.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
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
