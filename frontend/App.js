import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ExplorerScreen from './screens/ExplorerScreen';
import PlanningScreen from './screens/PlanningScreen';
import SettingScreen from './screens/SettingScreen';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore({
  reducer: { user },
})

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
        
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Explorer') {
          iconName = 'search';
        } else if (route.name === 'Planning') {
          iconName = 'calendar';
        } else if (route.name === 'Settings') {
          iconName = 'cog';
        }
        
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ec6e5b',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explorer" component={ExplorerScreen} />
      <Tab.Screen name="Planning" component={PlanningScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
