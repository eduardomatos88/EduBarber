import { createContext, FC, useCallback, useContext, useState } from 'react'
import { v4 } from 'uuid'

import ToastContainer from '../components/ToastContainer'

export interface IToastMessage {
  id: string
  type?: 'info' | 'success' | 'error'
  title: string
  description?: string
}

interface IToastContext {
  addToast(message: Omit<IToastMessage, 'id'>): void
  removeToast(id: string): void
}

const ToastContext = createContext<IToastContext>({} as IToastContext)

export const ToastProvider: FC = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([])

  const addToast = useCallback(
    ({ type, title, description }: Omit<IToastMessage, 'id'>) => {
      const id = v4()
      const toast = {
        id,
        type,
        title,
        description,
      }
      setMessages(oldMessages => [...oldMessages, toast])
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
