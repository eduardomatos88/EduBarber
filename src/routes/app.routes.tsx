import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { ParamsList } from '../@types/routesParams'
import Dashboard from '../pages/Dashboard'

const App = createNativeStackNavigator<ParamsList>()

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#312e38' },
    }}>
    <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
)

export default AppRoutes
