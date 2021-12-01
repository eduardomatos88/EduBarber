import { ButtonHTMLAttributes, FC } from 'react'

import { Container } from './styles'

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const Button: FC<IButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
)

export default Button
