export default {
  jwt: {
    secret: process.env.APP_SECRET || 'testes-em-desenvolvimento',
    expiresIn: '1d',
  },
}
