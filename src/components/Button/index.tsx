import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { ButtonText, Container } from './styles'

interface IButtonProps extends TouchableOpacityProps {
  children: string
}

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
)

export default Button
