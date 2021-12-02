import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { ChangeEvent, FC, useCallback, useRef } from 'react'
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import api from '../../services/apiClient'
import getValidationErrors from '../../utils/getValidationErrors'
import { AvatarInput, Container, Content } from './styles'

interface IProfileFormData {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

const Profile: FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()
  const { user, updateUser } = useAuth()

  const handleSubmit = useCallback(
    async (data: IProfileFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string()
              .required('Campo obrigatório')
              .min(6, 'Mínimo de 6 caracteres'),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string()
                .required('Campo obrigatório')
                .min(6, 'Mínimo de 6 caracteres'),
            })
            .oneOf([Yup.ref('password'), null], 'Senhas diferentes'),
        })
        await schema.validate(data, {
          abortEarly: false,
        })

        const { name, email, old_password, password, password_confirmation } =
          data

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        }

        const response = await api.put('/profile', formData)

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        })

        updateUser(response.data)
        history.push('/dashboard')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar ser perfil, tente novamente',
        })
      }
    },
    [addToast, history, updateUser],
  )

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData()
        data.append('avatar', e.target.files[0])
        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data)
          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          })
        })
      }
    },
    [addToast, updateUser],
  )

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu perfil</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            type="password"
            icon={FiLock}
            placeholder="Senha atual"
          />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Nova senha"
          />
          <Input
            name="password_confirmation"
            type="password"
            icon={FiLock}
            placeholder="Confirmar senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile
