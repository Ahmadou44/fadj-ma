import { View, Text, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-medical-600 px-6 pt-4 pb-8">
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text className="text-white text-2xl">←</Text>
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Mon Profil</Text>
            <TouchableOpacity
              onPress={() => setIsEditing(!isEditing)}
              className="bg-white bg-opacity-20 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold text-sm">
                {isEditing ? 'Annuler' : 'Modifier'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Profile Avatar */}
          <View className="items-center">
            <View className="w-20 h-20 bg-white rounded-full items-center justify-center mb-4">
              <Text className="text-4xl">👤</Text>
            </View>
            <Text className="text-white text-xl font-bold">{user?.name}</Text>
            <Text className="text-white text-sm opacity-80 mt-1">Client Fadj Ma</Text>
          </View>
        </View>

        {/* Personal Information */}
        <View className="px-6 py-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Informations personnelles</Text>

          <View className="space-y-4">
            {/* Name */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Nom complet</Text>
              <TextInput
                editable={isEditing}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                className={`w-full p-3 rounded-lg border ${
                  isEditing
                    ? 'bg-white border-medical-600'
                    : 'bg-gray-100 border-gray-200'
                } text-gray-800`}
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Email</Text>
              <TextInput
                editable={isEditing}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                className={`w-full p-3 rounded-lg border ${
                  isEditing
                    ? 'bg-white border-medical-600'
                    : 'bg-gray-100 border-gray-200'
                } text-gray-800`}
              />
            </View>

            {/* Phone */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Téléphone</Text>
              <TextInput
                editable={isEditing}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
                className={`w-full p-3 rounded-lg border ${
                  isEditing
                    ? 'bg-white border-medical-600'
                    : 'bg-gray-100 border-gray-200'
                } text-gray-800`}
              />
            </View>

            {/* Address */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Adresse</Text>
              <TextInput
                editable={isEditing}
                value={formData.address}
                onChangeText={(text) => setFormData({ ...formData, address: text })}
                className={`w-full p-3 rounded-lg border ${
                  isEditing
                    ? 'bg-white border-medical-600'
                    : 'bg-gray-100 border-gray-200'
                } text-gray-800`}
                multiline
              />
            </View>
          </View>
        </View>

        {/* Saved Addresses */}
        <View className="px-6 py-6 border-t border-gray-200">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900">Adresses sauvegardées</Text>
            <TouchableOpacity className="bg-medical-600 px-3 py-1 rounded-lg">
              <Text className="text-white font-semibold text-sm">+ Ajouter</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="font-semibold text-gray-900">Domicile</Text>
              <TouchableOpacity>
                <Text className="text-gray-400">⋯</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-600">123 Rue de la Paix, Dakar</Text>
          </View>

          <View className="bg-white p-4 rounded-lg border border-gray-200">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="font-semibold text-gray-900">Bureau</Text>
              <TouchableOpacity>
                <Text className="text-gray-400">⋯</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-600">456 Avenue Cheikh Anta Diop, Dakar</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View className="px-6 py-6 border-t border-gray-200">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900">Moyens de paiement</Text>
            <TouchableOpacity className="bg-medical-600 px-3 py-1 rounded-lg">
              <Text className="text-white font-semibold text-sm">+ Ajouter</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-3">📱</Text>
                <View>
                  <Text className="font-semibold text-gray-900">Wave</Text>
                  <Text className="text-sm text-gray-600">77 123 45 67</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text className="text-gray-400">⋯</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="bg-white p-4 rounded-lg border border-gray-200">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-3">🏪</Text>
                <View>
                  <Text className="font-semibold text-gray-900">Orange Money</Text>
                  <Text className="text-sm text-gray-600">77 987 65 43</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text className="text-gray-400">⋯</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Paramètres</Text>

          {/* Notifications */}
          <View className="flex-row justify-between items-center bg-white p-4 rounded-lg mb-3">
            <View>
              <Text className="font-semibold text-gray-900">Notifications</Text>
              <Text className="text-sm text-gray-600 mt-1">Recevoir les alertes de commandes</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#ccc', true: '#2ECC71' }}
            />
          </View>

          {/* Support */}
          <TouchableOpacity className="flex-row justify-between items-center bg-white p-4 rounded-lg">
            <View>
              <Text className="font-semibold text-gray-900">Support</Text>
              <Text className="text-sm text-gray-600 mt-1">Contactez notre équipe</Text>
            </View>
            <Text className="text-gray-400">→</Text>
          </TouchableOpacity>
        </View>

        {/* Save/Logout Button */}
        <View className="px-6 py-6">
          {isEditing ? (
            <TouchableOpacity
              onPress={handleSave}
              className="w-full bg-medical-600 p-4 rounded-lg items-center mb-3"
            >
              <Text className="text-white font-bold text-lg">Enregistrer les modifications</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={handleLogout}
            className="w-full bg-red-50 p-4 rounded-lg items-center border border-red-200"
          >
            <Text className="text-red-600 font-bold text-lg">Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
