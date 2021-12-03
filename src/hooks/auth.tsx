import { createContext, FC, useCallback, useContext, useState } from 'react'

import api from '../services/apiClient'

interface IUser {
  id: string
  avatar_url: string
  name: string
  email: string
}

interface IAuthState {
  user: IUser
  token: string
}

interface ISignInCredentials {
  email: string
  password: string
}

interface IAuthContext {
  user: IUser
  signIn(credentials: ISignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: IUser): void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@EduBarber:token')
    const user = localStorage.getItem('@EduBarber:user')

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      return { token, user: JSON.parse(user) }
    }
    return {} as IAuthState
  })
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    })
    const { token, user } = response.data

    localStorage.setItem('@EduBarber:token', token)
    localStorage.setItem('@EduBarber:user', JSON.stringify(user))

    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@EduBarber:token')
    localStorage.removeItem('@EduBarber:user')
    setData({} as IAuthState)
  }, [])

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@EduBarber:user', JSON.stringify(user))
      setData({
        token: data.token,
        user,
      })
    },
    [setData, data.token],
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  return context
}
