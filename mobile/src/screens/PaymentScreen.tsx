import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { apiService } from '../services/api';
import { notificationService } from '../services/notification';

type PaymentMethod = 'wave' | 'orange' | 'free' | null;

export default function PaymentScreen({ route, navigation }: any) {
  const { orderId, total } = route.params;
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePayment = async () => {
    if (!paymentMethod) {
      Alert.alert('Erreur', 'Veuillez sélectionner une méthode de paiement');
      return;
    }

    if (!phoneNumber) {
      Alert.alert('Erreur', 'Veuillez entrer votre numéro de téléphone');
      return;
    }

    try {
      setLoading(true);
      const payment = await apiService.initiatePayment({
        orderId,
        method: paymentMethod,
        phoneNumber,
        amount: total,
      });

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Confirm payment
      await apiService.confirmPayment(payment.id);

      // Send notification
      await notificationService.notifyOrderConfirmed(`FAD-${orderId}`);

      Alert.alert('Succès', 'Paiement effectué avec succès');
      navigation.replace('OrderConfirmation', { orderId });
    } catch (error) {
      console.error('Error processing payment:', error);
      Alert.alert('Erreur', 'Impossible de traiter le paiement');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodInfo = (method: PaymentMethod) => {
    const info: Record<string, any> = {
      wave: {
        name: 'Wave',
        icon: '💳',
        description: 'Paiement mobile sécurisé',
        fee: 0,
      },
      orange: {
        name: 'Orange Money',
        icon: '🟠',
        description: 'Paiement par Orange Money',
        fee: 0,
      },
      free: {
        name: 'Free Money',
        icon: '📱',
        description: 'Paiement par Free Money',
        fee: 0,
      },
    };
    return info[method];
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-medical-600 px-6 pt-4 pb-6">
          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text className="text-white text-2xl">←</Text>
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Paiement</Text>
            <View className="w-6" />
          </View>

          <View className="bg-white bg-opacity-20 rounded-lg p-4">
            <Text className="text-white text-sm opacity-80">Montant à payer</Text>
            <Text className="text-white text-3xl font-bold mt-1">
              {total.toLocaleString()} FCFA
            </Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View className="px-6 py-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Méthode de paiement</Text>

          {(['wave', 'orange', 'free'] as const).map((method) => {
            const info = getPaymentMethodInfo(method);
            const isSelected = paymentMethod === method;

            return (
              <TouchableOpacity
                key={method}
                onPress={() => setPaymentMethod(isSelected ? null : method)}
                className={`p-4 rounded-lg mb-3 border-2 flex-row items-center ${
                  isSelected
                    ? 'border-medical-600 bg-medical-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-4 ${
                    isSelected
                      ? 'border-medical-600 bg-medical-600'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && <Text className="text-white text-xs">✓</Text>}
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-2xl mr-2">{info.icon}</Text>
                    <Text className="font-bold text-gray-900">{info.name}</Text>
                  </View>
                  <Text className="text-sm text-gray-600">{info.description}</Text>
                </View>

                {info.fee > 0 && (
                  <View className="bg-red-100 px-2 py-1 rounded">
                    <Text className="text-red-700 text-xs font-bold">+{info.fee}%</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Phone Number Input */}
        {paymentMethod && (
          <View className="px-6 py-6 border-t border-gray-200">
            <Text className="text-lg font-bold text-gray-900 mb-4">Numéro de téléphone</Text>

            <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4">
              <Text className="text-gray-600 mr-2">+221</Text>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="77 123 45 67"
                keyboardType="phone-pad"
                maxLength={9}
                className="flex-1 py-3 text-gray-800"
              />
            </View>

            <Text className="text-sm text-gray-600 mt-3">
              Vous recevrez un code de confirmation par SMS
            </Text>
          </View>
        )}

        {/* Security Info */}
        <View className="px-6 py-6 border-t border-gray-200">
          <View className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <View className="flex-row items-start">
              <Text className="text-xl mr-3">🔒</Text>
              <View className="flex-1">
                <Text className="font-bold text-blue-900 mb-1">Paiement sécurisé</Text>
                <Text className="text-sm text-blue-800">
                  Vos données sont chiffrées et protégées selon les normes PCI DSS.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Résumé de la commande</Text>

          <View className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Numéro de commande</Text>
              <Text className="text-gray-900 font-semibold">FAD-{orderId}</Text>
            </View>
            <View className="border-t border-gray-200 pt-3 flex-row justify-between">
              <Text className="text-gray-600">Montant</Text>
              <Text className="text-medical-600 font-bold">{total.toLocaleString()} FCFA</Text>
            </View>
          </View>
        </View>

        {/* Terms */}
        <View className="px-6 py-6 border-t border-gray-200">
          <View className="flex-row items-start">
            <TouchableOpacity
              onPress={() => setShowConfirmation(!showConfirmation)}
              className={`w-6 h-6 rounded border-2 items-center justify-center mr-3 ${
                showConfirmation ? 'bg-medical-600 border-medical-600' : 'border-gray-300'
              }`}
            >
              {showConfirmation && <Text className="text-white font-bold">✓</Text>}
            </TouchableOpacity>
            <Text className="flex-1 text-sm text-gray-600">
              J'accepte les{' '}
              <Text className="text-medical-600 font-bold">conditions d'utilisation</Text> et la{' '}
              <Text className="text-medical-600 font-bold">politique de confidentialité</Text>
            </Text>
          </View>
        </View>

        {/* Payment Button */}
        <View className="px-6 py-6">
          <TouchableOpacity
            onPress={handlePayment}
            disabled={!paymentMethod || !phoneNumber || !showConfirmation || loading}
            className={`w-full p-4 rounded-lg items-center ${
              paymentMethod && phoneNumber && showConfirmation && !loading
                ? 'bg-medical-600'
                : 'bg-gray-300'
            }`}
          >
            <Text className="text-white font-bold text-lg">
              {loading ? 'Traitement...' : `Payer ${total.toLocaleString()} FCFA`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-full mt-3 p-4 rounded-lg items-center border border-medical-600"
          >
            <Text className="text-medical-600 font-bold">Retour</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
