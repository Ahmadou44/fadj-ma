import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { ChevronLeft, MessageSquare, Zap, ShieldCheck, Camera, CreditCard, ChevronRight, Activity } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen({ route, navigation }: any) {
    const { stock } = route.params;

    const [hasPrescription, setHasPrescription] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

    const handleUpload = () => {
        setUploading(true);
        setTimeout(() => {
            setHasPrescription(true);
            setUploading(false);
            Alert.alert("DATA SYNC", "Ordonnance scannée avec succès. Cryptage validé.");
        }, 1500);
    };

    const handleOrder = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patientId: 'mock-patient-id',
                    pharmacyId: stock.pharmacyId,
                    drugId: stock.drugId,
                    quantity: 1,
                    price: stock.price,
                    paymentMethod,
                    prescriptionUrl: hasPrescription ? 'https://example.com/mock-prescription.jpg' : null
                })
            });

            if (response.ok) {
                Alert.alert(
                    "PROTOCOL INITIATED",
                    `Votre commande de ${stock.drug.name} est en cours de traitement.`,
                    [{ text: "OK", onPress: () => navigation.navigate('Home') }]
                );
            } else {
                Alert.alert("SYSTEM ERROR", "Code 500: Échec de la transmission.");
            }
        } catch (error) {
            Alert.alert("CONNECTION LOST", "Impossible de joindre la base centrale.");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#f8fafc]">
            {/* Custom Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => navigation.goBack()} className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-slate-100">
                    <ChevronLeft size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Bio-Entity ID</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Chat', { pharmacyId: stock.pharmacyId, pharmacyName: stock.pharmacy.name })}
                    className="w-12 h-12 bg-medical-50 rounded-2xl items-center justify-center shadow-sm border border-medical-100"
                >
                    <MessageSquare size={20} color="#16a34a" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* Hero Section */}
                <View className="px-6 py-8 items-center">
                    <View className="w-48 h-48 bg-white rounded-[3rem] shadow-2xl shadow-slate-200 flex items-center justify-center p-2 mb-8 relative">
                        <View className="absolute inset-0 bg-medical-500/5 rounded-[3rem] blur-xl"></View>
                        <View className="w-full h-full bg-slate-50 rounded-[2.5rem] items-center justify-center border border-slate-100">
                            <Text className="text-7xl font-black text-medical-600 opacity-20">{stock.drug.name.charAt(0)}</Text>
                            <View className="absolute">
                                <Activity size={80} color="#16a34a" strokeWidth={1} />
                            </View>
                        </View>
                    </View>

                    <Text className="text-[10px] font-black text-medical-600 uppercase tracking-[0.4em] mb-2 bg-medical-50 px-4 py-1 rounded-full">Biological sequence</Text>
                    <Text className="text-4xl font-black text-slate-900 tracking-tighter text-center">{stock.drug.name}</Text>
                    <Text className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mt-2">{stock.drug.form} • {stock.drug.class}</Text>
                </View>

                <View className="px-6 space-y-8">
                    {/* Pharmacy Info Card */}
                    <View className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-100 flex-row items-center">
                        <View className="flex-1">
                            <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Source Node</Text>
                            <Text className="text-xl font-black text-slate-800 tracking-tight">{stock.pharmacy.name}</Text>
                            <Text className="text-slate-500 text-xs font-medium mt-1">{stock.pharmacy.address}</Text>
                        </View>
                        <View className="bg-medical-50 p-4 rounded-3xl">
                            <ShieldCheck size={28} color="#16a34a" />
                        </View>
                    </View>

                    {/* Price & Stock Card */}
                    <View className="flex-row gap-4">
                        <View className="flex-1 bg-slate-900 p-6 rounded-[2rem] shadow-xl shadow-slate-900/20">
                            <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Market Price</Text>
                            <Text className="text-white text-3xl font-black tracking-tighter">{stock.price}F</Text>
                        </View>
                        <View className="flex-1 bg-white border border-slate-100 p-6 rounded-[2rem]">
                            <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Inventory</Text>
                            <View className="flex-row items-center gap-2">
                                <View className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></View>
                                <Text className="text-slate-800 text-xl font-black uppercase tracking-tighter">Optimal</Text>
                            </View>
                        </View>
                    </View>

                    {/* Scanner Section */}
                    <View>
                        <Text className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-2">Prescription Scan Required</Text>
                        <TouchableOpacity
                            onPress={handleUpload}
                            disabled={uploading || hasPrescription}
                            className={`p-6 rounded-[2rem] border-2 border-dashed flex-row items-center justify-center h-24 ${hasPrescription ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}
                        >
                            {uploading ? (
                                <ActivityIndicator color="#16a34a" />
                            ) : (
                                <>
                                    <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${hasPrescription ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                        <Camera size={24} color={hasPrescription ? 'white' : '#64748b'} />
                                    </View>
                                    <Text className={`text-lg font-black tracking-tight ${hasPrescription ? 'text-emerald-700' : 'text-slate-400'}`}>
                                        {hasPrescription ? 'DATA VERIFIED' : 'START SCAN'}
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Payment Matrix */}
                    <View className="mb-10">
                        <Text className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-2">Payment Matrix</Text>
                        <View className="flex-row gap-4">
                            {[
                                { id: 'ORANGE_MONEY', name: 'Orange', color: '#ff7900' },
                                { id: 'FREE_MONEY', name: 'Free', color: '#e30613' }
                            ].map((method) => (
                                <TouchableOpacity
                                    key={method.id}
                                    onPress={() => setPaymentMethod(method.id)}
                                    className={`flex-1 p-5 rounded-[2rem] border-2 flex-row items-center justify-center gap-3 transition-all ${paymentMethod === method.id ? 'bg-white border-medical-500 shadow-xl' : 'bg-white border-slate-50 shadow-sm'}`}
                                >
                                    <View className="p-2 bg-slate-50 rounded-xl">
                                        <CreditCard size={18} color={paymentMethod === method.id ? '#16a34a' : '#64748b'} />
                                    </View>
                                    <Text className="font-black text-slate-800 tracking-tighter">{method.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer Action */}
            <View className="p-8 bg-white/80 backdrop-blur-3xl border-t border-slate-100">
                <TouchableOpacity
                    className={`w-full py-6 rounded-[2rem] flex-row items-center justify-center shadow-2xl ${hasPrescription && paymentMethod ? 'bg-medical-600 shadow-medical-600/30' : 'bg-slate-200 shadow-none'}`}
                    onPress={handleOrder}
                    disabled={!hasPrescription || !paymentMethod}
                >
                    <Text className="text-white font-black text-xl tracking-tighter mr-2">EXECUTE PROTOCOL</Text>
                    <ChevronRight size={24} color="white" strokeWidth={3} />
                </TouchableOpacity>
                {!hasPrescription && (
                    <Text className="text-center text-[10px] font-black text-red-500 uppercase tracking-widest mt-4">Security Guard: Prescription Missing</Text>
                )}
            </View>
        </SafeAreaView>
    );
}
