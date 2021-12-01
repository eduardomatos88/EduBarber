import { FC } from 'react'
import { Switch } from 'react-router'

import Dashboard from '../pages/Dashboard'
import ForgotPassword from '../pages/ForgotPassword'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Route from './Route'

const Routes: FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
)

export default Routes
