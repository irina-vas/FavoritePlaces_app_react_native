import { View, StyleSheet, Text, Image, Pressable } from "react-native"


export const PlaceItem = ({ place }) => {

  const onSelect = () => {

  }
  return (
    <Pressable onPress={onSelect} style={styles.container}>
      <Image source={{uri: place.imageUri}} />
      <View style={styles.container}>
        <Text style={styles.container}>{place.title}</Text>
        <Text style={styles.container}>{place.address}</Text>
      </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  container: {

  },
});