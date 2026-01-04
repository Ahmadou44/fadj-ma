import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ClientHomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data
  const pharmacies = [
    {
      id: '1',
      name: 'Pharmacie du Plateau',
      distance: 0.5,
      rating: 4.8,
      reviews: 124,
      isOpen: true,
      image: '🏪',
    },
    {
      id: '2',
      name: 'Pharmacie Medina',
      distance: 1.2,
      rating: 4.5,
      reviews: 89,
      isOpen: true,
      image: '🏪',
    },
    {
      id: '3',
      name: 'Pharmacie Mermoz',
      distance: 2.1,
      rating: 4.3,
      reviews: 56,
      isOpen: false,
      image: '🏪',
    },
  ];

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'open', label: 'Ouvert' },
    { id: 'nearby', label: 'Proche' },
    { id: 'rated', label: 'Top Avis' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-medical-600 px-6 pt-4 pb-8">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-white text-sm">Bonjour,</Text>
              <Text className="text-white text-xl font-bold">{user?.name || 'Patient'}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              className="w-12 h-12 bg-white rounded-full items-center justify-center"
            >
              <Text className="text-2xl">👤</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-xl px-4 py-3">
            <Text className="text-2xl mr-3">🔍</Text>
            <TextInput
              className="flex-1 text-gray-800"
              placeholder="Chercher un médicament..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Filters */}
        <View className="px-6 py-4">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filters}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedFilter(item.id)}
                className={`mr-3 px-4 py-2 rounded-full border ${
                  selectedFilter === item.id
                    ? 'bg-medical-600 border-medical-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    selectedFilter === item.id ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Pharmacies List */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Pharmacies à proximité</Text>

          {pharmacies.map((pharmacy) => (
            <TouchableOpacity
              key={pharmacy.id}
              onPress={() => navigation.navigate('PharmacyDetail', { pharmacy })}
              className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
            >
              <View className="flex-row items-start">
                <View className="w-16 h-16 bg-gray-100 rounded-lg items-center justify-center mr-4">
                  <Text className="text-3xl">{pharmacy.image}</Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-gray-900">{pharmacy.name}</Text>
                      <View className="flex-row items-center mt-1">
                        <Text className="text-yellow-500 mr-1">⭐</Text>
                        <Text className="text-sm font-semibold text-gray-700">
                          {pharmacy.rating} ({pharmacy.reviews})
                        </Text>
                      </View>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-full ${
                        pharmacy.isOpen
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          pharmacy.isOpen
                            ? 'text-green-700'
                            : 'text-red-700'
                        }`}
                      >
                        {pharmacy.isOpen ? 'Ouvert' : 'Fermé'}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between mt-3">
                    <View className="flex-row items-center">
                      <Text className="text-gray-500 text-sm mr-3">📍 {pharmacy.distance} km</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('PharmacyDetail', { pharmacy })}
                      className="bg-medical-600 px-4 py-2 rounded-lg"
                    >
                      <Text className="text-white font-semibold text-sm">Voir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Actions rapides</Text>

          <View className="flex-row space-x-4">
            <TouchableOpacity
              onPress={() => navigation.navigate('Orders')}
              className="flex-1 bg-blue-50 rounded-xl p-4 items-center"
            >
              <Text className="text-3xl mb-2">📦</Text>
              <Text className="text-sm font-semibold text-blue-900">Mes commandes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Prescriptions')}
              className="flex-1 bg-purple-50 rounded-xl p-4 items-center"
            >
              <Text className="text-3xl mb-2">📋</Text>
              <Text className="text-sm font-semibold text-purple-900">Ordonnances</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              className="flex-1 bg-green-50 rounded-xl p-4 items-center"
            >
              <Text className="text-3xl mb-2">🛒</Text>
              <Text className="text-sm font-semibold text-green-900">Panier</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
