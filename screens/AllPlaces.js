import { useEffect, useState } from "react"
import { PlacesList } from "../components/Places/PlacesList";
import { useIsFocused } from '@react-navigation/native';


export const AllPlaces = ({ route }) => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces(currPlaces => [...currPlaces, route.params.place]);
    }
  }, [isFocused, route]);
  
  return (
    <PlacesList places={loadedPlaces} />
  )
}
