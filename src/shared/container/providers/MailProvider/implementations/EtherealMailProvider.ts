import nodemailer, { Transporter } from 'nodemailer'
import { inject, injectable } from 'tsyringe'

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })
      this.client = transporter
    })
  }
  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe EduBarber',
        address: from?.address || 'equipe@edubarber.com.br',
      },
      to,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })
    // eslint-disable-next-line no-console
    console.log('Mensagem enviada: $s', message.messageId)
    // eslint-disable-next-line no-console
    console.log('Preview URL: $s', nodemailer.getTestMessageUrl(message))
  }
}

export default EtherealMailProvider
