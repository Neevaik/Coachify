
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import ExplorerScreen from './screens/ExplorerScreen';

const Stack = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Explorer" component={ExplorerScreen} />
        <Stack.Screen name="Planning" component={ExplorerScreen} />
        <Stack.Screen name="Setting" component={ExplorerScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}