import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="dark" />
            <Stack.Navigator
                id="RootStack"
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#f0fdf4' } // medical-50
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Map" component={MapScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
