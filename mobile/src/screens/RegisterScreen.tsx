import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen({ navigation }: any) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView contentContainerStyle={{ padding: 24 }}>

                    <TouchableOpacity onPress={() => navigation.goBack()} className="mb-8">
                        <Text className="text-medical-600 font-medium">← Retour</Text>
                    </TouchableOpacity>

                    <Text className="text-2xl font-bold text-gray-900 mb-2">Créer un compte</Text>
                    <Text className="text-gray-500 mb-8">Rejoignez Fadj Ma pour accéder aux pharmacies.</Text>

                    <View className="space-y-4">
                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">Nom complet</Text>
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                                placeholder="Moussa Diop"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">Numéro de téléphone</Text>
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                                placeholder="77 000 00 00"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </View>

                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">Mot de passe</Text>
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                                placeholder="••••••••"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <TouchableOpacity
                            className="w-full bg-medical-600 p-4 rounded-xl items-center shadow-sm mt-6"
                            onPress={() => navigation.goBack()} // Simulate success
                        >
                            <Text className="text-white font-bold text-lg">S'inscrire</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
