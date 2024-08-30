import { config } from "@/shared/lib"
import { useSession } from "./useSession"
import { Navigate } from "react-router-dom"

export function AuthGuard({ element }: { element?: React.ReactNode }) {
  const session = useSession()

  if (config.features.authorization && !session.isAuthenticated)
    return <Navigate to="/login" />

  return element
}

export function GuestGuard({ element }: { element?: React.ReactNode }) {
  const session = useSession()

  if (!config.features.authorization || session.isAuthenticated)
    return <Navigate to="/" />

  return element
}
