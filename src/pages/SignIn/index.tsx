import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FC, useCallback, useRef } from 'react'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidationErrors'
import { Background, Container, Content } from './styles'

const SignIn: FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: { name: string }) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      })
      await schema.validate(data, {
        abortEarly: false,
      })
    } catch (error) {
      const errors = getValidationErrors(error as Yup.ValidationError)
      formRef.current?.setErrors(errors)
    }
  }, [])
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="EduBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="login">
          <FiLogIn /> Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn
