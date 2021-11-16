import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar, View } from 'react-native'

import AppProvider from './hooks'
import AuthRoutes from './routes/auth.routes'

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <AppProvider>
      <View style={{ backgroundColor: '#312e38', flex: 1 }}>
        <AuthRoutes />
      </View>
    </AppProvider>
  </NavigationContainer>
)

export default App
