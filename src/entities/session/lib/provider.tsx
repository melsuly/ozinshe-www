import { config, useLocalStorageSync } from "@/shared/lib"
import { SessionContext } from "../model/context"
import { useCallback, useEffect, useState } from "react"
import { getUserInfo } from "../api/getUserInfo"
import { UserInfo } from "../model/userInfo"

export function SessionProvider({ children }: { children?: React.ReactNode }) {
  const [token, setToken] = useLocalStorageSync(config.tokenStorageKey)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const authorize = useCallback(
    (token: string) => {
      setToken(token)
    },
    [setToken],
  )

  const logout = useCallback(() => setToken(null), [setToken])

  useEffect(() => {
    getUserInfo().then(setUserInfo).catch(logout)
  }, [token, logout])

  return (
    <SessionContext.Provider
      value={{
        authorize,
        logout,
        userInfo,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
