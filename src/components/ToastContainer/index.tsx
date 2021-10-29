import { FC } from 'react'
import { useTransition } from 'react-spring'

import { IToastMessage } from '../../hooks/toast'
import { Container } from './styles'
import Toast from './Toast'

interface IToastContainerProps {
  messages: IToastMessage[]
}

const ToastContainer: FC<IToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  })
  return (
    <Container>
      {messagesWithTransitions((styles, item) => (
        <Toast key={item.id} style={styles} message={item} />
      ))}
    </Container>
  )
}

export default ToastContainer
