import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FormHandles } from '@unform/core'
import React, { useCallback, useRef } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import * as Yup from 'yup'

import { ParamsList } from '../../@types/routesParams'
import logoImg from '../../assets/logo.png'
import Button from '../../components/Button'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidationErrors'
import {
  Container,
  ForgotPassword,
  ForgotPasswordText,
  Title,
  CreateAccountButton,
  CreateAccountButtonText,
  SignInForm,
} from './styles'

type Props = NativeStackNavigationProp<ParamsList, 'SignIn'>

interface ISignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation<Props>()

  const handleSignIn = useCallback(async (data: ISignInFormData) => {
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
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
      }
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais',
      )
    }
  }, [])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu login</Title>
            </View>
            <SignInForm onSubmit={handleSignIn} ref={formRef}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
              />
              <Input
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </SignInForm>
            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Crie sua conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
}

export default SignIn
