import { config, useLocalStorageSync } from "@/shared/lib"
import { SessionContext } from "../model/context"
import { useCallback, useEffect, useState } from "react"
import { getUserInfo } from "../api/getUserInfo"
import { UserInfo } from "../model/userInfo"

export function SessionProvider({ children }: { children?: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(config.tokenStorageKey),
  )
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const authorize = useCallback(
    (token: string) => {
      setToken(token)
    },
    [setToken],
  )

  const logout = useCallback(() => setToken(null), [setToken])

  const isAuthenticated = token !== null

  useEffect(() => {
    if (token) {
      localStorage.setItem(config.tokenStorageKey, token)
      getUserInfo().then(setUserInfo).catch(logout)
    } else {
      localStorage.removeItem(config.tokenStorageKey)
      setUserInfo(null)
    }
  }, [token, logout])

  return (
    <SessionContext.Provider
      value={{
        authorize,
        logout,
        userInfo,
        isAuthenticated,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
