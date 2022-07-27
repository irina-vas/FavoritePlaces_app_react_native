import { useEffect, useState } from "react"
import { PlacesList } from "../components/Places/PlacesList";
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from "../util/database";


export const AllPlaces = ({ route }) => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces()
      //setLoadedPlaces(currPlaces => [...currPlaces, route.params.place]);
    }
  }, [isFocused]);
  
  return (
    <PlacesList places={loadedPlaces} />
  )
}
