
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ExplorerScreen from './screens/ExplorerScreen';
import PlanningScreen from './screens/PlanningScreen';
import SettingScreen from './screens/SettingScreen';

const Tab = createBottomTabNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Tab.Navigator screenOptions={{ headerShown: false }}>
       <Tab.Screen name="Home" component={HomeScreen} />
       <Tab.Screen name="Explorer" component={ExplorerScreen} />
       <Tab.Screen name="Planning" component={PlanningScreen} />
       <Tab.Screen name="Setting" component={SettingScreen} />
     </Tab.Navigator>
   </NavigationContainer>
 );
}