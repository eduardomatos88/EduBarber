import { ButtonHTMLAttributes, FC } from 'react'

import { Container } from './styles'

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<IButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
)

export default Button
