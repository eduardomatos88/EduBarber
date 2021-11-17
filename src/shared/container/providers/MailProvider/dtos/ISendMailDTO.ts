import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO'

interface IMailContext {
  name: string
  address: string
}

interface ISendMailDTO {
  to: IMailContext
  from?: IMailContext
  subject: string
  templateData: IParseMailTemplateDTO
}

export default ISendMailDTO
