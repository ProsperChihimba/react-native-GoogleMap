import { useRef } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';   
import { FontAwesome5 } from '@expo/vector-icons';

const OrdersScreen = () => {

    const bottomSheetRef = useRef(null);
    const { height, width } = useWindowDimensions();

    return (
        <View style={{ flex: 1, backgroundColor: 'lightblue', }}>
            <MapView
                style={{ height, width }}
                showsUserLocation
                followsUserLocation
            >
                <Marker
                    title={"Truck"}
                    description={"Morogoro"}
                    coordinate={{
                        latitude: -6.148588,
                        longitude: 37.152516
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
                    <Text>Available orders: 3</Text>
                </View>
            </BottomSheet>
        </View>
    );
}

export default OrdersScreen;