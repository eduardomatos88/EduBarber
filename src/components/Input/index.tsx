import { useField } from '@unform/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TextInputProps } from 'react-native'

import { Container, TextInput, Icon } from './styles'

interface IInputProps extends TextInputProps {
  name: string
  icon: string
}

interface IInputValueReference {
  value: string
}

const Input: React.FC<IInputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null)
  const { registerField, defaultValue, fieldName, error } = useField(name)
  const inputValueRef = useRef<IInputValueReference>({ value: defaultValue })

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])
  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputValueRef.current.value)
  }, [])

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      },
    })
  }, [registerField, fieldName])

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
        {...rest}
      />
    </Container>
  )
}

export default Input
