import { AuthGuard, GuestGuard } from "@/entities/session"
import { LoginPage } from "@/pages/login"
import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./layout"
import { HomePage } from "@/pages/home"
import { GenresPage } from "@/pages/genres"
import { UsersPage } from "@/pages/users"
import { CreateUserPage } from "@/pages/createUser"
import { EditUserPage } from "@/pages/editUser"
import { MovieDetailPage } from "@/pages/movieDetail"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <GuestGuard element={<LoginPage />} />,
  },
  {
    element: <AuthGuard element={<AppLayout />} />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "/genres",
        element: <GenresPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/create",
        element: <CreateUserPage />,
      },
      {
        path: "/users/:userId/edit",
        element: <EditUserPage />,
      },
    ],
  },
])
