import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export default function OrderDetailScreen({ route, navigation }: any) {
  const { orderId } = route.params;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await apiService.getOrderById(orderId);
      setOrder(data);
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100';
      case 'confirmed':
        return 'bg-blue-100';
      case 'processing':
        return 'bg-purple-100';
      case 'in_delivery':
        return 'bg-orange-100';
      case 'delivered':
        return 'bg-green-100';
      case 'cancelled':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      processing: 'En préparation',
      in_delivery: 'En livraison',
      delivered: 'Livrée',
      cancelled: 'Annulée',
    };
    return labels[status] || status;
  };

  const timeline = [
    { status: 'pending', label: 'Commande créée', completed: true },
    { status: 'confirmed', label: 'Confirmée', completed: order?.status !== 'pending' },
    { status: 'processing', label: 'En préparation', completed: ['processing', 'in_delivery', 'delivered'].includes(order?.status) },
    { status: 'in_delivery', label: 'En livraison', completed: ['in_delivery', 'delivered'].includes(order?.status) },
    { status: 'delivered', label: 'Livrée', completed: order?.status === 'delivered' },
  ];

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600">Chargement...</Text>
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600">Commande non trouvée</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-medical-600 px-6 pt-4 pb-6">
          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text className="text-white text-2xl">←</Text>
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Détail de la commande</Text>
            <View className="w-6" />
          </View>

          <View className="bg-white bg-opacity-20 rounded-lg p-4">
            <Text className="text-white text-sm opacity-80">Numéro de commande</Text>
            <Text className="text-white text-2xl font-bold mt-1">{order.orderNumber}</Text>
          </View>
        </View>

        {/* Status */}
        <View className="px-6 py-6">
          <View className={`${getStatusColor(order.status)} rounded-lg p-4 mb-6`}>
            <Text className="text-sm opacity-80 mb-1">Statut actuel</Text>
            <Text className="text-lg font-bold">{getStatusLabel(order.status)}</Text>
          </View>

          {/* Timeline */}
          <Text className="text-lg font-bold text-gray-900 mb-4">Progression</Text>
          {timeline.map((item, index) => (
            <View key={item.status} className="flex-row mb-4">
              <View className="items-center mr-4">
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    item.completed ? 'bg-medical-600' : 'bg-gray-300'
                  }`}
                >
                  <Text className="text-white font-bold">
                    {item.completed ? '✓' : index + 1}
                  </Text>
                </View>
                {index < timeline.length - 1 && (
                  <View
                    className={`w-1 h-8 ${
                      item.completed ? 'bg-medical-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </View>
              <View className="flex-1 pt-1">
                <Text className="font-semibold text-gray-900">{item.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Pharmacy Info */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Pharmacie</Text>
          <View className="bg-white rounded-lg p-4 border border-gray-200">
            <Text className="font-bold text-gray-900 mb-2">{order.pharmacy?.name}</Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <Text className="text-gray-600 mr-2">📍</Text>
                <Text className="text-gray-700">{order.pharmacy?.address}</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-600 mr-2">📱</Text>
                <Text className="text-gray-700">{order.pharmacy?.phone}</Text>
              </View>
            </View>
            <TouchableOpacity className="mt-4 bg-medical-600 p-3 rounded-lg items-center">
              <Text className="text-white font-semibold">Appeler la pharmacie</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Items */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Articles ({order.items?.length || 0})</Text>
          {order.items?.map((item: any, index: number) => (
            <View key={index} className="flex-row justify-between items-center bg-white p-4 rounded-lg mb-3 border border-gray-200">
              <View className="flex-1">
                <Text className="font-semibold text-gray-900">{item.name}</Text>
                <Text className="text-sm text-gray-600 mt-1">Quantité: {item.quantity}</Text>
              </View>
              <Text className="font-bold text-medical-600">{item.price?.toLocaleString()} FCFA</Text>
            </View>
          ))}
        </View>

        {/* Delivery Address */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Adresse de livraison</Text>
          <View className="bg-white rounded-lg p-4 border border-gray-200">
            <Text className="text-gray-700">{order.deliveryAddress}</Text>
          </View>
        </View>

        {/* Summary */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Résumé</Text>
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Sous-total</Text>
              <Text className="text-gray-900 font-semibold">{order.subtotal?.toLocaleString()} FCFA</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Frais de livraison</Text>
              <Text className="text-gray-900 font-semibold">{order.deliveryFee?.toLocaleString()} FCFA</Text>
            </View>
            <View className="border-t border-gray-200 pt-3 flex-row justify-between">
              <Text className="text-gray-900 font-bold">Total</Text>
              <Text className="text-medical-600 font-bold text-lg">{order.total?.toLocaleString()} FCFA</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="px-6 py-6">
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <TouchableOpacity className="w-full bg-red-50 p-4 rounded-lg items-center border border-red-200 mb-3">
              <Text className="text-red-600 font-bold">Annuler la commande</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity className="w-full bg-medical-600 p-4 rounded-lg items-center">
            <Text className="text-white font-bold">Contacter le support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
