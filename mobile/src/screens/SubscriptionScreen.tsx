import { View, Text, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export default function SubscriptionScreen({ navigation }: any) {
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      setLoading(true);
      const [subscription, plansData] = await Promise.all([
        apiService.getSubscription(),
        apiService.getSubscriptionPlans(),
      ]);
      setCurrentSubscription(subscription);
      setPlans(plansData);
    } catch (error) {
      console.error('Error loading subscription data:', error);
      Alert.alert('Erreur', 'Impossible de charger les données d\'abonnement');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    if (!selectedPlan) {
      Alert.alert('Erreur', 'Veuillez sélectionner un plan');
      return;
    }

    try {
      setUpgrading(true);
      await apiService.upgradeSubscription(selectedPlan);
      Alert.alert('Succès', 'Votre abonnement a été mis à jour');
      loadSubscriptionData();
      setSelectedPlan(null);
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      Alert.alert('Erreur', 'Impossible de mettre à jour l\'abonnement');
    } finally {
      setUpgrading(false);
    }
  };

  const getPriceDisplay = (plan: any) => {
    const discount = plan.discount || 0;
    const discountedPrice = plan.price * (1 - discount / 100);
    return {
      original: plan.price,
      discounted: discountedPrice,
      discount,
    };
  };

  const getFeatures = (planType: string) => {
    const features: Record<string, string[]> = {
      basic: [
        'Jusqu\'à 50 commandes/mois',
        'Gestion des stocks basique',
        'Support email',
        'Rapports mensuels',
      ],
      professional: [
        'Jusqu\'à 500 commandes/mois',
        'Gestion avancée des stocks',
        'Support prioritaire',
        'Rapports détaillés',
        'Analytics en temps réel',
        'API d\'intégration',
      ],
      premium: [
        'Commandes illimitées',
        'Gestion complète des stocks',
        'Support 24/7',
        'Rapports personnalisés',
        'Analytics avancées',
        'API complète',
        'Intégrations tierces',
        'Gestionnaire de compte dédié',
      ],
    };
    return features[planType] || [];
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600">Chargement...</Text>
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
            <Text className="text-white text-lg font-bold">Abonnement</Text>
            <View className="w-6" />
          </View>
        </View>

        {/* Current Subscription */}
        {currentSubscription && (
          <View className="px-6 py-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">Abonnement actuel</Text>
            <View className="bg-white rounded-lg p-6 border border-medical-200">
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <Text className="text-2xl font-bold text-gray-900 capitalize">
                    {currentSubscription.plan}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-2">
                    Actif jusqu'au {new Date(currentSubscription.expiresAt).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-700 font-bold text-sm">Actif</Text>
                </View>
              </View>

              <View className="bg-gray-50 rounded-lg p-4 mb-4">
                <Text className="text-gray-600 text-sm mb-2">Renouvellement automatique</Text>
                <Text className="text-2xl font-bold text-gray-900">
                  {currentSubscription.renewalPrice?.toLocaleString()} FCFA
                </Text>
                <Text className="text-gray-600 text-sm mt-2">
                  Prochain renouvellement: {new Date(currentSubscription.nextRenewalDate).toLocaleDateString('fr-FR')}
                </Text>
              </View>

              <TouchableOpacity className="bg-red-50 p-3 rounded-lg items-center border border-red-200">
                <Text className="text-red-600 font-semibold">Annuler l'abonnement</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Available Plans */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Choisir un plan</Text>

          {plans.map((plan) => {
            const pricing = getPriceDisplay(plan);
            const features = getFeatures(plan.type);
            const isSelected = selectedPlan === plan.id;
            const isCurrent = currentSubscription?.plan === plan.type;

            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(isSelected ? null : plan.id)}
                className={`rounded-lg p-6 mb-4 border-2 ${
                  isSelected
                    ? 'border-medical-600 bg-medical-50'
                    : isCurrent
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {/* Plan Header */}
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 capitalize">{plan.type}</Text>
                    <Text className="text-sm text-gray-600 mt-1">{plan.description}</Text>
                  </View>
                  {isCurrent && (
                    <View className="bg-green-100 px-3 py-1 rounded-full">
                      <Text className="text-green-700 font-bold text-xs">Actuel</Text>
                    </View>
                  )}
                </View>

                {/* Pricing */}
                <View className="bg-white rounded-lg p-4 mb-4">
                  <View className="flex-row items-baseline mb-2">
                    <Text className="text-3xl font-bold text-gray-900">
                      {Math.round(pricing.discounted).toLocaleString()}
                    </Text>
                    <Text className="text-gray-600 ml-2">FCFA</Text>
                  </View>
                  {pricing.discount > 0 && (
                    <View className="flex-row items-center">
                      <Text className="text-sm text-gray-500 line-through mr-2">
                        {pricing.original.toLocaleString()} FCFA
                      </Text>
                      <View className="bg-red-100 px-2 py-1 rounded">
                        <Text className="text-red-700 font-bold text-xs">-{pricing.discount}%</Text>
                      </View>
                    </View>
                  )}
                  <Text className="text-sm text-gray-600 mt-2">{plan.duration}</Text>
                </View>

                {/* Features */}
                <View className="mb-4">
                  {features.map((feature, index) => (
                    <View key={index} className="flex-row items-center mb-2">
                      <Text className="text-green-600 mr-2">✓</Text>
                      <Text className="text-gray-700 text-sm">{feature}</Text>
                    </View>
                  ))}
                </View>

                {/* Selection Indicator */}
                {isSelected && (
                  <View className="flex-row items-center justify-center bg-medical-600 rounded-lg p-3">
                    <Text className="text-white font-bold">Sélectionné ✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Upgrade Button */}
        {selectedPlan && selectedPlan !== currentSubscription?.id && (
          <View className="px-6 py-6 border-t border-gray-200">
            <TouchableOpacity
              onPress={handleUpgrade}
              disabled={upgrading}
              className="w-full bg-medical-600 p-4 rounded-lg items-center"
            >
              <Text className="text-white font-bold text-lg">
                {upgrading ? 'Mise à jour en cours...' : 'Mettre à jour l\'abonnement'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* FAQ */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Questions fréquentes</Text>

          <View className="space-y-4">
            <View className="bg-white rounded-lg p-4 border border-gray-200">
              <Text className="font-bold text-gray-900 mb-2">Puis-je changer de plan ?</Text>
              <Text className="text-sm text-gray-600">
                Oui, vous pouvez changer de plan à tout moment. Les frais seront ajustés au prorata.
              </Text>
            </View>

            <View className="bg-white rounded-lg p-4 border border-gray-200">
              <Text className="font-bold text-gray-900 mb-2">Que se passe-t-il si je n'ai pas renouvelé ?</Text>
              <Text className="text-sm text-gray-600">
                Votre compte sera suspendu après 7 jours. Vous pouvez le réactiver en renouvelant votre abonnement.
              </Text>
            </View>

            <View className="bg-white rounded-lg p-4 border border-gray-200">
              <Text className="font-bold text-gray-900 mb-2">Puis-je obtenir un remboursement ?</Text>
              <Text className="text-sm text-gray-600">
                Nous offrons une garantie de satisfaction de 30 jours. Contactez le support pour plus d'informations.
              </Text>
            </View>
          </View>
        </View>

        {/* Support */}
        <View className="px-6 py-6">
          <TouchableOpacity className="w-full bg-blue-50 p-4 rounded-lg items-center border border-blue-200">
            <Text className="text-blue-600 font-bold">Contacter le support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
