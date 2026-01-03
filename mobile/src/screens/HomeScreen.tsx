import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

// Configuration
const API_URL = 'http://localhost:3000/api/pharmacy'; // Use standard localhost, expo handles proxy usually or use IP if testing on device
const CATEGORIES = [
    { name: 'Douleur', icon: '🤕' },
    { name: 'Grippe', icon: '🤧' },
    { name: 'Vitamines', icon: '🍊' },
    { name: 'Digestion', icon: '🤢' },
    { name: 'Bébé', icon: '👶' },
    { name: 'Premiers Secours', icon: '🩹' },
];

export default function HomeScreen({ navigation }: any) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            // Mock fetch for prototype if server not reachable, else fetch
            // const res = await fetch(`${API_URL}/search?q=paracetamol`);
            // const data = await res.json();
            // setProducts(data);

            // Simulating API response for robust demo
            setTimeout(() => {
                setProducts([
                    { id: '1', name: 'Doliprane 1000mg', price: 1000, pharmacy: { name: 'Pharmacie Centrale' } },
                    { id: '2', name: 'Efferalgan 1g', price: 1200, pharmacy: { name: 'Pharmacie du Plateau' } },
                    { id: '3', name: 'Vitamin C', price: 1500, pharmacy: { name: 'Pharmacie Mermoz' } },
                ]);
                setLoading(false);
            }, 1000);

        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="px-5 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
                <View>
                    <Text className="text-2xl font-bold text-medical-600">Fadj Ma</Text>
                    <Text className="text-xs text-gray-500">Dakar, Sénégal 📍</Text>
                </View>
                <TouchableOpacity
                    className="bg-medical-50 p-2 rounded-full"
                    onPress={() => navigation.navigate('Map')}
                >
                    <Text className="text-2xl">🗺️</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                {/* Search Banner */}
                <View className="bg-medical-600 px-5 py-6 pb-12 rounded-b-3xl shadow-sm">
                    <Text className="text-white text-xl font-bold mb-2">Besoin d'un médicament ?</Text>
                    <Text className="text-medical-100 mb-6">Trouvez-le dans la pharmacie la plus proche.</Text>

                    <View className="bg-white p-4 rounded-xl shadow-lg flex-row items-center">
                        <Text className="text-xl mr-3">🔍</Text>
                        <TextInput
                            placeholder="Rechercher (ex: Doliprane...)"
                            className="flex-1 text-lg text-gray-800"
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* Categories */}
                <View className="mt-6 px-5">
                    <Text className="text-lg font-bold text-gray-900 mb-4">Catégories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible">
                        {CATEGORIES.map((cat, index) => (
                            <TouchableOpacity key={index} className="mr-4 items-center">
                                <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center shadow-sm border border-gray-100 mb-2">
                                    <Text className="text-2xl">{cat.icon}</Text>
                                </View>
                                <Text className="text-xs font-medium text-gray-600">{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Popular / Recent */}
                <View className="mt-8 px-5 pb-10">
                    <Text className="text-lg font-bold text-gray-900 mb-4">Populaires à Dakar</Text>

                    {loading ? (
                        <ActivityIndicator color="#2ECC71" />
                    ) : (
                        products.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                className="bg-white p-4 rounded-xl mb-3 flex-row items-center border border-gray-100 shadow-sm"
                                onPress={() => navigation.navigate('ProductDetails', { stock: item })} // Mock passing data
                            >
                                <View className="w-12 h-12 bg-medical-50 rounded-lg items-center justify-center mr-4">
                                    <Text className="text-xl">💊</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="font-bold text-gray-800 text-lg">{item.name}</Text>
                                    <Text className="text-gray-500 text-sm">{item.pharmacy.name}</Text>
                                </View>
                                <Text className="font-bold text-medical-600">{item.price} F</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
