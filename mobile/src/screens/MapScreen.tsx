import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ChevronLeft, LocateFixed, Target } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function MapScreen({ navigation, route }: any) {
    const { pharmacies = [] } = route.params || {};

    return (
        <View className="flex-1 bg-slate-950">
            <MapView
                style={{ width, height }}
                customMapStyle={mapStyle} // Futuristic dark mode map style
                initialRegion={{
                    latitude: 14.7167,
                    longitude: -17.4677, // Dakar
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {pharmacies.map((ph: any) => (
                    <Marker
                        key={ph.id}
                        coordinate={{ latitude: ph.latitude, longitude: ph.longitude }}
                    >
                        <View className="items-center justify-center">
                            <View className="bg-medical-600/20 p-4 rounded-full border border-medical-500/50">
                                <View className="bg-medical-600 w-10 h-10 rounded-full items-center justify-center border-2 border-white shadow-lg shadow-sky-500/50">
                                    <Target size={20} color="white" />
                                </View>
                            </View>
                            <View className="bg-slate-900/80 px-3 py-1 rounded-full mt-2 border border-slate-700">
                                <Text className="text-[10px] font-black text-white uppercase tracking-widest">{ph.name}</Text>
                            </View>
                        </View>
                    </Marker>
                ))}
            </MapView>

            {/* Navigation Overlay */}
            <View className="absolute top-0 left-0 right-0 px-6 pt-14 flex-row justify-between items-center pointer-events-none">
                <TouchableOpacity
                    className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl items-center justify-center border border-white/20 shadow-2xl pointer-events-auto"
                    onPress={() => navigation.goBack()}
                >
                    <ChevronLeft size={28} color="white" />
                </TouchableOpacity>

                <View className="bg-slate-900/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10">
                    <Text className="text-white font-black text-xs uppercase tracking-[0.3em]">NAV_MOD_01</Text>
                </View>

                <TouchableOpacity className="w-14 h-14 bg-medical-600 rounded-2xl items-center justify-center shadow-2xl shadow-sky-500/50 pointer-events-auto">
                    <LocateFixed size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Map Info Panel */}
            <View className="absolute bottom-10 left-6 right-6 bg-slate-900/80 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10">
                <View className="flex-row justify-between items-center mb-4">
                    <View>
                        <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Status Report</Text>
                        <Text className="text-white text-lg font-black tracking-tight">{pharmacies.length} Nodes detected in this quadrant</Text>
                    </View>
                    <View className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500"></View>
                </View>
                <View className="h-[2px] bg-white/5 w-full"></View>
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-4 text-center">Protocol: Secure Medical Distribution Active</Text>
            </View>
        </View>
    );
}

const mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#1d2c4d" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#8ec3b9" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#1a3646" }]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#4b6878" }]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#334e7f" }]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{ "color": "#023e58" }]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{ "color": "#283d6a" }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#6f9ba5" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#304a7d" }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#98a5be" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#0e1626" }]
    }
];
