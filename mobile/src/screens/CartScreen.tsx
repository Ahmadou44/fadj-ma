import { View, Text, TouchableOpacity, ScrollView, FlatList, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '../services/api';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  pharmacy: string;
}

export default function CartScreen({ navigation }: any) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if (cart) {
        setCartItems(JSON.parse(cart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const saveCart = async (items: CartItem[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(items));
      setCartItems(items);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    const updated = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updated);
  };

  const removeItem = (itemId: string) => {
    const updated = cartItems.filter((item) => item.id !== itemId);
    saveCart(updated);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const deliveryFee = deliveryMode === 'delivery' ? 2000 : 0;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Erreur', 'Votre panier est vide');
      return;
    }

    if (deliveryMode === 'delivery' && !deliveryAddress) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse de livraison');
      return;
    }

    try {
      setLoading(true);
      const order = await apiService.createOrder({
        items: cartItems,
        deliveryMode,
        deliveryAddress: deliveryMode === 'delivery' ? deliveryAddress : null,
        total,
      });

      Alert.alert('Succès', 'Commande créée avec succès');
      await AsyncStorage.removeItem('cart');
      setCartItems([]);
      navigation.replace('Payment', { orderId: order.id });
    } catch (error) {
      console.error('Error creating order:', error);
      Alert.alert('Erreur', 'Impossible de créer la commande');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-medical-600 px-6 pt-4 pb-6">
          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text className="text-white text-2xl">←</Text>
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Panier</Text>
            <View className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <Text className="text-white font-bold">{cartItems.length}</Text>
            </View>
          </View>
        </View>

        {cartItems.length === 0 ? (
          // Empty Cart
          <View className="flex-1 items-center justify-center px-6 py-12">
            <Text className="text-5xl mb-4">🛒</Text>
            <Text className="text-xl font-bold text-gray-900 mb-2">Panier vide</Text>
            <Text className="text-gray-600 text-center mb-6">
              Commencez à ajouter des médicaments à votre panier
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ClientHome')}
              className="bg-medical-600 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-bold">Continuer les achats</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Cart Items */}
            <View className="px-6 py-6">
              <Text className="text-lg font-bold text-gray-900 mb-4">Articles</Text>

              {cartItems.map((item) => (
                <View
                  key={item.id}
                  className="bg-white rounded-lg p-4 mb-3 border border-gray-200 flex-row justify-between items-center"
                >
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900">{item.name}</Text>
                    <Text className="text-sm text-gray-600 mt-1">{item.pharmacy}</Text>
                    <Text className="text-medical-600 font-bold mt-2">
                      {item.price.toLocaleString()} FCFA
                    </Text>
                  </View>

                  <View className="flex-row items-center bg-gray-100 rounded-lg">
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2"
                    >
                      <Text className="text-lg font-bold text-gray-600">−</Text>
                    </TouchableOpacity>
                    <Text className="px-3 font-bold text-gray-900">{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2"
                    >
                      <Text className="text-lg font-bold text-medical-600">+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    className="ml-3 p-2"
                  >
                    <Text className="text-red-600 text-lg">🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Delivery Mode */}
            <View className="px-6 py-6 border-t border-gray-200">
              <Text className="text-lg font-bold text-gray-900 mb-4">Mode de livraison</Text>

              <TouchableOpacity
                onPress={() => setDeliveryMode('delivery')}
                className={`p-4 rounded-lg mb-3 border-2 flex-row items-center ${
                  deliveryMode === 'delivery'
                    ? 'border-medical-600 bg-medical-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                    deliveryMode === 'delivery'
                      ? 'border-medical-600 bg-medical-600'
                      : 'border-gray-300'
                  }`}
                >
                  {deliveryMode === 'delivery' && <Text className="text-white text-xs">✓</Text>}
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Livraison à domicile</Text>
                  <Text className="text-sm text-gray-600">2 000 FCFA</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDeliveryMode('pickup')}
                className={`p-4 rounded-lg border-2 flex-row items-center ${
                  deliveryMode === 'pickup'
                    ? 'border-medical-600 bg-medical-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                    deliveryMode === 'pickup'
                      ? 'border-medical-600 bg-medical-600'
                      : 'border-gray-300'
                  }`}
                >
                  {deliveryMode === 'pickup' && <Text className="text-white text-xs">✓</Text>}
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Retrait en pharmacie</Text>
                  <Text className="text-sm text-gray-600">Gratuit</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Delivery Address */}
            {deliveryMode === 'delivery' && (
              <View className="px-6 py-6 border-t border-gray-200">
                <Text className="text-lg font-bold text-gray-900 mb-4">Adresse de livraison</Text>
                <TextInput
                  value={deliveryAddress}
                  onChangeText={setDeliveryAddress}
                  placeholder="Entrez votre adresse complète..."
                  multiline
                  numberOfLines={3}
                  className="w-full bg-white border border-gray-200 rounded-lg p-4 text-gray-800"
                  textAlignVertical="top"
                />
              </View>
            )}

            {/* Summary */}
            <View className="px-6 py-6 border-t border-gray-200">
              <Text className="text-lg font-bold text-gray-900 mb-4">Résumé</Text>

              <View className="space-y-3 mb-4">
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Sous-total</Text>
                  <Text className="text-gray-900 font-semibold">{subtotal.toLocaleString()} FCFA</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">
                    {deliveryMode === 'delivery' ? 'Frais de livraison' : 'Retrait'}
                  </Text>
                  <Text className="text-gray-900 font-semibold">{deliveryFee.toLocaleString()} FCFA</Text>
                </View>
                <View className="border-t border-gray-200 pt-3 flex-row justify-between">
                  <Text className="text-gray-900 font-bold text-lg">Total</Text>
                  <Text className="text-medical-600 font-bold text-lg">
                    {total.toLocaleString()} FCFA
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleCheckout}
                disabled={loading}
                className="w-full bg-medical-600 p-4 rounded-lg items-center"
              >
                <Text className="text-white font-bold text-lg">
                  {loading ? 'Traitement...' : 'Procéder au paiement'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ClientHome')}
                className="w-full mt-3 p-4 rounded-lg items-center border border-medical-600"
              >
                <Text className="text-medical-600 font-bold">Continuer les achats</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
