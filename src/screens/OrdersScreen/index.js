import { useEffect, useRef, useState } from 'react';
import { Text, View, useWindowDimensions, ActivityIndicator } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';   
import { FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

const OrdersScreen = () => {

    const [driverLocation, setDriverLocation] = useState(null)
    const [totalMinutes, setTotalminutes] = useState(0)
    const [totalKm, setTotalKm] = useState(0)

    const bottomSheetRef = useRef(null);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            
            if (!status === 'granted') {
                return
            }

            let location = await Location.getCurrentPositionAsync();
            setDriverLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        })();

        const foregroundSubscription = Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                distanceInterval: 100
            }, (updatedLocation) => {
                setDriverLocation({
                    latitude: updatedLocation.coords.latitude,
                    longitude: updatedLocation.coords.longitude
                })
            }
        )
        
        return foregroundSubscription;
        // 3h & 8 min
    }, [])

    if (!driverLocation) {
        return <ActivityIndicator size={"large"} />
    }

    // console.log(driverLocation)

    return (
        <View style={{ flex: 1, backgroundColor: 'lightblue', }}>
            <MapView
                style={{ height, width }}
                showsUserLocation
                followsUserLocation
                initialRegion={{
                    latitude: driverLocation.latitude,
                    longitude: driverLocation.longitude,
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.07
                }}
            >
                <MapViewDirections
                    origin={driverLocation}
                    destination={{ latitude: -6.71542541503906, longitude: 37.508738403320305 }}
                    strokeWidth={8}
                    strokeColor="green"
                    waypoints={{ latitude: -6.71542541503906, longitude: 37.508738403320305 }}
                    apikey={"AIzaSyCKrxJJwuadxB_XCKQ3npXbc4AtBLfVSn0"}
                    onReady={(result) => {
                        setTotalminutes(result.duration)
                        setTotalKm(result.distance)
                    }}
                />
                <Marker
                    title={"Truck"}
                    description={"Morogoro"}
                    coordinate={{
                        latitude: -6.79542541503906,
                        longitude: 37.628738403320305
                    }}
                >
                    <View style={{backgroundColor: 'green', padding: 5, borderRadius: 10}}>
                        <FontAwesome5 name="truck-moving" size={20} color="white" />
                    </View>
                    
                </Marker>
                <Marker
                    title={"Truck"}
                    description={"Morogoro"}
                    coordinate={{
                        latitude: -6.71542541503906,
                        longitude: 37.508738403320305
                    }}
                >
                    <View style={{backgroundColor: 'green', padding: 5, borderRadius: 10}}>
                        <FontAwesome5 name="truck-moving" size={20} color="white" />
                    </View>
                    
                </Marker>
            </MapView>
            <BottomSheet ref={bottomSheetRef} snapPoints={["12%", "95%"]}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: '600', letterSpacing: 0.2, paddingBottom: 5}}>Your online</Text>
                    <Text>{ totalMinutes.toFixed(0) } min | { totalKm.toFixed(2) } km</Text>
                </View>
            </BottomSheet>
        </View>
    );
}

export default OrdersScreen;