import { renderHook } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'
import { act } from 'react-dom/test-utils'

import { AuthProvider, useAuth } from '../../hooks/auth'
import api from '../../services/apiClient'

const apiMock = new MockAdapter(api)

describe('Auth hook', () => {
  it('should be able to login', async () => {
    const apiResponse = {
      user: { id: 'user', name: 'John Doe', email: 'johndoe@example.com' },
      token: 'token',
    }
    apiMock.onPost('sessions').reply(200, apiResponse)
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })
    result.current.signIn({
      email: 'johndoe@example.com',
      password: '123456',
    })
    await waitForNextUpdate()
    expect(result.current.user.email).toEqual('johndoe@example.com')
    expect(setItemSpy).toHaveBeenCalledTimes(2)
    expect(setItemSpy).toHaveBeenCalledWith(
      '@EduBarber:token',
      apiResponse.token,
    )
    expect(setItemSpy).toHaveBeenCalledWith(
      '@EduBarber:user',
      JSON.stringify(apiResponse.user),
    )
  })

  it('should restore saved data from storage when auth inits', async () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(key => {
      switch (key) {
        case '@EduBarber:token':
          return 'token'

        case '@EduBarber:user':
          return JSON.stringify({
            id: 'user',
            name: 'John Doe',
            email: 'johndoe@example.com',
          })

        default:
          return null
      }
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    expect(result.current.user.email).toEqual('johndoe@example.com')
  })

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(key => {
      switch (key) {
        case '@EduBarber:token':
          return 'token'

        case '@EduBarber:user':
          return JSON.stringify({
            id: 'user',
            name: 'John Doe',
            email: 'johndoe@example.com',
          })

        default:
          return null
      }
    })

    const removeItemSPY = jest.spyOn(Storage.prototype, 'removeItem')

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    act(() => {
      result.current.signOut()
    })

    expect(removeItemSPY).toBeCalledTimes(2)

    expect(result.current.user).toBeUndefined()
  })
  it('should be able to update user', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    const user = {
      id: 'user',
      name: 'John Doe',
      email: 'johndoe@example.com',
      avatar_url: 'test',
    }

    act(() => {
      result.current.updateUser(user)
    })

    expect(setItemSpy).toHaveBeenCalledWith(
      '@EduBarber:user',
      JSON.stringify(user),
    )
    expect(result.current.user).toEqual(user)
  })
})
