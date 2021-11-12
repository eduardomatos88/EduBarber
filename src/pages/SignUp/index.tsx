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
  BackToSignIn,
  BackToSignInText,
  Container,
  SignUpForm,
  Title,
} from './styles'

type Props = NativeStackNavigationProp<ParamsList>

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation<Props>()

  const handleSignUp = useCallback(async (data: { name: string }) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
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
        'Ocorreu um erro ao fazer o cadastro, cheque as credenciais',
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
              <Title>Crie sua conta</Title>
            </View>
            <SignUpForm onSubmit={handleSignUp} ref={formRef}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
              />
              <Input
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
              />
              <Input
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </SignUpForm>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#ffffff" />
        <BackToSignInText>Voltar para login</BackToSignInText>
      </BackToSignIn>
    </>
  )
}

export default SignUp
