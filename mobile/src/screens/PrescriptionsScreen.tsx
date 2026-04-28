import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, FileText, Download, Calendar, ShieldCheck } from 'lucide-react-native';

const MOCK_PRESCRIPTIONS = [
    {
        id: 'PRE-2026-001',
        doctor: 'Dr. Abdoulaye Sy',
        date: '2026-04-15',
        diagnosis: 'Angine bactérienne',
        drugs: ['Amoxicilline 1g', 'Doliprane 1000mg'],
        status: 'USED',
        url: 'https://example.com/prescription1.jpg'
    },
    {
        id: 'PRE-2026-002',
        doctor: 'Dr. Aminata Faye',
        date: '2026-04-20',
        diagnosis: 'Grippe saisonnière',
        drugs: ['Fervex', 'Vitamin C'],
        status: 'ACTIVE',
        url: 'https://example.com/prescription2.jpg'
    }
];

export default function PrescriptionsScreen({ navigation }: any) {
    return (
        <SafeAreaView className="flex-1 bg-[#f8fafc]">
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => navigation.goBack()} className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-slate-100">
                    <ChevronLeft size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Bio-Records</Text>
                <View className="w-12" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
                <View className="mt-6 mb-8">
                    <Text className="text-3xl font-black text-slate-900 tracking-tighter">My <Text className="text-medical-600">Prescriptions</Text></Text>
                    <p className="text-slate-500 font-bold text-xs mt-1 uppercase tracking-widest opacity-60">Historique des ordonnances cryptées.</p>
                </View>

                {MOCK_PRESCRIPTIONS.map((pre) => (
                    <TouchableOpacity 
                        key={pre.id}
                        className="bg-white rounded-[2.5rem] p-6 mb-6 shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden relative"
                    >
                        {pre.status === 'ACTIVE' && (
                            <View className="absolute top-0 right-0 bg-medical-500 px-6 py-2 rounded-bl-[1.5rem]">
                                <Text className="text-white font-black text-[9px] uppercase tracking-widest">Active</Text>
                            </View>
                        )}

                        <View className="flex-row items-center space-x-4 mb-6">
                            <View className="w-14 h-14 bg-medical-50 rounded-2xl items-center justify-center">
                                <FileText size={28} color="#16a34a" />
                            </View>
                            <View>
                                <Text className="text-lg font-black text-slate-900 tracking-tighter">{pre.doctor}</Text>
                                <View className="flex-row items-center space-x-2">
                                    <Calendar size={12} color="#94a3b8" />
                                    <Text className="text-xs text-slate-400 font-bold">{pre.date}</Text>
                                </View>
                            </View>
                        </View>

                        <View className="bg-slate-50 rounded-2xl p-4 mb-6">
                            <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Diagnosis</Text>
                            <Text className="text-slate-700 font-bold">{pre.diagnosis}</Text>
                        </View>

                        <View className="flex-row flex-wrap gap-2 mb-6">
                            {pre.drugs.map((drug, i) => (
                                <View key={i} className="bg-white border border-slate-100 px-3 py-1 rounded-full">
                                    <Text className="text-[10px] font-black text-slate-500 uppercase">{drug}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity className="w-full bg-slate-900 py-4 rounded-2xl flex-row items-center justify-center space-x-3">
                            <Download size={18} color="white" />
                            <Text className="text-white font-black text-sm uppercase tracking-widest">Download Data</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}

                <View className="mt-4 mb-10 items-center justify-center space-x-2 flex-row opacity-40">
                    <ShieldCheck size={16} color="#94a3b8" />
                    <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End-to-End Encrypted</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
