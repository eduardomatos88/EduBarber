import { FC } from 'react'
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Background, Container, Content } from './styles'

const SignUp: FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="EduBarber" />
      <form>
        <h1>Faça seu cadastro</h1>
        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          type="password"
          icon={FiLock}
          placeholder="Senha"
        />
        <Button type="submit">Cadastrar</Button>
      </form>
      <a href="login">
        <FiArrowLeft /> Voltar para login
      </a>
    </Content>
  </Container>
)

export default SignUp
