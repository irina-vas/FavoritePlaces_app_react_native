import { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { IconButton } from "../components/UI/IconButton";


export const MapScreen = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 50.04,
    longitude: initialLocation ? initialLocation.lng : 36.21,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (e) => {
    if (initialLocation) {
      return;
    }
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
    if (initialLocation) {
      return;
    }
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
  },[navigation, savePickedLocationHandler, initialLocation])

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
