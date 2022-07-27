import { useEffect, useState } from "react"
import { Image, ScrollView, Text, View, StyleSheet } from "react-native"
import { OutlinedButton } from "../components/UI/OutlinedButton"
import { Colors } from "../constants/colors"
import { fetchPlaceDetails } from "../util/database"


export const PlaceDetails = ({ route, navigation }) => {
  const selectedPlaceId = route.params.placeId;
  const [fetchedPlace, setFetchedPlace] = useState();
  const showOnMapHandler = () => {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  useEffect(() => {
    const loadPlaceData = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,

      });
    }

    loadPlaceData();
  }, [selectedPlaceId])

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}><Text>Loading Place Data...</Text></View>
    )
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>View On Map</OutlinedButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});