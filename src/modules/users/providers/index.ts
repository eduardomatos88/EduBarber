import { container } from 'tsyringe'

import BCryptHashProvider from './HashProvider/fakes/FakeHashProvider'
import IHashProvider from './HashProvider/models/IHashProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
