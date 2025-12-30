import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

// FOR ANDROID EMULATOR: Use 'http://10.0.2.2:3000'
// FOR REAL DEVICE: Use your computer's IP, e.g. 'http://192.168.1.XX:3000'
// FOR IOS SIMULATOR: Use 'http://localhost:3000'
const API_URL = 'http://10.0.2.2:3000/api/pharmacy';


export default function HomeScreen({ navigation }: any) {
    const [products, setProducts] = useState<any[]>([]);
    const [pharmacies, setPharmacies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch Products
            const resProd = await fetch(`${API_URL}/search?q=a`);
            const dataProd = await resProd.json();
            setProducts(dataProd.slice(0, 5));

            // Fetch Pharmacies
            const resPharma = await fetch(`${API_URL}/`);
            const dataPharma = await resPharma.json();
            setPharmacies(dataPharma.slice(0, 5)); // Show top 5
        } catch (e) {
            console.error("Error fetching data:", e);
        } finally {
            setLoading(false);
        }
    };
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
            <View className="mb-6">
                <Text className="text-lg font-bold text-gray-800 mb-2">Pharmacies à proximité</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {pharmacies.map((pharmacy) => (
                        <View key={pharmacy.id} className="mr-4 bg-white p-3 rounded-xl border border-gray-100 w-48">
                            <View className="h-24 bg-medical-100 rounded-lg mb-2 items-center justify-center">
                                <Text className="text-2xl text-medical-600">🏥</Text>
                            </View>
                            <Text className="font-bold text-gray-800 truncate">{pharmacy.name}</Text>
                            <Text className="text-xs text-gray-500 truncate">{pharmacy.address}</Text>
                        </View>
                    ))}
                    {pharmacies.length === 0 && <Text className="text-gray-400 italic">Aucune pharmacie trouvée.</Text>}
                </ScrollView>
            </View>

            <Text className="text-lg font-bold text-gray-800 mb-4">Produits Populaires</Text>


            {loading ? (
                <Text className="text-gray-500">Chargement...</Text>
            ) : (
                <View>
                    {products.map((stock) => (
                        <View key={stock.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="font-bold text-lg">{stock.drug.name}</Text>
                                <Text className="text-medical-600 font-bold">{stock.price} F</Text>
                            </View>
                            <Text className="text-gray-500">Pharmacie: {stock.pharmacy.name}</Text>
                            <TouchableOpacity
                                className="mt-3 bg-medical-600 py-2 rounded-lg items-center"
                                onPress={() => navigation.navigate('ProductDetails', { stock })}
                            >
                                <Text className="text-white font-bold">Voir détails</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
        </SafeAreaView>
    );
}
