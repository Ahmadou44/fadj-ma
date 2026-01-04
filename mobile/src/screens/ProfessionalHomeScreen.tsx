import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfessionalHomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('pending');

  // Mock data
  const stats = {
    totalOrders: 156,
    pendingOrders: 12,
    completedToday: 8,
    revenue: 450000,
  };

  const orders = [
    {
      id: '1',
      orderNumber: 'CMD-2024-001',
      customer: 'Amadou Diallo',
      items: 3,
      total: 15000,
      status: 'pending',
      time: '10 min',
    },
    {
      id: '2',
      orderNumber: 'CMD-2024-002',
      customer: 'Fatou Sow',
      items: 2,
      total: 8500,
      status: 'pending',
      time: '25 min',
    },
    {
      id: '3',
      orderNumber: 'CMD-2024-003',
      customer: 'Moussa Ba',
      items: 5,
      total: 22000,
      status: 'processing',
      time: '1h',
    },
    {
      id: '4',
      orderNumber: 'CMD-2024-004',
      customer: 'Aïssatou Ndiaye',
      items: 1,
      total: 5000,
      status: 'completed',
      time: '2h',
    },
  ];

  const filteredOrders = orders.filter((order) => {
    if (selectedTab === 'pending') return order.status === 'pending';
    if (selectedTab === 'processing') return order.status === 'processing';
    if (selectedTab === 'completed') return order.status === 'completed';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100';
      case 'processing':
        return 'bg-blue-100';
      case 'completed':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-700';
      case 'processing':
        return 'text-blue-700';
      case 'completed':
        return 'text-green-700';
      default:
        return 'text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En cours';
      case 'completed':
        return 'Complétée';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-medical-600 px-6 pt-4 pb-6">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-white text-sm">Bienvenue,</Text>
              <Text className="text-white text-xl font-bold">{user?.businessName || 'Professionnel'}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfessionalProfile')}
              className="w-12 h-12 bg-white rounded-full items-center justify-center"
            >
              <Text className="text-2xl">🏥</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <View className="flex-row space-x-3">
            <View className="flex-1 bg-white bg-opacity-20 rounded-lg p-3">
              <Text className="text-white text-xs opacity-80">Commandes en attente</Text>
              <Text className="text-white text-2xl font-bold mt-1">{stats.pendingOrders}</Text>
            </View>
            <View className="flex-1 bg-white bg-opacity-20 rounded-lg p-3">
              <Text className="text-white text-xs opacity-80">Complétées aujourd'hui</Text>
              <Text className="text-white text-2xl font-bold mt-1">{stats.completedToday}</Text>
            </View>
            <View className="flex-1 bg-white bg-opacity-20 rounded-lg p-3">
              <Text className="text-white text-xs opacity-80">Revenus (FCFA)</Text>
              <Text className="text-white text-lg font-bold mt-1">{stats.revenue.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Order Tabs */}
        <View className="px-6 py-4">
          <View className="flex-row space-x-2">
            {[
              { id: 'pending', label: 'En attente', count: 12 },
              { id: 'processing', label: 'En cours', count: 3 },
              { id: 'completed', label: 'Complétées', count: 8 },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setSelectedTab(tab.id)}
                className={`flex-1 py-3 px-3 rounded-lg border-2 ${
                  selectedTab === tab.id
                    ? 'bg-medical-600 border-medical-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`text-center font-semibold text-sm ${
                    selectedTab === tab.id ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {tab.label}
                  <Text className={selectedTab === tab.id ? 'text-white' : 'text-gray-500'}>
                    {' '}({tab.count})
                  </Text>
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Orders List */}
        <View className="px-6 pb-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                onPress={() => navigation.navigate('OrderDetail', { order })}
                className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-1">
                    <Text className="font-bold text-gray-900">{order.orderNumber}</Text>
                    <Text className="text-sm text-gray-600 mt-1">{order.customer}</Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    <Text className={`text-xs font-bold ${getStatusTextColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </Text>
                  </View>
                </View>

                <View className="border-t border-gray-100 pt-3">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center space-x-4">
                      <View>
                        <Text className="text-xs text-gray-500">Articles</Text>
                        <Text className="text-sm font-bold text-gray-900">{order.items}</Text>
                      </View>
                      <View>
                        <Text className="text-xs text-gray-500">Total</Text>
                        <Text className="text-sm font-bold text-medical-600">{order.total.toLocaleString()} FCFA</Text>
                      </View>
                      <View>
                        <Text className="text-xs text-gray-500">Il y a</Text>
                        <Text className="text-sm font-bold text-gray-900">{order.time}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('OrderDetail', { order })}
                      className="bg-medical-600 px-4 py-2 rounded-lg"
                    >
                      <Text className="text-white font-semibold text-sm">Voir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="bg-white rounded-xl p-8 items-center">
              <Text className="text-4xl mb-3">📭</Text>
              <Text className="text-gray-600 font-semibold">Aucune commande</Text>
              <Text className="text-gray-500 text-sm mt-2">Les commandes apparaîtront ici</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Actions rapides</Text>

          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={() => navigation.navigate('Inventory')}
              className="flex-1 bg-blue-50 rounded-xl p-4 items-center"
            >
              <Text className="text-3xl mb-2">📦</Text>
              <Text className="text-xs font-semibold text-blue-900 text-center">Inventaire</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Analytics')}
              className="flex-1 bg-purple-50 rounded-xl p-4 items-center"
            >
              <Text className="text-3xl mb-2">📊</Text>
              <Text className="text-xs font-semibold text-purple-900 text-center">Analytics</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Subscription')}
              className="flex-1 bg-green-50 rounded-xl p-4 items-center"
            >
              <Text className="text-3xl mb-2">💳</Text>
              <Text className="text-xs font-semibold text-green-900 text-center">Abonnement</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
