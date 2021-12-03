import { ValidationError } from 'yup'

interface IValidationErrors {
  [key: string]: string
}

function gatValidationErrors(err: ValidationError): IValidationErrors {
  const validationErrors: IValidationErrors = {}
  err.inner.forEach(error => {
    validationErrors[error.path || ''] = error.message
  })
  return validationErrors
}

export default gatValidationErrors
