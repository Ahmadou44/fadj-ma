import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

interface RoleSelectionScreenProps {
  navigation: any;
  onRoleSelected: (role: 'client' | 'professional') => void;
}

export default function RoleSelectionScreen({ navigation, onRoleSelected }: RoleSelectionScreenProps) {
  const [selectedRole, setSelectedRole] = useState<'client' | 'professional' | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelected(selectedRole);
      navigation.navigate('Register', { role: selectedRole });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Qui êtes-vous ?</Text>
          <Text className="text-gray-600">Choisissez votre type de compte pour commencer</Text>
        </View>

        {/* Role Cards */}
        <View className="space-y-4 flex-1">
          {/* Client Card */}
          <TouchableOpacity
            onPress={() => setSelectedRole('client')}
            className={`p-6 rounded-2xl border-2 ${
              selectedRole === 'client'
                ? 'border-medical-600 bg-medical-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-medical-100 rounded-full items-center justify-center mr-4">
                <Text className="text-3xl">👤</Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">Patient</Text>
                <Text className="text-sm text-gray-600 mt-1">
                  Cherchez et commandez des médicaments
                </Text>
              </View>
              {selectedRole === 'client' && (
                <View className="w-6 h-6 bg-medical-600 rounded-full items-center justify-center">
                  <Text className="text-white font-bold">✓</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Professional Card */}
          <TouchableOpacity
            onPress={() => setSelectedRole('professional')}
            className={`p-6 rounded-2xl border-2 ${
              selectedRole === 'professional'
                ? 'border-medical-600 bg-medical-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-4">
                <Text className="text-3xl">🏥</Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">Professionnel</Text>
                <Text className="text-sm text-gray-600 mt-1">
                  Gérez votre pharmacie ou cabinet
                </Text>
              </View>
              {selectedRole === 'professional' && (
                <View className="w-6 h-6 bg-medical-600 rounded-full items-center justify-center">
                  <Text className="text-white font-bold">✓</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Info Box */}
        <View className="bg-blue-50 p-4 rounded-xl mb-6 mt-8">
          <Text className="text-sm text-blue-900">
            <Text className="font-bold">💡 Conseil :</Text> Vous pouvez changer votre type de compte plus tard dans les paramètres
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selectedRole}
          className={`w-full p-4 rounded-xl items-center ${
            selectedRole
              ? 'bg-medical-600 active:bg-medical-700'
              : 'bg-gray-300'
          }`}
        >
          <Text className="text-white font-bold text-lg">
            Continuer
          </Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-full p-4 rounded-xl items-center mt-3"
        >
          <Text className="text-medical-600 font-semibold">Retour</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
