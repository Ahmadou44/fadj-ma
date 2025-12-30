import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailsScreen({ route, navigation }: any) {
    const { stock } = route.params;

    const handleOrder = () => {
        Alert.alert(
            "Commande Confirmée",
            `Votre commande de ${stock.drug.name} à la ${stock.pharmacy.name} a été validée.`,
            [{ text: "OK", onPress: () => navigation.goBack() }]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="p-4 border-b border-gray-100 flex-row items-center">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                    <Text className="text-xl font-bold text-gray-500">←</Text>
                </TouchableOpacity>
                <Text className="text-lg font-bold">Détails du Produit</Text>
            </View>

            <ScrollView className="p-6">
                <View className="bg-medical-50 p-6 rounded-2xl mb-6 items-center">
                    <View className="w-20 h-20 bg-medical-200 rounded-full mb-4 items-center justify-center">
                        <Text className="text-3xl text-medical-600 font-bold">{stock.drug.name.charAt(0)}</Text>
                    </View>
                    <Text className="text-2xl font-bold text-center text-gray-800">{stock.drug.name}</Text>
                    <Text className="text-gray-500">{stock.drug.form} • {stock.drug.class}</Text>
                </View>

                <View className="space-y-4">
                    <View className="bg-white border border-gray-200 p-4 rounded-xl">
                        <Text className="text-sm text-gray-500 mb-1">Pharmacie</Text>
                        <Text className="text-lg font-semibold">{stock.pharmacy.name}</Text>
                        <Text className="text-gray-600">{stock.pharmacy.address}</Text>
                    </View>

                    <View className="bg-white border border-gray-200 p-4 rounded-xl flex-row justify-between items-center">
                        <View>
                            <Text className="text-sm text-gray-500 mb-1">Prix Unitaire</Text>
                            <Text className="text-2xl font-bold text-medical-600">{stock.price} F</Text>
                        </View>
                        <View className="bg-green-100 px-3 py-1 rounded-full">
                            <Text className="text-green-700 font-bold">En Stock</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className="p-4 border-t border-gray-100 bg-white">
                <TouchableOpacity
                    className="bg-medical-600 w-full py-4 rounded-xl items-center shadow-lg"
                    onPress={handleOrder}
                >
                    <Text className="text-white font-bold text-lg">Commander Maintenant</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
