import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import * as Haptics from 'expo-haptics';

export default function OrderConfirmationScreen({ route, navigation }: any) {
  const { orderId } = route.params;

  useEffect(() => {
    // Trigger success haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Success Animation */}
        <View className="items-center py-12">
          <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-6">
            <Text className="text-6xl">✓</Text>
          </View>

          <Text className="text-3xl font-bold text-gray-900 mb-2">Commande confirmée !</Text>
          <Text className="text-lg text-gray-600 text-center px-6">
            Votre commande a été reçue et traitée avec succès
          </Text>
        </View>

        {/* Order Details */}
        <View className="px-6 py-6">
          <View className="bg-white rounded-lg p-6 border border-gray-200">
            <Text className="text-gray-600 text-sm mb-2">Numéro de commande</Text>
            <Text className="text-3xl font-bold text-medical-600 mb-6">FAD-{orderId}</Text>

            <View className="space-y-4">
              <View className="flex-row justify-between pb-4 border-b border-gray-200">
                <Text className="text-gray-600">Date</Text>
                <Text className="text-gray-900 font-semibold">
                  {new Date().toLocaleDateString('fr-FR')}
                </Text>
              </View>

              <View className="flex-row justify-between pb-4 border-b border-gray-200">
                <Text className="text-gray-600">Heure</Text>
                <Text className="text-gray-900 font-semibold">
                  {new Date().toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-600">Statut</Text>
                <View className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-blue-700 font-bold text-sm">En attente de confirmation</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Next Steps */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Prochaines étapes</Text>

          <View className="space-y-4">
            {/* Step 1 */}
            <View className="flex-row">
              <View className="items-center mr-4">
                <View className="w-8 h-8 bg-medical-600 rounded-full items-center justify-center">
                  <Text className="text-white font-bold">1</Text>
                </View>
                <View className="w-1 h-12 bg-gray-300 mt-2" />
              </View>
              <View className="flex-1 pt-1">
                <Text className="font-bold text-gray-900 mb-1">Confirmation de la pharmacie</Text>
                <Text className="text-sm text-gray-600">
                  La pharmacie confirmera votre commande dans les 30 minutes
                </Text>
              </View>
            </View>

            {/* Step 2 */}
            <View className="flex-row">
              <View className="items-center mr-4">
                <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center">
                  <Text className="text-white font-bold">2</Text>
                </View>
                <View className="w-1 h-12 bg-gray-300 mt-2" />
              </View>
              <View className="flex-1 pt-1">
                <Text className="font-bold text-gray-900 mb-1">Préparation</Text>
                <Text className="text-sm text-gray-600">
                  Votre commande sera préparée et emballée
                </Text>
              </View>
            </View>

            {/* Step 3 */}
            <View className="flex-row">
              <View className="items-center mr-4">
                <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center">
                  <Text className="text-white font-bold">3</Text>
                </View>
                <View className="w-1 h-12 bg-gray-300 mt-2" />
              </View>
              <View className="flex-1 pt-1">
                <Text className="font-bold text-gray-900 mb-1">Livraison</Text>
                <Text className="text-sm text-gray-600">
                  Un livreur sera assigné et vous recevrez les mises à jour en temps réel
                </Text>
              </View>
            </View>

            {/* Step 4 */}
            <View className="flex-row">
              <View className="items-center mr-4">
                <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center">
                  <Text className="text-white font-bold">4</Text>
                </View>
              </View>
              <View className="flex-1 pt-1">
                <Text className="font-bold text-gray-900 mb-1">Livraison effectuée</Text>
                <Text className="text-sm text-gray-600">
                  Recevez votre commande et laissez un avis
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notifications */}
        <View className="px-6 py-6 border-t border-gray-200">
          <View className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <View className="flex-row items-start">
              <Text className="text-xl mr-3">🔔</Text>
              <View className="flex-1">
                <Text className="font-bold text-blue-900 mb-1">Notifications activées</Text>
                <Text className="text-sm text-blue-800">
                  Vous recevrez des notifications pour chaque mise à jour de votre commande
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Support */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Besoin d'aide ?</Text>

          <TouchableOpacity className="bg-white rounded-lg p-4 border border-gray-200 mb-3 flex-row items-center">
            <Text className="text-2xl mr-3">💬</Text>
            <View className="flex-1">
              <Text className="font-bold text-gray-900">Chat en direct</Text>
              <Text className="text-sm text-gray-600">Parlez avec notre équipe</Text>
            </View>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-lg p-4 border border-gray-200 flex-row items-center">
            <Text className="text-2xl mr-3">📞</Text>
            <View className="flex-1">
              <Text className="font-bold text-gray-900">Appeler le support</Text>
              <Text className="text-sm text-gray-600">+221 77 123 45 67</Text>
            </View>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View className="px-6 py-6">
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderDetail', { orderId })}
            className="w-full bg-medical-600 p-4 rounded-lg items-center mb-3"
          >
            <Text className="text-white font-bold">Suivre ma commande</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ClientHome')}
            className="w-full bg-gray-100 p-4 rounded-lg items-center border border-gray-200"
          >
            <Text className="text-gray-900 font-bold">Retour à l'accueil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
