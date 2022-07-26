import { useCallback, useLayoutEffect, useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { IconButton } from "../components/UI/IconButton";


export const MapScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState()
  const region = {
    latitude: 50.04,
    longitude: 36.21,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (e) => {
    console.log('!!e.nativeEvent!!', e.nativeEvent)
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked',
        'You have to pick a location by tapping on the map first'
      );
      return;
    }
    navigation.navigate('AddPlaces', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng 
    });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      )
    })
  },[navigation, savePickedLocationHandler])

  return (
    <MapView
      initialRegion={region}
      style={styles.container}
      onPress={selectLocationHandler}
    >
      {selectedLocation && <Marker
        title="Picked Location"
        coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
      />}
    </MapView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
