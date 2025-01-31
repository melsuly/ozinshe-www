import { createContext } from "react"
import { UserInfo } from './userInfo'

export type SessionContextType = {
  authorize: (token: string) => void
  logout: () => void
  userInfo: UserInfo | null
  isAuthenticated: boolean
}

export const SessionContext = createContext<SessionContextType | null>(null)
