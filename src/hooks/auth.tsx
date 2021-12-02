import AsyncStorage from '@react-native-community/async-storage'
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import api from '../services/api'

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
  loading: boolean
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function LoadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@EduBarber:token',
        '@EduBarber:user',
      ])
      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) })
      }
      setLoading(false)
    }
    LoadStorageData()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    })
    const { token, user } = response.data

    await AsyncStorage.multiSet([
      ['@EduBarber:token', token],
      ['@EduBarber:user', JSON.stringify(user)],
    ])
    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@EduBarber:token', '@EduBarber:user'])
  }, [])
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
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
