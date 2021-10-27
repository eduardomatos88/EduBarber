import { FC } from 'react'

import SignUp from './pages/SignUp'
import GlobalStyle from './styles/global'

// import SignIn from './pages/SignIn'
const App: FC = function App() {
  return (
    <>
      <SignUp />
      <GlobalStyle />
    </>
  )
}

export default App
