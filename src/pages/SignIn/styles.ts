import { Form } from '@unform/mobile'
import { Platform } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 100 : 40}px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`

export const ForgotPasswordText = styled.Text`
  font-size: 16px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const CreateAccountButtonText = styled.Text`
  font-size: 18px;
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`

export const SignInForm = styled(Form)`
  width: 100%;
`
