import { ComponentType, FC } from 'react'
import { Redirect, Route as RouteReactRouter, RouteProps } from 'react-router'

import { useAuth } from '../hooks/auth'

interface IRouteProps extends RouteProps {
  isPrivate?: boolean
  component: ComponentType
}

const Route: FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth()
  return (
    <RouteReactRouter
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { location },
            }}
          />
        )
      }}
    />
  )
}

export default Route
