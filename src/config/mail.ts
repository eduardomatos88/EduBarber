interface IMailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: 'Equipe EduBarber',
      email: 'equipe@edubarber.com.br',
    },
  },
} as IMailConfig
