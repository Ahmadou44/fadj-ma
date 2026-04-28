import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Search, Map as MapIcon, Activity, Bell, Zap, Droplets, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const API_URL = 'http://10.0.2.2:3000/api/pharmacy';

export default function HomeScreen({ navigation }: any) {
    const [products, setProducts] = useState<any[]>([]);
    const [pharmacies, setPharmacies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [lastOrderId, setLastOrderId] = useState<string | null>(null);
    const [userLocation] = useState({ latitude: 14.6928, longitude: -17.4467 }); // Center Dakar
    const [tipIndex, setTipIndex] = useState(0);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (R * c).toFixed(1);
    };

    const openInMaps = (lat: number, lng: number, name: string) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        Alert.alert("NAVIGATE", `Ouvrir l'itinéraire vers ${name} ?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Open Maps", onPress: () => {} } // In a real app, use Linking.openURL(url)
        ]);
    };
    const tips = [
        "Buvez 2L d'eau pour optimiser la synchronisation neurale.",
        "La lumière du matin booste votre sérotonine.",
        "Prenez une pause respiratoire de 5 min.",
        "Les Oméga-3 sont essentiels pour le cerveau.",
        "Dormir 8h améliore l'efficacité métabolique."
    ];

    useEffect(() => {
        fetchData();
        const interval = setInterval(checkNotifications, 10000);
        const tipInterval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % tips.length);
        }, 7000);
        return () => {
            clearInterval(interval);
            clearInterval(tipInterval);
        };
    }, []);

    const checkNotifications = async () => {
        try {
            const res = await fetch('http://10.0.2.2:3000/api/order/patient/mock-patient-id');
            const orders = await res.json();
            if (orders.length > 0) {
                const latest = orders[0];
                if (latest.status !== 'PENDING' && latest.id !== lastOrderId) {
                    setLastOrderId(latest.id);
                    Alert.alert("FADJ MA NOVA", `Protocol Update: Order for ${latest.items[0].drug.name} is now ${latest.status}`);
                }
            }
        } catch (e) { }
    };

    const fetchData = async () => {
        try {
            const resProd = await fetch(`${API_URL}/search?q=a`);
            const dataProd = await resProd.json();
            setProducts(dataProd.slice(0, 5));

            const resPharma = await fetch(`${API_URL}/`);
            const dataPharma = await resPharma.json();
            setPharmacies(dataPharma.slice(0, 10));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (text: string) => {
        setSearchQuery(text);
        if (text.length > 2) {
            setLoading(true);
            try {
                const res = await fetch(`${API_URL}/search?q=${text}`);
                const data = await res.json();
                setProducts(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        } else if (text.length === 0) {
            fetchData();
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#f8fafc]">
            {/* Top Bar */}
            <View className="px-6 py-4 flex-row justify-between items-center">
                <View>
                    <Text className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Welcome to</Text>
                    <Text className="text-3xl font-black text-slate-900 tracking-tighter">FADJ <Text className="text-medical-600">MA</Text></Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Map', { pharmacies })} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                    <MapIcon size={24} color="#16a34a" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
                {/* Search Terminal */}
                <View className="bg-white rounded-[2rem] p-2 mt-4 shadow-xl shadow-slate-200/50 border border-slate-50">
                    <View className="flex-row items-center px-4 py-1">
                        <Search size={22} color="#94a3b8" />
                        <TextInput
                            placeholder="Scan Molecule Database..."
                            className="flex-1 h-14 ml-3 text-lg font-bold text-slate-800"
                            placeholderTextColor="#cbd5e1"
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>
                </View>

                {/* Banner / Vital Info */}
                <View className="mt-8 bg-medical-600 rounded-[2.5rem] p-6 relative overflow-hidden shadow-2xl shadow-medical-600/20">
                    <View className="absolute top-[-20] right-[-20] w-40 h-40 bg-white/10 rounded-full" />
                    <View className="flex-row justify-between items-center">
                        <View className="flex-1 pr-4">
                            <Text className="text-white/80 font-black uppercase text-[10px] tracking-widest mb-1">System Status</Text>
                            <Text className="text-white text-2xl font-black tracking-tight leading-7">All Systems Nominal. 40+ Pharmacies Active.</Text>
                        </View>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Prescriptions')}
                            className="bg-white/20 p-4 rounded-3xl backdrop-blur-md"
                        >
                            <FileText size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Health Hack Section */}
                <View className="mt-8 bg-emerald-50 rounded-[2.5rem] p-6 border border-emerald-100 flex-row items-center space-x-4">
                    <View className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm">
                        <Droplets size={24} color="#10b981" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Health Protocol Advice</Text>
                        <Text className="text-slate-700 font-bold tracking-tight leading-5">{tips[tipIndex]}</Text>
                    </View>
                </View>

                {/* Categories */}
                <View className="mt-8">
                    <Text className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Functional Modules</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {[
                            { name: 'Pain', icon: <Zap size={20} color="#16a34a" /> },
                            { name: 'Flu', icon: <Droplets size={20} color="#16a34a" /> },
                            { name: 'Vitals', icon: <Heart size={20} color="#16a34a" /> },
                            { name: 'Emerg', icon: <Zap size={20} color="#16a34a" /> },
                        ].map((cat, index) => (
                            <TouchableOpacity key={index} className="bg-white mr-4 p-5 rounded-[2rem] border border-slate-100 items-center justify-center min-w-[100px] shadow-sm">
                                <View className="bg-medical-50 p-3 rounded-2xl mb-2">{cat.icon}</View>
                                <Text className="font-black text-slate-800 text-xs tracking-tight">{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Pharmacies Overlay */}
                <View className="mt-10">
                    <Text className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Nearby Terminals</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {pharmacies.map((pharmacy) => (
                            <TouchableOpacity key={pharmacy.id} className="mr-6 bg-white p-6 rounded-[2.5rem] border border-slate-100 w-64 shadow-lg shadow-slate-200/30 overflow-hidden relative">
                                <View className="absolute top-0 right-0 w-24 h-24 bg-medical-50/50 rounded-full -mr-12 -mt-12" />
                                <View className="flex-row justify-between items-start mb-4">
                                    <View className="bg-medical-50 w-14 h-14 rounded-2xl items-center justify-center">
                                        <Text className="text-3xl">🏥</Text>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => openInMaps(pharmacy.latitude, pharmacy.longitude, pharmacy.name)}
                                        className="bg-slate-50 p-3 rounded-xl border border-slate-100"
                                    >
                                        <MapIcon size={18} color="#64748b" />
                                    </TouchableOpacity>
                                </View>
                                <Text className="text-xl font-black text-slate-900 tracking-tighter mb-1" numberOfLines={1}>{pharmacy.name}</Text>
                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <Text className="text-[10px] text-medical-600 font-bold uppercase tracking-widest">• {calculateDistance(userLocation.latitude, userLocation.longitude, pharmacy.latitude, pharmacy.longitude)} km</Text>
                                    </View>
                                    <Text className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Open Now</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Popular Products */}
                <View className="mt-10 mb-10">
                    <Text className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Trending Bio-Data</Text>
                    {products.map((stock) => (
                        <TouchableOpacity
                            key={stock.id}
                            onPress={() => navigation.navigate('ProductDetails', { stock })}
                            className="bg-white rounded-[2.5rem] p-6 mb-5 shadow-lg shadow-slate-100 border border-slate-50 flex-row items-center"
                        >
                            <View className="w-16 h-16 bg-slate-50 rounded-2xl items-center justify-center mr-6 border border-slate-100">
                                <Text className="text-2xl font-black text-medical-600">{stock.drug.name.charAt(0)}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-lg font-black text-slate-900 tracking-tighter mb-1">{stock.drug.name}</Text>
                                <Text className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{stock.pharmacy.name}</Text>
                            </View>
                            <View className="items-end bg-medical-50 px-4 py-2 rounded-2xl">
                                <Text className="text-lg font-black text-medical-600">{stock.price}F</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
