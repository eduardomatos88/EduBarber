import aws from 'aws-sdk'
import nodemailer, { Transporter } from 'nodemailer'
import { inject, injectable } from 'tsyringe'

import mailConfig from '@config/mail'

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2021-12-01',
      }),
    })
  }
  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from
    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.address || email,
      },
      to,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })
  }
}

export default SESMailProvider
