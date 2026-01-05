import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface AnalyticsData {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  completionRate: number;
  topMedicines: Array<{ name: string; quantity: number; revenue: number }>;
  ordersByDay: Array<{ date: string; count: number }>;
  customerSatisfaction: number;
}

export default function AnalyticsScreen({ navigation }: any) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // TODO: Remplacer par l'appel API réel
      const mockData: AnalyticsData = {
        totalOrders: 156,
        totalRevenue: 2340000,
        averageOrderValue: 15000,
        completionRate: 94,
        topMedicines: [
          { name: 'Paracétamol 500mg', quantity: 245, revenue: 122500 },
          { name: 'Ibuprofène 400mg', quantity: 189, revenue: 151200 },
          { name: 'Amoxicilline 500mg', quantity: 134, revenue: 160800 },
        ],
        ordersByDay: [
          { date: 'Lun', count: 22 },
          { date: 'Mar', count: 28 },
          { date: 'Mer', count: 19 },
          { date: 'Jeu', count: 31 },
          { date: 'Ven', count: 35 },
          { date: 'Sam', count: 15 },
          { date: 'Dim', count: 6 },
        ],
        customerSatisfaction: 4.7,
      };
      setAnalytics(mockData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600">Chargement...</Text>
      </SafeAreaView>
    );
  }

  if (!analytics) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600">Impossible de charger les données</Text>
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
            <Text className="text-white text-lg font-bold">Analytics</Text>
            <View className="w-6" />
          </View>
        </View>

        {/* Period Selector */}
        <View className="px-6 py-6 flex-row justify-between">
          {(['week', 'month', 'year'] as const).map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg border ${
                period === p
                  ? 'bg-medical-600 border-medical-600'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text
                className={`font-semibold capitalize ${
                  period === p ? 'text-white' : 'text-gray-700'
                }`}
              >
                {p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : 'Année'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Key Metrics */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Métriques clés</Text>

          <View className="flex-row justify-between mb-4">
            <View className="flex-1 bg-white rounded-lg p-4 mr-2 border border-gray-200">
              <Text className="text-gray-600 text-sm mb-2">Commandes</Text>
              <Text className="text-3xl font-bold text-medical-600">
                {analytics.totalOrders}
              </Text>
              <Text className="text-xs text-gray-500 mt-2">+12% vs période précédente</Text>
            </View>

            <View className="flex-1 bg-white rounded-lg p-4 ml-2 border border-gray-200">
              <Text className="text-gray-600 text-sm mb-2">Revenu</Text>
              <Text className="text-2xl font-bold text-green-600">
                {(analytics.totalRevenue / 1000000).toFixed(1)}M
              </Text>
              <Text className="text-xs text-gray-500 mt-2">FCFA</Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-1 bg-white rounded-lg p-4 mr-2 border border-gray-200">
              <Text className="text-gray-600 text-sm mb-2">Panier moyen</Text>
              <Text className="text-2xl font-bold text-blue-600">
                {analytics.averageOrderValue.toLocaleString()}
              </Text>
              <Text className="text-xs text-gray-500 mt-2">FCFA</Text>
            </View>

            <View className="flex-1 bg-white rounded-lg p-4 ml-2 border border-gray-200">
              <Text className="text-gray-600 text-sm mb-2">Taux de complétion</Text>
              <Text className="text-2xl font-bold text-purple-600">
                {analytics.completionRate}%
              </Text>
              <Text className="text-xs text-gray-500 mt-2">Commandes complétées</Text>
            </View>
          </View>
        </View>

        {/* Orders by Day Chart */}
        <View className="px-6 pb-6 border-t border-gray-200 pt-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Commandes par jour</Text>

          <View className="bg-white rounded-lg p-4 border border-gray-200">
            <View className="flex-row items-flex-end justify-between h-40">
              {analytics.ordersByDay.map((day, index) => {
                const maxCount = Math.max(...analytics.ordersByDay.map((d) => d.count));
                const height = (day.count / maxCount) * 120;

                return (
                  <View key={index} className="items-center flex-1">
                    <View
                      className="w-6 bg-medical-600 rounded-t"
                      style={{ height: `${height}px` }}
                    />
                    <Text className="text-xs text-gray-600 mt-2">{day.date}</Text>
                    <Text className="text-xs font-bold text-gray-900">{day.count}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Top Medicines */}
        <View className="px-6 pb-6 border-t border-gray-200 pt-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Meilleurs médicaments</Text>

          {analytics.topMedicines.map((medicine, index) => (
            <View key={index} className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View className="bg-medical-100 w-6 h-6 rounded-full items-center justify-center mr-2">
                      <Text className="text-medical-600 font-bold text-xs">{index + 1}</Text>
                    </View>
                    <Text className="font-bold text-gray-900">{medicine.name}</Text>
                  </View>
                  <Text className="text-sm text-gray-600">
                    {medicine.quantity} unités vendues
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-lg font-bold text-green-600">
                    {medicine.revenue.toLocaleString()}
                  </Text>
                  <Text className="text-xs text-gray-600">FCFA</Text>
                </View>
              </View>

              <View className="bg-gray-100 h-2 rounded-full overflow-hidden">
                <View
                  className="bg-medical-600 h-full rounded-full"
                  style={{
                    width: `${
                      (medicine.quantity /
                        Math.max(...analytics.topMedicines.map((m) => m.quantity))) *
                      100
                    }%`,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Customer Satisfaction */}
        <View className="px-6 pb-6 border-t border-gray-200 pt-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Satisfaction client</Text>

          <View className="bg-white rounded-lg p-6 border border-gray-200 items-center">
            <View className="flex-row items-baseline mb-4">
              <Text className="text-5xl font-bold text-yellow-500">
                {analytics.customerSatisfaction}
              </Text>
              <Text className="text-2xl text-yellow-500 ml-2">/5</Text>
            </View>

            <View className="flex-row mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Text
                  key={star}
                  className={`text-2xl ${
                    star <= Math.round(analytics.customerSatisfaction)
                      ? 'text-yellow-500'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </Text>
              ))}
            </View>

            <Text className="text-sm text-gray-600 text-center">
              Basé sur {Math.floor(Math.random() * 500) + 100} avis clients
            </Text>
          </View>
        </View>

        {/* Export Button */}
        <View className="px-6 pb-6">
          <TouchableOpacity className="w-full bg-blue-50 p-4 rounded-lg items-center border border-blue-200">
            <Text className="text-blue-600 font-bold">📥 Exporter le rapport</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
