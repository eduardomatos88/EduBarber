import { createContext, FC, useCallback, useContext, useState } from 'react'

import api from '../services/apiClient'

interface IAuthState {
  user: object
  token: string
}

interface ISignInCredentials {
  email: string
  password: string
}

interface IAuthContext {
  user: object
  signIn(credentials: ISignInCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@EduBarber:token')
    const user = localStorage.getItem('@EduBarber:user')

    if (token && user) {
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
    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@EduBarber:token')
    localStorage.removeItem('@EduBarber:user')
  }, [])
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
