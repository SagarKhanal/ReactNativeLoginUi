import LoginPage from './src/screens/LoginPage'
import DashboardPage from './src/screens/DashboardPage'
import {
  createAppContainer,
  createStackNavigator
} from 'react-navigation'


const AppNavigaton = createStackNavigator({
  Home:LoginPage,
  Dashboard:DashboardPage,
})

const App = createAppContainer(AppNavigaton)

export default App;