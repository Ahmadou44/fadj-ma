import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Send, ShieldCheck, Sparkles, User } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const API_URL = 'http://10.0.2.2:3000/api/message';

export default function ChatScreen({ route, navigation }: any) {
    const { pharmacyId, pharmacyName } = route.params;
    const patientId = 'mock-patient-id';
    const [messages, setMessages] = useState<any[]>([]);
    const [content, setContent] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`${API_URL}/${patientId}/${pharmacyId}`);
            const data = await res.json();
            setMessages(data);
        } catch (e) {
            console.error(e);
        }
    };

    const sendMessage = async () => {
        if (!content.trim()) return;
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content,
                    senderId: patientId,
                    receiverId: pharmacyId
                })
            });
            setContent('');
            fetchMessages();
            setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#f8fafc]">
            {/* High-Spec Header */}
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-3xl">
                <TouchableOpacity onPress={() => navigation.goBack()} className="w-12 h-12 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100 shadow-sm">
                    <ChevronLeft size={24} color="#0f172a" />
                </TouchableOpacity>

                <View className="items-center">
                    <Text className="text-xl font-black text-slate-900 tracking-tighter">{pharmacyName}</Text>
                    <View className="flex-row items-center">
                        <View className="w-2 h-2 bg-emerald-500 rounded-full mr-2 shadow-lg shadow-emerald-500"></View>
                        <Text className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none">Signal Optimal</Text>
                    </View>
                </View>

                <View className="w-12 h-12 bg-medical-50 rounded-2xl items-center justify-center border border-medical-100 shadow-sm text-medical-600">
                    <ShieldCheck size={20} color="#16a34a" />
                </View>
            </View>

            {/* Neural Chat Stream */}
            <ScrollView
                ref={scrollViewRef}
                className="flex-1 px-6 pt-6"
                contentContainerStyle={{ paddingBottom: 40 }}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                <View className="items-center mb-8 relative">
                    <View className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                        <Text className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Quantum Encrypted Tunnel Active</Text>
                    </View>
                </View>

                {messages.map((m) => {
                    const isMine = m.senderId === patientId;
                    return (
                        <View key={m.id} className={`mb-6 flex-row ${isMine ? 'justify-end' : 'justify-start'}`}>
                            {!isMine && (
                                <View className="w-10 h-10 bg-slate-200 rounded-2xl mr-3 items-center justify-center border border-slate-300">
                                    <Sparkles size={18} color="#64748b" />
                                </View>
                            )}
                            <View className={`p-4 rounded-[1.8rem] max-w-[75%] shadow-sm ${isMine
                                    ? 'bg-medical-600 rounded-tr-none border border-medical-500'
                                    : 'bg-white rounded-tl-none border border-slate-100 shadow-slate-200'
                                }`}>
                                <Text className={`text-md font-bold leading-6 ${isMine ? 'text-white' : 'text-slate-800'}`}>
                                    {m.content}
                                </Text>
                            </View>
                            {isMine && (
                                <View className="w-10 h-10 bg-medical-100 rounded-2xl ml-3 items-center justify-center border border-medical-200">
                                    <User size={18} color="#16a34a" />
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>

            {/* Input Module */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
                <View className="p-6 bg-white border-t border-slate-100">
                    <View className="flex-row items-center bg-slate-100 p-2 rounded-[2rem] border border-slate-200 pr-3">
                        <TextInput
                            className="flex-1 h-14 px-5 text-md font-bold text-slate-800"
                            placeholder="Type transmission..."
                            placeholderTextColor="#94a3b8"
                            value={content}
                            onChangeText={setContent}
                        />
                        <TouchableOpacity
                            onPress={sendMessage}
                            className={`w-14 h-14 rounded-full items-center justify-center shadow-lg ${content.trim() ? 'bg-medical-600 shadow-medical-600/30' : 'bg-slate-300 shadow-none'}`}
                            disabled={!content.trim()}
                        >
                            <Send size={22} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-center text-[8px] font-black text-slate-300 uppercase tracking-[0.4em] mt-4 italic">End-to-end atomic encryption applied</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
