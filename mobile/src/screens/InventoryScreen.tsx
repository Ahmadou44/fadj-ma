import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  price: number;
  category: string;
  expiryDate: string;
}

export default function InventoryScreen({ navigation }: any) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  useEffect(() => {
    loadInventory();
  }, []);

  useEffect(() => {
    filterInventory();
  }, [searchQuery, filterCategory, inventory]);

  const loadInventory = async () => {
    try {
      setLoading(true);
      // TODO: Remplacer par l'appel API réel
      const mockData: InventoryItem[] = [
        {
          id: '1',
          name: 'Paracétamol 500mg',
          sku: 'PARA-500',
          quantity: 150,
          minQuantity: 50,
          price: 500,
          category: 'Analgésiques',
          expiryDate: '2025-12-31',
        },
        {
          id: '2',
          name: 'Ibuprofène 400mg',
          sku: 'IBU-400',
          quantity: 45,
          minQuantity: 50,
          price: 800,
          category: 'Anti-inflammatoires',
          expiryDate: '2025-11-30',
        },
        {
          id: '3',
          name: 'Amoxicilline 500mg',
          sku: 'AMOX-500',
          quantity: 200,
          minQuantity: 100,
          price: 1200,
          category: 'Antibiotiques',
          expiryDate: '2025-10-15',
        },
      ];
      setInventory(mockData);
    } catch (error) {
      console.error('Error loading inventory:', error);
      Alert.alert('Erreur', 'Impossible de charger l\'inventaire');
    } finally {
      setLoading(false);
    }
  };

  const filterInventory = () => {
    let filtered = inventory;

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    setFilteredInventory(filtered);
  };

  const categories = Array.from(new Set(inventory.map((item) => item.category)));

  const getLowStockItems = () => {
    return inventory.filter((item) => item.quantity <= item.minQuantity);
  };

  const getExpiringItems = () => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return inventory.filter((item) => new Date(item.expiryDate) <= thirtyDaysFromNow);
  };

  const lowStockItems = getLowStockItems();
  const expiringItems = getExpiringItems();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-medical-600 px-6 pt-4 pb-6">
          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text className="text-white text-2xl">←</Text>
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Inventaire</Text>
            <TouchableOpacity className="bg-white bg-opacity-20 px-3 py-2 rounded-lg">
              <Text className="text-white font-bold">+ Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Alerts */}
        {lowStockItems.length > 0 && (
          <View className="mx-6 mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <View className="flex-row items-center mb-2">
              <Text className="text-2xl mr-2">⚠️</Text>
              <Text className="font-bold text-red-700">Stock faible</Text>
            </View>
            <Text className="text-sm text-red-700">
              {lowStockItems.length} article(s) en stock faible. Réapprovisionnez-vous.
            </Text>
          </View>
        )}

        {expiringItems.length > 0 && (
          <View className="mx-6 mt-3 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <View className="flex-row items-center mb-2">
              <Text className="text-2xl mr-2">⏰</Text>
              <Text className="font-bold text-orange-700">Expiration proche</Text>
            </View>
            <Text className="text-sm text-orange-700">
              {expiringItems.length} article(s) expirent dans 30 jours.
            </Text>
          </View>
        )}

        {/* Search and Filter */}
        <View className="px-6 py-6">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Rechercher par nom ou SKU..."
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800 mb-4"
          />

          {/* Category Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <TouchableOpacity
              onPress={() => setFilterCategory(null)}
              className={`px-4 py-2 rounded-full mr-2 border ${
                filterCategory === null
                  ? 'bg-medical-600 border-medical-600'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text
                className={`font-semibold ${
                  filterCategory === null ? 'text-white' : 'text-gray-700'
                }`}
              >
                Tous
              </Text>
            </TouchableOpacity>

            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-full mr-2 border ${
                  filterCategory === category
                    ? 'bg-medical-600 border-medical-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    filterCategory === category ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Inventory Items */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Articles ({filteredInventory.length})
          </Text>

          {loading ? (
            <View className="items-center py-8">
              <Text className="text-gray-600">Chargement...</Text>
            </View>
          ) : filteredInventory.length === 0 ? (
            <View className="items-center py-8">
              <Text className="text-4xl mb-3">📦</Text>
              <Text className="text-gray-600 font-semibold">Aucun article trouvé</Text>
            </View>
          ) : (
            filteredInventory.map((item) => {
              const isLowStock = item.quantity <= item.minQuantity;
              const isExpiring =
                new Date(item.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

              return (
                <TouchableOpacity
                  key={item.id}
                  className={`bg-white rounded-lg p-4 mb-3 border ${
                    isLowStock ? 'border-red-200' : isExpiring ? 'border-orange-200' : 'border-gray-200'
                  }`}
                >
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                      <Text className="font-bold text-gray-900">{item.name}</Text>
                      <Text className="text-sm text-gray-600 mt-1">SKU: {item.sku}</Text>
                    </View>
                    <View className="bg-medical-100 px-3 py-1 rounded-full">
                      <Text className="text-medical-700 font-bold text-sm">
                        {item.price.toLocaleString()} FCFA
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center mb-3">
                    <View>
                      <Text className="text-xs text-gray-600 mb-1">Quantité en stock</Text>
                      <View className="flex-row items-center">
                        <Text
                          className={`text-lg font-bold ${
                            isLowStock ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {item.quantity}
                        </Text>
                        <Text className="text-gray-600 ml-2">/ Min: {item.minQuantity}</Text>
                      </View>
                    </View>

                    {isLowStock && (
                      <View className="bg-red-100 px-3 py-1 rounded-full">
                        <Text className="text-red-700 font-bold text-xs">Stock faible</Text>
                      </View>
                    )}

                    {isExpiring && (
                      <View className="bg-orange-100 px-3 py-1 rounded-full">
                        <Text className="text-orange-700 font-bold text-xs">Expire bientôt</Text>
                      </View>
                    )}
                  </View>

                  <View className="flex-row justify-between items-center pt-3 border-t border-gray-200">
                    <Text className="text-xs text-gray-600">
                      Expire: {new Date(item.expiryDate).toLocaleDateString('fr-FR')}
                    </Text>
                    <TouchableOpacity className="bg-medical-600 px-3 py-1 rounded">
                      <Text className="text-white text-xs font-bold">Modifier</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
