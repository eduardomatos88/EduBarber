import { FC } from 'react'

import SignIn from './pages/SignIn'
import GlobalStyle from './styles/global'

const App: FC = function App() {
  return (
    <>
      <SignIn />
      <GlobalStyle />
    </>
  )
}

export default App
