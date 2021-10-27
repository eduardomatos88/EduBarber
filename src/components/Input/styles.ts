import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

interface IContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<IContainerProps>`
  background-color: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  border: 2px solid #232129;
  color: #666360;

  ${props =>
    props.isErrored &&
    css`
      color: #c53030;
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}


  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background-color: transparent;
    border: 0;
    color: #f4ede8;
    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`
export const Errors = styled(Tooltip)`
  width: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }
  span {
    background-color: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`
