import LoginPage from './src/screens/LoginPage'
import DashboardPage from './src/screens/DashboardPage'
import Gallery from './src/screens/Gallery'
import {
  createAppContainer,
  createStackNavigator
} from 'react-navigation'


const AppNavigaton = createStackNavigator({
  Home:LoginPage,
  Gallery:Gallery,
  Dashboard:DashboardPage,
})

const App = createAppContainer(AppNavigaton)

export default App;