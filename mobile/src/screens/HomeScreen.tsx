import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Icons are tricky in RN without vector-icons setup, using Text for now or lucide-react-native if installed.
// We'll use simple text for buttons.

export default function HomeScreen({ navigation }: any) {
    return (
        <SafeAreaView className="flex-1 bg-medical-50 p-4">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-2xl font-bold text-medical-600">Fadj Ma</Text>
                    <Text className="text-gray-500">Trouvez votre médicament</Text>
                </View>
                <TouchableOpacity
                    className="bg-medical-100 p-2 rounded-full"
                    onPress={() => navigation.navigate('Map')}
                >
                    <Text className="text-medical-600 font-bold">MAP</Text>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="bg-white p-4 rounded-xl shadow-sm mb-6">
                <TextInput
                    placeholder="Rechercher (ex: Doliprane 1000)"
                    className="text-lg text-gray-800"
                />
            </View>

            {/* Categories */}
            <Text className="text-lg font-bold text-gray-800 mb-4">Catégories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                {['Douleur', 'Grippe', 'Vitamines', 'Premiers Secours', 'Bébé'].map((cat, index) => (
                    <TouchableOpacity key={index} className="bg-white mr-3 px-6 py-3 rounded-lg border border-gray-100">
                        <Text className="font-medium text-gray-700">{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Recent / Promotions */}
            <Text className="text-lg font-bold text-gray-800 mb-4">Produits Populaires</Text>
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="font-bold text-lg">Paracétamol 500mg</Text>
                    <Text className="text-medical-600 font-bold">500 F</Text>
                </View>
                <Text className="text-gray-500">Dispo: 12 Pharmacies</Text>
                <TouchableOpacity className="mt-3 bg-medical-600 py-2 rounded-lg items-center">
                    <Text className="text-white font-bold">Voir disponibilités</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
