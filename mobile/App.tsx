import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Auth Context
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Auth Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';

// Client Screens
import ClientHomeScreen from './src/screens/ClientHomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import OrderDetailScreen from './src/screens/OrderDetailScreen';
import ProfessionalOrderDetailScreen from './src/screens/ProfessionalOrderDetailScreen';
import SubscriptionScreen from './src/screens/SubscriptionScreen';

// Professional Screens
import ProfessionalHomeScreen from './src/screens/ProfessionalHomeScreen';
import ProfessionalProfileScreen from './src/screens/ProfessionalProfileScreen';

// Shared Screens (placeholder)
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2ECC71" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f0fdf4' },
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen
              name="RoleSelection"
              component={RoleSelectionScreen}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ animationEnabled: true }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ animationEnabled: true }}
            />
          </>
        ) : user?.role === 'professional' ? (
          // Professional Stack
          <>
            <Stack.Screen
              name="ProfessionalHome"
              component={ProfessionalHomeScreen}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="ProfessionalProfile"
              component={ProfessionalProfileScreen}
              options={{ animationEnabled: true }}
            />
            <Stack.Screen
              name="OrderDetail"
              component={ProfessionalOrderDetailScreen}
              options={{ animationEnabled: true }}
            />
            <Stack.Screen
              name="Subscription"
              component={SubscriptionScreen}
              options={{ animationEnabled: true }}
            />
          </>
        ) : (
          // Client Stack
          <>
            <Stack.Screen
              name="ClientHome"
              component={ClientHomeScreen}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ animationEnabled: true }}
            />
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{ animationEnabled: true }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{ animationEnabled: true }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ animationEnabled: true }}
            />
            {/* Add more client screens here */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
