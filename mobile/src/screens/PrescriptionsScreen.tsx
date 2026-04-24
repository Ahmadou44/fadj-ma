import { View, Text, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { apiService } from '../services/api';

interface Prescription {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  doctorName?: string;
  medicines?: string[];
}

export default function PrescriptionsScreen({ navigation }: any) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPrescriptions();
      setPrescriptions(data);
    } catch (error) {
      console.error('Error loading prescriptions:', error);
      Alert.alert('Erreur', 'Impossible de charger les ordonnances');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      if (result.type === 'success') {
        setUploading(true);
        await apiService.uploadPrescription(result);
        Alert.alert('Succès', 'Ordonnance uploadée avec succès');
        loadPrescriptions();
      }
    } catch (error) {
      console.error('Error uploading prescription:', error);
      Alert.alert('Erreur', 'Impossible d\'uploader l\'ordonnance');
    } finally {
      setUploading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100';
      case 'approved':
        return 'bg-green-100';
      case 'rejected':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente',
      approved: 'Approuvée',
      rejected: 'Rejetée',
    };
    return labels[status] || status;
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
            <Text className="text-white text-lg font-bold">Ordonnances</Text>
            <View className="w-6" />
          </View>
        </View>

        {/* Upload Section */}
        <View className="px-6 py-6">
          <TouchableOpacity
            onPress={handleUpload}
            disabled={uploading}
            className="w-full bg-medical-50 border-2 border-dashed border-medical-600 rounded-lg p-8 items-center"
          >
            <Text className="text-4xl mb-3">📄</Text>
            <Text className="text-medical-600 font-bold mb-2">
              {uploading ? 'Upload en cours...' : 'Uploader une ordonnance'}
            </Text>
            <Text className="text-sm text-gray-600 text-center">
              Cliquez pour sélectionner une image ou un PDF
            </Text>
          </TouchableOpacity>

          <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <Text className="text-sm text-blue-900">
              <Text className="font-bold">💡 Conseil :</Text> Vous pouvez uploader des photos de votre ordonnance ou un fichier PDF. Les pharmaciens valideront votre ordonnance dans les 24 heures.
            </Text>
          </View>
        </View>

        {/* Prescriptions List */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Mes ordonnances</Text>

          {loading ? (
            <View className="items-center py-8">
              <Text className="text-gray-600">Chargement...</Text>
            </View>
          ) : prescriptions.length === 0 ? (
            <View className="items-center py-8">
              <Text className="text-4xl mb-3">📭</Text>
              <Text className="text-gray-600 font-semibold">Aucune ordonnance</Text>
              <Text className="text-gray-500 text-sm mt-2">Uploadez votre première ordonnance</Text>
            </View>
          ) : (
            prescriptions.map((prescription) => (
              <TouchableOpacity
                key={prescription.id}
                onPress={() => navigation.navigate('PrescriptionDetail', { prescription })}
                className="bg-white rounded-lg p-4 mb-3 border border-gray-200"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center mr-3">
                      <Text className="text-2xl">📋</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="font-semibold text-gray-900">{prescription.fileName}</Text>
                      <Text className="text-sm text-gray-600 mt-1">
                        {new Date(prescription.uploadDate).toLocaleDateString('fr-FR')}
                      </Text>
                    </View>
                  </View>
                  <View className={`${getStatusColor(prescription.status)} px-3 py-1 rounded-full`}>
                    <Text className="text-xs font-bold text-gray-700">
                      {getStatusLabel(prescription.status)}
                    </Text>
                  </View>
                </View>

                {prescription.status === 'approved' && prescription.medicines && (
                  <View className="bg-green-50 rounded-lg p-3 mt-3">
                    <Text className="text-xs font-semibold text-green-700 mb-2">Médicaments prescrits</Text>
                    {prescription.medicines.map((medicine, index) => (
                      <Text key={index} className="text-sm text-green-700">
                        • {medicine}
                      </Text>
                    ))}
                  </View>
                )}

                {prescription.status === 'rejected' && (
                  <View className="bg-red-50 rounded-lg p-3 mt-3">
                    <Text className="text-xs font-semibold text-red-700 mb-1">Raison du rejet</Text>
                    <Text className="text-sm text-red-700">
                      L'ordonnance n'est pas lisible. Veuillez uploader une meilleure image.
                    </Text>
                  </View>
                )}

                {prescription.status === 'pending' && (
                  <View className="bg-yellow-50 rounded-lg p-3 mt-3">
                    <Text className="text-xs font-semibold text-yellow-700">
                      ⏳ En attente de validation par un pharmacien
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* FAQ */}
        <View className="px-6 py-6 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">Questions fréquentes</Text>

          <View className="space-y-3">
            <View className="bg-white rounded-lg p-4 border border-gray-200">
              <Text className="font-bold text-gray-900 mb-2">Combien de temps pour la validation ?</Text>
              <Text className="text-sm text-gray-600">
                Les ordonnances sont généralement validées dans les 24 heures.
              </Text>
            </View>

            <View className="bg-white rounded-lg p-4 border border-gray-200">
              <Text className="font-bold text-gray-900 mb-2">Puis-je commander sans ordonnance ?</Text>
              <Text className="text-sm text-gray-600">
                Certains médicaments ne nécessitent pas d'ordonnance. Vous pouvez les commander directement.
              </Text>
            </View>

            <View className="bg-white rounded-lg p-4 border border-gray-200">
              <Text className="font-bold text-gray-900 mb-2">Mes données sont-elles sécurisées ?</Text>
              <Text className="text-sm text-gray-600">
                Oui, vos ordonnances sont chiffrées et protégées selon les normes HIPAA.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
