import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ navigation }: any) {
    return (
        <View className="flex-1">
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 14.7167,
                    longitude: -17.4677, // Dakar
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: 14.7167, longitude: -17.4677 }}
                    title="Pharmacie Centrale"
                    description="Ouvert 24h/24"
                />
            </MapView>

            <TouchableOpacity
                className="absolute top-12 left-4 bg-white p-3 rounded-full shadow-lg"
                onPress={() => navigation.goBack()}
            >
                <Text className="font-bold text-gray-800">Back</Text>
            </TouchableOpacity>
        </View>
    );
}
