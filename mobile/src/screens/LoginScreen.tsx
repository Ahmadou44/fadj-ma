import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation, onLogin }: any) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Simulation for prototype
        if (phone && password) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                onLogin(); // Simulate successful login
            }, 1000);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>

                    <View className="items-center mb-10">
                        <View className="w-24 h-24 bg-medical-100 rounded-full items-center justify-center mb-4">
                            <Text className="text-4xl">💊</Text>
                        </View>
                        <Text className="text-3xl font-bold text-medical-600">Fadj Ma</Text>
                        <Text className="text-gray-500 mt-2">Votre santé, notre priorité</Text>
                    </View>

                    <View className="space-y-4">
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
                            className="w-full bg-medical-600 p-4 rounded-xl items-center shadow-sm mt-4 active:bg-medical-700"
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text className="text-white font-bold text-lg">
                                {loading ? 'Connexion...' : 'Se connecter'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                            className="items-center mt-6"
                        >
                            <Text className="text-gray-600">
                                Pas encore de compte ? <Text className="text-medical-600 font-bold">S'inscrire</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
